const { zokou } = require('../framework/zokou');
const {addOrUpdateDataInAlive , getDataFromAlive} = require('../bdd/alive')
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
    {
        nomCom : 'awake',
        categorie : 'General'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser} = commandeOptions;

 const data = await getDataFromAlive();

 if (!arg || !arg[0] || arg.join('') === '') {

    if(data) {
       
        const {message , lien} = data;


        var mode = "public";
        if ((s.MODE).toLocaleLowerCase() != "yes") {
            mode = "private";
        }
      
    
     
    moment.tz.setDefault('Etc/GMT');

// CrÃ©er une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('YYYY/DD/MM');

    const alivemsg = `
*Owner* : ${s.OWNER_NAME}
*Mode* : ${mode}
*Date* : ${date}
*Hours(GMT)* : ${temps}

 ${message}
 
 
 _TKM-bot_`

 if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("ðŸ¥µðŸ¥µ Menu erreur " + e);
        repondre("ðŸ¥µðŸ¥µ Menu erreur " + e);
    }
} 
// Checking for .jpeg or .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log(" Menu erreur " + e);
        repondre(" Menu erreur " + e);
    }
} 
else {
    
    repondre(alivemsg);
    
}

    } else {
        if(!superUser) { repondre("Hey dude why are you disturbing me on my sleep 🌝") ; return};

      await   repondre("Thank for reaching out to Cobutech, this is the home of technology and feel free to use our tech equipment to satisfy your wants 🌚 we love you so much;https://telegra.ph/file/6ee45f8074de6d5f2c5d9.jpg");
         repondre("check out our YouTube channel for more and support our team https://www.youtube.com/@calvineobumdtech :)")
     }
 } else {

    if(!superUser) { repondre ("don't try to change this for your own goodness 😉😉😉,we love you so t❤️❤️") ; return};

  
    const texte = arg.join(' ').split(';')[0];
    const tlien = arg.join(' ').split(';')[1]; 


    
await addOrUpdateDataInAlive(texte , tlien)

repondre('This bot i alive 24/7 and the responds immediately ')

}
    });
