const { Client,  Intents, MessageReaction, ReactionCollector, Interaction, ButtonInteraction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, ] });
const { token } = require('./config.json');
const { MessageActionRow, MessageButton } = require('discord.js');


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
	if (message.author.bot) return;
    A = '0';

	if (message.content.match('play'))  {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Join')
					.setStyle('PRIMARY'),
			);

		await message.reply({ content: 'Current players:', A , components: [row] });
		
		client.on('interactionCreate', interaction => {
			if(interaction.isButton()){
				console.log(interaction.user.tag);
				interaction.reply({ content: `${interaction.user.tag} joined`});
				
			}
		});           




		                                                                     //interaction Collector not working ↓↓↓↓↓
		// const collector = message.channel.createMessageComponentCollector({max: 1});
		// collector.on ('end' , (interaction) => {
		// 	console.log(interaction.user.tag);
		// })

	}




	                                                                         // scrap code ↓↓↓↓↓
});
// client.on('message', async message =>{

//     if (message.author.bot) return;
//     if(message.content.match('kill')){   
//         process.exit(1)}
//     if (message.content.match('play')){
//         message.channel.send("a").then(async msg => {
//             msg.react('👍');
//             const filter = (reaction, user) => {
//                 return reaction.emoji.name === '👍' && user.id == message.author.id;
//             };
            
//             const collector = msg.createReactionCollector({ filter, time: 15000 });
            
//             collector.on('collect', (reaction, user) => {
//                 console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
//             });
            
//             collector.on('end', collected => {
//                 console.log(`Collected ${collected.size} items`);
//         })
    
//         });
//     }    
//     });

client.login(token);
