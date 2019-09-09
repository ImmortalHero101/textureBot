const fs = require("fs"),
      Discord = require("discord.js"),
      client = new Discord.Client(),
      TOKEN = process.env.TOKEN,
      port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
      ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

client.commands = new Discord.Collection();

fs.readdir("./events/", (err, eventFiles) => {
  if (err) return console.error(err);
  for (eventFile of eventFiles) {
    if (!eventFile.endsWith(".js")) continue;
    try {
      client.on(eventFile.split(".")[0], require(`./events/${eventFile}`));
    } catch (e) {throw e;}
  }
});


fs.readdir("./commands/", (err, commandFiles) => {
  if (err) throw err;
  for (commandFile of commandFiles) {
    if (!commandFile.endsWith(".js")) continue;
    let commandObj = require(`./commands/${commandFile}`);
    client.commands.set(commandFile.split(".")[0], commandObj);
  }
});

client.login(TOKEN);
