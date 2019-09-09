const fs = require("fs"),
      Discord = require("discord.js"),
      mongoose = require("mongoose"),
      client = new Discord.Client(),
      Schema = mongoose.Schema,
      TOKEN = process.env.TOKEN,
      port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
      ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

client.commands = new Discord.Collection();

let SubmissionSchema = new Schema({
  instanceName: String,
  instanceType: String, // Entity, Block, Item
  instanceURL: {type: String, default: ""},
  instanceID: Integer,
  author: String, // Author ID
  creation: {type: Integer, default: Date.now()},
  lastUpdate: {type: Integer, default: 0},
  updates: {type: Integer, default: 0},
  suggestions: [String, String] // User ID, Suggestion
});

client.dataModel = mongoose.model("dataModel", SubmissionSchema);

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
    client.commands.set(commandFile.split(".")[0], require(`./commands/${commandFile}`));
  }
});

client.login(TOKEN);
