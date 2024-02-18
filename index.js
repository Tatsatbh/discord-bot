const { Client, GatewayIntentBits } = require('discord.js');

const { OpenAI } = require('openai')
require('dotenv').config()
const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
] });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });

async function gpt(message){
    const chatCompletion = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[
            {
                role:"user",
                content:message
            }
        ]
    });
    return chatCompletion.choices[0].message.content
}

client.on('messageCreate', async (message) => {
    msg = message.content.toLowerCase()
    member = message.member
    permissions = member.permissions

    if(message.author.bot) return;

    if( (msg.includes('hi') || msg.includes('hello')))
    {
        message.reply("Hi from Botnagar!")
    } 
    // console.log(permissions.has('KICK_MEMBERS'));
})

client.on("guildMemberAdd", function(member){
    const channel = client.channels.cache.get(process.env.GENERAL_CHANNEL);
    channel.send({ content: `Welcome to Tatsat's server, ${member.user.tag}!` });
});

client.on("guildMemberRemove", function(member){
    const channel = client.channels.cache.get(process.env.GENERAL_CHANNEL);
    channel.send({ content: `${member.user.tag} has left / been kicked` });
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;


    if(interaction.commandName==='gpt'){
        let gpt_message = interaction.options.get('input').value
        interaction.reply("Loading please wait....")
        let gpt_response = await gpt(gpt_message)
        //edit the sent reply to response
        interaction.editReply(`"${gpt_message}" \n\n` + gpt_response) 
    }

    if(interaction.commandName==='intro'){
        interaction.reply("Hey there! Meet Botnagar, haha get it? its a play on my creators name Bhatnagar -> Botnagar sorry for the cringe but Botnagar's here to take your server to the next level. Let's spice up your Discord experience with Botnagar's awesome vibes!")
    }
    
})



client.login(process.env.DISCORD_KEY)