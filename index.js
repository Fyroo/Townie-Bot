const { Client,  Intents, MessageReaction, ReactionCollector, Interaction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, ] });
const { token } = require('./config.json');
const { MessageActionRow, MessageButton } = require('discord.js');
class playerProfile {
	constructor(name, role) {
	  this.name = name;
	  this.role = role;
	}
}

function checkExistingplayers(players, UserId){
	
	let exist = false ;
	for(let i=0;i<players.length;i++)
	{
		if(players[i] == UserId)
		{
			exist=true;
		}
	}
	return exist ;
}

function addPlayer(players,UserID){
	players.push(UserID);
}

function time(time){
	timer = false;
	setTimeout(function() {
		timer = true;
		return console.log(time,'seconds have passed');
	}, time*1000);
	
}


client.once('ready', () => {
	console.log('Ready!');
});
 


client.on('message', async message => {
	if (message.author.bot) return;

	if (message.content.match('play'))  {
		
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Join')
					.setStyle('PRIMARY')
					.setDisabled(false),
			);
let msg = message.reply({ content: 'Current players:',  components: [row] });
		await msg; 
		
		let players = [];
        time(10);//seconds
		client.on('interactionCreate', interaction => {
			if (timer) {
				// message.editreply('balls');
				return interaction.reply('time over');
		}
			else if(interaction.isButton()){
				
				if (!checkExistingplayers(players,interaction.user.id))
				{
					let player1 = new playerProfile(interaction.user.tag,'test');
					addPlayer(players,interaction.user.id);
				console.log(players);
				console.log(interaction.user.tag);
				interaction.reply({ content: `${interaction.user.tag} joined`});
				}else{
					interaction.reply({ content: `${interaction.user.tag} already joined you can not join twice`});
				}		
			}
		});  
                  
	}

});
client.login(token);
