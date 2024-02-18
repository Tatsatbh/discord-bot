const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require('dotenv').config()
const commands = [
  {
    name: 'gpt',
    description: 'Ask ChatGPT anything',
    options: [
        {
            name:'input',
            description:'chatgpt input',
            type:ApplicationCommandOptionType.String,
            required:true
        }
    ]
  },

  {
    name: 'intro',
    description: 'Get an introduction to botnagar!',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_KEY);
const setupCommands = async () => {
    try {
        console.log('Started refreshing application (/) commands.');
      
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
      
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
}

setupCommands();