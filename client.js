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
  instanceType: String, // Entity, Block, Item
  suggestions: [String, String], // User ID, Suggestion
  instanceURL: {type: String, default: ""},
  instanceID: Integer,
  creation: {type: Integer, default: Date.now()},
  lastUpdate: {type: Integer, default: 0},
  updates: {type: Integer, default: 0},
  author: String // Author ID
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
