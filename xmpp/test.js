const secrets = require("../secret/secret.json");
const rp = require("request-promise");

async function addUser(data) {
  try {
    if (!data.username || !data.password) {
      return {
        status_code: 400,
        status: false,
        message: "Either Username or Password Missing",
      };
    }
    let res = await rp({
      method: "POST",
      uri: secrets.XMPP_ADMIN_URL + "api/register",
      headers: {
        Authorization: "Bearer " + secrets.XMPP_ADMIN_TOKEN,
      },
      body: {
        user: data.username,
        host: secrets.XMPP_HOST,
        password: data.password,
      },
      json: true,
    });
    return {
      status_code: 200,
      status: true,
      message: res,
    };
  } catch (err) {
    return {
      status_code: 400,
      status: false,
      message: err.message,
    };
  }
}
async function setPhoto(data) {
  try {
    let res = await rp({
      method: "POST",
      uri: secrets.XMPP_ADMIN_URL + "api/set_vcard2",
      headers: {
        Authorization: "Bearer " + secrets.XMPP_ADMIN_TOKEN,
      },
      body: {
        user: data.username,
        host: secrets.XMPP_HOST,
        name: "N",
        subname: "MIDDLE",
        content: data.number,
      },
      json: true,
    });
    return {
      status_code: 200,
      status: true,
      message: res,
    };
  } catch (err) {
    return {
      status_code: 400,
      status: false,
      message: err.message,
    };
  }
}
async function getPhoto(data) {
  try {
    let res = await rp({
      method: "POST",
      uri: secrets.XMPP_ADMIN_URL + "api/get_vcard2",
      headers: {
        Authorization: "Bearer " + secrets.XMPP_ADMIN_TOKEN,
      },
      body: {
        user: data.username,
        host: secrets.XMPP_HOST,
        name: "N",
        subname: "MIDDLE",
      },
      json: true,
    });
    return {
      status_code: 200,
      status: true,
      message: res,
    };
  } catch (err) {
    return {
      status_code: 400,
      status: false,
      message: err.message,
    };
  }
}

async function removeUser(data) {
  try {
    if (!data.username) {
      return {
        status_code: 400,
        status: false,
        message: "Username Missing",
      };
    }
    let res = await rp({
      method: "POST",
      uri: secrets.XMPP_ADMIN_URL + "api/unregister",
      headers: {
        Authorization: "Bearer " + secrets.XMPP_ADMIN_TOKEN,
      },
      body: {
        user: data.username,
        host: secrets.XMPP_HOST,
      },
      json: true,
    });
    return {
      status_code: 200,
      status: true,
      message: res,
    };
  } catch (err) {
    return {
      status_code: 400,
      status: false,
      message: err.message,
    };
  }
}
async function getAllUsers(data) {
  try {
    let res = await rp({
      method: "POST",
      uri: secrets.XMPP_ADMIN_URL + "api/registered_users",
      headers: {
        Authorization: "Bearer " + secrets.XMPP_ADMIN_TOKEN,
      },
      body: {
        host: secrets.XMPP_HOST,
      },
      json: true,
    });
    return {
      status_code: 200,
      status: true,
      message: res,
    };
  } catch (err) {
    return {
      status_code: 400,
      status: false,
      message: err.message,
    };
  }
}
async function backup(data) {
  try {
    let res = await rp({
      method: "POST",
      uri: secrets.XMPP_ADMIN_URL + "api/backup",
      headers: {
        Authorization: "Bearer " + secrets.XMPP_ADMIN_TOKEN,
      },
      body: {
        file: "/home/ejabberd/database.backup",
      },
      json: true,
    });
    return {
      status_code: 200,
      status: true,
      message: res,
    };
  } catch (err) {
    return {
      status_code: 400,
      status: false,
      message: err.message,
    };
  }
}
async function checkPassword(data) {
  try {
    if (!data.username || !data.password) {
      return {
        status_code: 400,
        status: false,
        message: "Either Username or Password Missing",
      };
    }
    let res = await rp({
      method: "POST",
      uri: secrets.XMPP_ADMIN_URL + "api/check_password",
      headers: {
        Authorization: "Bearer " + secrets.XMPP_ADMIN_TOKEN,
      },
      body: {
        user: data.username,
        host: secrets.XMPP_HOST,
        password: data.password,
      },
      json: true,
    });
    return {
      status_code: 200,
      status: true,
      message: res,
    };
  } catch (err) {
    return {
      status_code: 400,
      status: false,
      message: err.message,
    };
  }
}
getPhoto({
  username: "prateek",
  number: "alex",
})
  .then(console.log)
  .catch(console.log);

module.exports = {
  addUser,
  removeUser,
  getAllUsers,
  backup,
};
/*
    "host"=>"server1",
	    "user"=>"test",
            "name"=>"PHOTO",
            "subname"=>"BINVAL",
            "content"=>["iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB7UlEQVR42mNkwARqQFwJxAlIYseh
/NdA/B5ZMSMWzTf/vVdmYBS4w8Dw9z4Dw/cahjcvtzGYOAszPHx4F6SGH4g/YTMArPn/12oGBq4W
iMjv7UB8FKiKDcxes/4EQyjEXfJA/AjdgGMz+xgs0wr/MzD8/8zA8GMaAwOTCJD9E+iSSwzfPm1m
4OIxYlizbgvIkAVA9fUgQ5AN+P/9hQwDh/hjBoaPqgy9nXcYistVIDJcM4EG9oOZUANAwBSIb2M1
oLeKEawZZAgIgA1izwZ6Yy+yAd5AfBTTAIEGht7GFIbi5nsMDF/cwBJg11T6oLsAw4BjQAMsOXgD
GXpbJjMUN25jYGA2Y2D4tZiht6mQIa9InoGVXRdmAChaW9ANAMXC4jd3Bc0WzHnPUFxTAhb8+2Mt
w4Se+wzFFfbAWDjIkFcpw/D8+ZMaoNR5ID6CbIAgEL/ragQG/g+gv2uqGX58XsgwdeIThpQMUYbd
+1+DFQFtfwCkgAHCcAU9FsDhACJWL8BMnlB/wzS/AuIz2FLi//+HPBjaj/gzLFs2i4GPT4Dh2LH9
MDlvKA3XjNOA3Xt2MDyEuJghdTpcM0jkJSwF4jJgPtAAsGNBhrg1oWg+zYAFoBvAZ2Rk8fHcuRPI
zsapGZsBICAHxDrY/IsNAABghL5bmQ7CNQAAAABJRU5ErkJggg=="]
*/

/*
https://github.com/processone/ejabberd/issues/3266
https://docs.ejabberd.im/developer/ejabberd-api/admin-api/#set-vcard2
*/
