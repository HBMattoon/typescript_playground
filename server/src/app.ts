
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const key = require('../../secret.json')

const port = 3000;
const app = express();

interface response {
  end:Function;
};

interface request {

};


// app.get('/api/test', (req: object, res: response) => {
//   console.log(typeof req, typeof res)
//   res.end();
// })





// let myTest = (val1: number) => {
//   return val1 + 2;
// }

// console.log(myTest(1));


// app.listen(port, ()=> console.log('listening to port: ', port))

const Discord = require('discord.js');
const client = new Discord.Client();

const msgHist: object[] = [];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg:any) => {
  // let message: string = msg.content.toLowerCase()

  // if (message === 'hi henbot') {
  //   //console.log(typeof msg.author)
  //   //console.log(msg.author.username)

  //   msg.reply(`Hi ${msg.author.username}!`);
  // }
  //check to see if message is a command

  if(msg.content[0] === '!' && msg.content[1] !== undefined){
    //the msg is a command
    console.log('getting command')
    let message: string = msg.content;
    let msgCmd: string = msg.content.split(' ')[0].toLowerCase();
    let msgTarget:string | null | undefined = msg.content.split(' ')[1];
    if(msgCmd === '!hist'){
      if(msgTarget){
        getHist((data:string[]) => {
          //console.log(data)
          msg.reply(data);
        }, msgTarget);
      } else {
        getHist((data:string[]) => msg.reply(data)); //data
      }
    }
  } else {
    addToHist(msg);
  }
});

const addToHist = (msg:object) => {
  msgHist.push(msg);
}

const getHist = (cb:Function, target?:string) => {


  console.log('getting hist for: ', target)
  let targetHist: any[] = []
  targetHist.push(`Showing hist for [${target}]`);
  msgHist.forEach((item:any)=>{
    if(target ? item.author.username === target : true){
      let entry:string = `[${formatDate(item.createdAt)}] [${item.author.username}]: ${item.content}`;
      targetHist.push(entry);
    }
  })
  cb(targetHist)
}




const formatDate = (input:Date):string => {

  let month:Number = input.getMonth();
  let day:Number = input.getDate();
  let year:string = JSON.stringify(input.getFullYear()).slice(1)
  let timeNoSec:string = `${input.getHours()}:${('0'+input.getMinutes()).slice(1)}`
  let result:string = `${month}/${day}/${year}, ${timeNoSec}`;

  return result;
}

client.login(key.token);

// export default {
//   myTest
// }


