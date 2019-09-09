const fs = require("fs"),
      Discord = require("discord.js"),
      mongoose = require("mongoose"),
      db = mongoose.connection,
      dbHandler = require("node-json-db"),
      database = new dbHandler("./data/botDatabase", true),
      client = new Discord.Client(),
      Schema = mongoose.Schema,
      TOKEN = process.env.TOKEN,
      port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
      ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

let url = '127.0.0.1:27017/' + (process.env.OPENSHIFT_APP_NAME || "data");
console.log(database.getData(`/`));
console.log(url);
console.log(ip, port);
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    url = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
}

client.commands = new Discord.Collection();

let SubmissionSchema = new Schema({
  instanceName: String,
  instanceType: String, // Entity, Block, Item
  instanceURL: {type: String, default: ""},
  instanceID: Number,
  author: String, // Author ID
  creation: {type: Number, default: Date.now()},
  lastUpdate: {type: Number, default: 0},
  updates: {type: Number, default: 0},
  suggestions: [String, String] // User ID, Suggestion
});

client.dataModel = mongoose.model("dataModel", SubmissionSchema);

mongoose.connect(`mongodb://${url}`, {useNewUrlParser: true});

db.on("open", function() {
  console.log("Database connected!");
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

  client.login(TOKEN).then(()=>console.log("Client logged in!"));
});
