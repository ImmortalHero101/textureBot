const fs = require("fs"),
      Discord = require("discord.js"),
      mongoose = require("mongoose"),
      db = mongoose.connection,
      dbHandler = require("node-json-db"),
      database = new dbHandler("./data/botDatabase", true),
      rawDB = database.getData(`/`),
      client = new Discord.Client(),
      Schema = mongoose.Schema,
      {TOKEN} = process.env,
      port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
      ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

let url = '127.0.0.1:27017/' + (process.env.OPENSHIFT_APP_NAME || "data");
console.log();
console.log(url);
console.log(ip, port);
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    url = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
}
db.connect("mongodb+srv://botAdmin:botAdmin123@botdata-gkdtk.gcp.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true}); 

db.on("open", () => console.log("Successfully contacted to mongodb!!"));

class Submission {
  constructor(authorID, instanceName, instanceType, instanceURL = "") {
    this.instanceName = instanceName,
    this.instanceType = instanceType, // Entity, Block, Item
    this.instanceURL = instanceURL,
    this.instanceID = Math.floor(Math.random() * 89999 + 10000),
    this.authorID = authorID, // Author ID
    this.creation = Date.now(),
    this.lastUpdate = 0,
    this.updates = 0,
    this.suggestions = [] // User ID, Suggestion
  }
}

Object.assign(client, {
  commands: new Discord.Collection(),
  classes: {Submission},
  rawDB,
  db: {handler:database}
});

fs.readdir("./events/", (err, eventFiles) => {
    if (err) return console.error(err);
    for (eventFile of eventFiles) {
      if (!eventFile.endsWith(".js")) continue;
      try {
        client.on(eventFile.split(".")[0], require(`./events/${eventFile}`).bind(null, client));
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

  require('http').createServer().listen(3000)
