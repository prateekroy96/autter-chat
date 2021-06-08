import { endpoints } from './../core/config/endpoints';
import { HttpClient } from '@angular/common/http';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';
import { secret } from 'secret/secret';
declare var Strophe;
declare var $iq;
declare var $msg;
declare var $pres;
@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private appService: AppService, private httpClient: HttpClient) {}
  conn: any;
  connect() {
    this.conn = new Strophe.Connection(secret.WS);
    console.log(this.conn);
    this.conn.xmlInput = (body) => {
      this.showTraffic('INCOMING', body);
    };

    this.conn.xmlOutput = (body) => {
      this.showTraffic('OUTGOING', body);
    };
    this.conn.connect(
      this.appService.user.username + '@localhost',
      this.appService.user.password,
      (status) => {
        if (status === Strophe.Status.CONNECTED) {
          console.info('CONNECTED');
          var iq = $iq({ type: 'get' }).c('query', {
            xmlns: 'jabber:iq:roster',
          });

          // On message Handler
          this.conn.addHandler(
            (message) => {
              console.log('MESSAGE: ', message);
              return true;
            },
            null,
            'message',
            'chat'
          );

          // On presence Handler
          this.conn.addHandler(
            (presence) => {
              console.log('PRESENCE: ', presence);
            },
            null,
            'presence'
          );

          // Recieve IQ Handler
          this.conn.addHandler(
            (iq) => {
              console.log(iq);
            },
            'jabber:iq:roster',
            'iq',
            'set'
          );
          // Send IQ Handler
          this.conn.sendIQ(iq, (iq) => {
            console.log(iq);
          });

          // Send Presence
          this.conn.send($pres());
        } else if (status === Strophe.Status.DISCONNECTED) {
          console.info('DISCONNECTED');
        }
      }
    );
  }
  showTraffic(type, body) {
    if (body.childNodes.length > 0) {
      body.childNodes.forEach((element) => {
        console.log(type, 'CHILD NODE', element);
      });
    }
  }
  ping() {
    let start_time = new Date().getTime();
    this.conn.addHandler(
      (iq) => {
        var elapsed = new Date().getTime() - start_time;
        console.log("Received pong from server in " + elapsed + "ms.");
        return false;
      },
      null,
      "iq",
      null,
      "ping1"
    );
    let domain = Strophe.getDomainFromJid(this.conn.jid);
    var ping = $iq({
      to: domain,
      type: "get",
      id: "ping1",
    }).c("ping", { xmlns: "urn:xmpp:ping" });

    console.log("Sending ping to " + domain + ".");

    this.conn.send(ping);
  }
  send(to,text) {
    // var builder = new Strophe.Builder("message", {
    //   to: this.to + "@localhost",
    //   body: this.text,
    //   "xml:lang": "en",
    // });
    var msg = $msg({ to: to + "@localhost", type: "chat" })
      .c("body")
      .t(text);
    console.log(msg);
    this.conn.send(msg);
  }
  search(data) {}
}
