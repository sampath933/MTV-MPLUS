const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? '𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=W2wSwCIA#frdAnaFX64l2NpNs5fE3S0UDEjBef7OlyxsUMOE7EtI' : process.env.SESSION_ID,
};
