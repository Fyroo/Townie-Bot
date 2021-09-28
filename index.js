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
 
function checkExistingplayers(players,interaction){
	
	let exist = false ;
	for(let i=0;i<players.length;i++)
	{
		if(players[i] == interaction.user.id)
		{
			exist=true;
		}
	}
	if(exist)interaction.reply({ content: `Seems like you already joined ${interaction.user.username},  you can not join twice.`});
	else {players.push(interaction.user.id);
		interaction.reply({ content: `${interaction.user.username} joined`});
}


	
}

function time(time){
	timer = false;
	setTimeout(function() {
		timer = true;
		return console.log(time,'seconds have passed');
	}, time*1000);
	
}

function sessionCreate(players,session,replay){
	if(session){
		console.log(players);
		replay = true;
	   }else console.log('Session not created');

}

let players = [];
let replay = false;
let session = false;
let Town_killing = ['Mafioso','Godfather','Serial Killer','Vigilante'];
let Town_Investigative = ['Investigator','Lookout'];
let Town_Protective = ['Doctor'];
let Town_Support = ['Escort','Medium'];
client.once('ready', () => {
	console.log('Ready!');
});
 



client.on('message', async message => {
	if (message.author.bot) return;

	if (message.content.match('play'))  {
		var readybtn = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Join')
					.setStyle('PRIMARY'),
			);
		let msg = await message.reply({ content: 'The game will start once enough players joined..',  components: [readybtn] });
		if (replay)players = [];
        time(10);//seconds
		client.on('interactionCreate',  interaction => {
            checkExistingplayers(players,interaction);
			if (timer) {
				msg.edit({ content: 'Game timedout!',  components: [] });
			   if(players.length >= 1){
				   session = true;
				   sessionCreate(players,session,replay); 
				    message.reply('The game will begin');}  

			       else return interaction.reply('Oops, too late try again!');
		    };
		});
	}
});
 


client.login(token);
