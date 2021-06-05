const secrets = require("../config").SECRETS;
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
getAllUsers({
  username: "abhinav",
  password: "12345678",
})
  .then(console.log)
  .catch(console.log);

module.exports = {
  addUser,
  removeUser,
  getAllUsers,
  backup,
};
