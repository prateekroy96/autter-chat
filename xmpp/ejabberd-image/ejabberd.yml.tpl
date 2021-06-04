###
###'              ejabberd configuration file
###
###

###.  =======
###'  LOGGING
loglevel: 4
log_rotate_size: 10485760
log_rotate_count: 1
log_rate_limit: 100
log_rotate_date: ""


hosts:
  - "localhost"


##
## listen: The ports ejabberd will listen on, which service each is handled
## by and what options to start it with.
##
listen:
  -
    port: 5222
    ip: "0.0.0.0"
    module: ejabberd_c2s
    ## starttls: true
    ##
    ## To enforce TLS encryption for client connections,
    ## use this instead of the "starttls" option:
    ##
    starttls_required: true
    ##
    ## Stream compression
    ##
    ## zlib: true
    ##
    max_stanza_size: 65536
    shaper: c2s_shaper
    access: c2s
  -
    port: 5269
    ip: "0.0.0.0"
    module: ejabberd_s2s_in
    max_stanza_size: 131072
    shaper: s2s_shaper
  -
    port: 5280
    ip: "0.0.0.0"
    module: ejabberd_http
    request_handlers:
      "/admin": ejabberd_web_admin
      "/ws": ejabberd_http_ws
      "/oauth": ejabberd_oauth
      "/api": mod_http_api
      "/upload": mod_http_upload
    ##  "/pub/archive": mod_http_fileserver
    web_admin: true
    ## register: true
    captcha: false


##
## Store the plain passwords or hashed for SCRAM:
## auth_password_format: plain
## auth_password_format: scram
auth_password_format: scram

##
## Authentication using SQL
## Remember to setup a database in the next section.
##
auth_method: sql


###.  ==============
###'  DATABASE SETUP

default_db: sql

##
## MySQL server:
##
sql_type: mysql
sql_server: db
sql_database: autter
sql_username: autter_admin
sql_password: autter@12345
sql_port: 3306


###.   ====================
###'   ACCESS CONTROL LISTS
acl:
  admin:
    user:
    {%- if env['EJABBERD_ADMINS'] %}
      {%- for admin in env['EJABBERD_ADMINS'].split() %}
      - "{{ admin.split('@')[0] }}": "{{ admin.split('@')[1] }}"
      {%- endfor %}
    {%- else %}
      - "admin": "localhost"
    {%- endif %}
  local:
    user_regexp: ""

  ##
  ## Loopback network
  ##
  loopback:
    ip:
      - "127.0.0.0/8"
      - "::1/128"
      - "::FFFF:127.0.0.1/128"

###.  ============
###'  ACCESS RULES
access_rules:
  ## This rule allows access only for local users:
  local:
    - allow: local
  ## Only non-blocked users can use c2s connections:
  c2s:
    - deny: blocked
    - allow
  ## Only admins can send announcement messages:
  announce:
    - allow: admin
  ## Only admins can use the configuration interface:
  configure:
    - allow: admin
  ## Only accounts of the local ejabberd server can create rooms:
  muc_create:
    - allow: local
  ## Only accounts on the local ejabberd server can create Pubsub nodes:
  pubsub_createnode:
    - allow: local
  ## In-band registration allows registration of any possible username.
  ## To disable in-band registration, replace 'allow' with 'deny'.
  register:
    - allow
  ## Only allow to register from localhost
  trusted_network:
    - allow: loopback

oauth_expire: 31536000
oauth_access: all

commands_admin_access:
  - allow:
    - user: "admin@localhost"  # your user name.

commands:
  - add_commands: [user, admin, open]
  
access:    # add following lines in access section
  soft_upload_quota:
    all: 1000 # MiB
  hard_upload_quota:
    all: 1100 # MiB

api_permissions:
  'console commands':
    from:
      - ejabberd_ctl
    who: all
    what: '*'
  'admin access':
    who:
      access:
        allow:
          acl: admin
      oauth:
        scope: 'ejabberd:admin'
        access:
          allow:
            acl: admin
    what:
      - '*'
      - '!stop'
      - '!start'
  'public commands':
    who:
      ip: 127.0.0.1/8
    what:
      - "*"
      - "connected_users_number"
  "web admin":
    who:
      - access:
          - allow:
              - acl: loopback
              - acl: admin
      - oauth:
          - scope: "sasl_auth"
          - access:
              - allow:
                  - acl: loopback
                  - acl: admin
    what:
      - "*"
      - "!stop"
      - "!start"

language: "en"

host_config:
  "localhost":
    auth_method: sql

modules:
  mod_stun_disco:
    credentials_lifetime: 12h
    services:
      - host: 0.0.0.0
        port: 3478
        type: stun
        transport: udp
        restricted: false
      - host: 0.0.0.0
        port: 3478
        type: turn
        transport: udp
        restricted: true
      - host: rtcdev.site
        port: 5349
        type: stun
        transport: tcp
        restricted: false
      - host: rtcdev.site
        port: 5349
        type: turn
        transport: tcp
        restricted: true
  mod_adhoc: {}
  mod_admin_extra: {}
  mod_announce:
    access: announce
  mod_avatar: {}
  mod_blocking: {}
  mod_bosh: {}
  mod_caps: {}
  mod_carboncopy: {}
  mod_client_state: {}
  mod_configure: {}
  mod_disco: {}
  mod_fail2ban: {}
  mod_http_api: {}
  mod_http_upload:
    put_url: https://localhost:5443/upload
    docroot: /home/xmpp/upload
  mod_last: {}
  mod_mqtt: {}
  mod_muc:
    access:
      - allow
    access_admin:
      - allow: admin
    access_create: muc_create
    access_persistent: muc_create
    access_mam:
      - allow
    default_room_options:
      allow_subscription: true
      mam: false
  mod_muc_admin: {}
  mod_offline:
    access_max_user_messages: max_user_offline_messages
  mod_ping: {}
  mod_privacy: {}
  mod_private: {}
  mod_proxy65:
    access: local
    max_connections: 5
  mod_pubsub:
    access_createnode: pubsub_createnode
    plugins:
      - flat
      - pep
    force_node_config:
      storage:bookmarks:
        access_model: whitelist
  mod_push: {}
  mod_push_keepalive: {}
  mod_register:
    ip_access: trusted_network
  mod_roster:
    versioning: true
  mod_sip: {}
  mod_s2s_dialback: {}
  mod_shared_roster: {}
  mod_stream_mgmt:
    resend_on_timeout: if_offline
  mod_vcard: {}
  mod_vcard_xupdate: {}
  mod_version:
    show_os: false