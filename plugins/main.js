
/*
------------------------------------------------------------
    Movie Suport Bot
------------------------------------------------------------
    ✨ Developed by: Mr. Asitha
    ✅ Contact: +94743381623
    📅 Created: 2025-03-18
    🔗 Join WhatsApp Channel: https://whatsapp.com/channel/0029VaeyMWv3QxRu4hA6c33Z
    🚀 Program: MOVIE Suport Bot
------------------------------------------------------------
*/

const {cmd , commands} = require('../command')
const fetch = require('node-fetch');
const {fetchJson} = require('../lib/functions')
const axios = require('axios');
const cheerio = require('cheerio');

cmd({
    pattern: "start",
    desc: "kok",
    category: "pp",
    use: '/start < Text >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let pp = await fetchJson(`https://fetchfox.ai/api/v2/fetch?url=http://server.moviepluslk.xyz/api.php?slug=${q}`)
let html = await fetchJson(pp.html)

const $ = cheerio.load(html);
const jsonText = $('pre').text();
const data = JSON.parse(jsonText);      
 
let size = data.file_size;
let downloadlink = data.google_drive_link;
let title = data.file_name;
  
let message =`- 📁 \`File Name\` : ${title}
- 📈 \`File Size\` : ${size}

✅ *ඔබට අවශ්‍ය වීඩියො පිටපත උඩුගත කරමින් පවතී, තවත් පරිශීලකයින්ට විඩියො පිටපත් උඩුගත කරමින් පවතී, ඔබගේ අවස්තාව එන තෙක් කරුණාකර රැදී සිටින්න*`
let message2 =`- 📁 \`File Name\` : ${title}
- 📈 \`File Size\` : ${size}

❌ *සමාවෙන්න මෙම විඩියො පිටපත 2GB කට වඩා වැඩියි, එම නිසා උඩුගත කළ නොහැක, අපහසු තාවය පිළිබඳව සමාවෙන්න..*`


const fileSizeInGB = parseFloat(size); 


if (fileSizeInGB > 2) {
    await conn.sendMessage(from, { text : message2 }, { quoted: mek }); 
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
} else {
    await conn.sendMessage(from, { text : message }, { quoted: mek }); 
    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
    let links = await convertDownloadToViewLink(downloadlink)
                await conn.sendMessage(from, { 
                    document: { url: links },
                    caption: `*${title}*\n\n*❯⏤͟͟͞͞★𝗠𝗢𝗩𝗜𝗘🇵 🇱 🇺 🇸 ☆❯⏤͟͟͞͞*`,
                    mimetype: "video/mp4",
                    fileName: `🎬MOVIEPLUS🎬 ${title}.mp4`
                }, { quoted: mek });
                await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
}

}catch(e){
console.log(e)
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
}
})

async function convertDownloadToViewLink(downloadLink) {
    const match = downloadLink.match(/\/d\/([^/]+)\/view/);
    
    if (match && match[1]) {
        const fileId = match[1]; 
        const glink = `https://drive.google.com/uc?id=${fileId}&export=download`;
        
        let res = await GDriveDl(glink);
        return res.downloadUrl;
    }
    
    return "Invalid download link";
}
async function GDriveDl(url) {
  let id, res = {
    error: !0
  };
  if (!url || !url.match(/drive\.google/i)) return res;
  try {
    if (id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1], !id) throw "ID Not Found";
    res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
      method: "post",
      headers: {
        "accept-encoding": "gzip, deflate, br",
        "content-length": 0,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        origin: "https://drive.google.com",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
        "x-client-data": "CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=",
        "x-drive-first-party": "DriveWebUi",
        "x-json-requested": "true"
      }
    });
    let {
      fileName,
      sizeBytes,
      downloadUrl
    } = JSON.parse((await res.text()).slice(4));
    if (!downloadUrl) throw "Link Download Limit!";
    let data = await fetch(downloadUrl);
    return 200 !== data.status ? data.statusText : {
      downloadUrl: downloadUrl,
      fileName: fileName,
      mimetype: data.headers.get("content-type")
    };
  } catch (e) {
    return console.log(e), res;
  }
}
