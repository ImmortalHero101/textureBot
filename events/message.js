module.exports = function(client, message) {
  console.log("Condition:", client.stopper || message.author.bot || message.guild && ((message.guild.id !== "415019865800310793" && message.channel.id !== "618568997494849536") || message.guild.id !== "620583116586876970"));
  if (client.stopper || message.author.bot || message.guild && ((message.guild.id !== "415019865800310793" && message.channel.id !== "618568997494849536") || message.guild.id !== "620583116586876970")) return;
  let [commandName, ...splitArgs] = message.content.slice(1).split(" ");
  console.log(commandName);
  try {
    let selectedCommand = client.commands.get(commandName);
    console.log(selectedCommand)
    if (!selectedCommand) return;
    selectedCommand(client, message, splitArgs.join(" "));
  } catch (e) {
    return message.channel.send("An error occured while running the command. Please contact the mods about this issue.");
  }
}
