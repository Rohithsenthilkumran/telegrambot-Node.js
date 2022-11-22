const Telegram=require('node-telegram-bot-api');
const token='5809012194:AAG8k79WB7UIaEaN40F-PsehL-_U_UUrh-o';
const bot=new Telegram(token,{ polling:true});
const request=require('request');
bot.onText(/\/sj (.+)/, (msg,match)=>{
    var Id=msg.chat.id;
    var movie =match[1];
     request(`https://www.omdbapi.com/?apikey=e30c26b3&t=${movie}`,(error,response,body)=>{
        if(!error && response.statusCode==200){
            bot.sendMessage(Id,'Looking for movie '+ movie + '.....',{parse_mode:'Markdown'})
            .then((msg)=>{
              const res=JSON.parse(body);
             
            bot.sendPhoto(Id,res.Poster,{caption: 'Result:\nTitle:'+res.Title +'\nGenre:' +res.Genre +'\nYear:' +res.Year +'\nActors:' +res.Actors +'\nDirector:' +res.Director +'\nPlot:' +res.Plot});
            })
        }
    })
})