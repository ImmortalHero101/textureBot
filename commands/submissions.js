module.exports = async function (client, message, contents) {
  let targetMember = message.member;
  if (content) {
    let {matchedID} = (content.match(/(<matchedID>?\d+)|<@!?(<matchedID>?\d+)>/)||{groups:{}}).groups;
    if (!matchedContent && targetMember = message.guild.members.get(matchedID)) return message.channel.send("I could not find the user you mentioned!");
  }
  let data = [...(await client.dataModel.find({author: targetMember.user.id}))];
  if (!data.length) return message.channel.send({embed:{
    author: {name: message.member.displayName, icon_url: message.author.displayAvatarURL},
    title: "Submissions Menu | View Submissions",
    description: "You have no submissions!",
    color: parseInt("2578FF", 16)
  }});
  let entities = data.filter(texture => instanceType === "entity"),
      blocks = data.filter(texture => instanceType === "block"),
      items = data.filter(texture => instanceType === "item");
  return message.channel.send({embed:{
    author: {name: message.member.displayName, icon_url: message.author.displayAvatarURL},
    title: "Submissions Menu | View Submissions",
    fields: [
      {name: `${targetMember.displayName}'s submissions`, value: `${entities.length ? `**Entities:**\n${entities.map(entity => `▫️ ${entity.instanceName}: ${entity.instanceID}`).join("\n")}\n` : ""}${blocks.length ? `**Blocks:**\n${blocks.map(block => `▫️ ${block.instanceName}: ${block.instanceID}`).join("\n")}\n` : ""}${items.length ? `**Items:**\n${items.map(item => `▫️ ${item.instanceName}: ${item.instanceID}`).join("\n")}\n` : ""}`},
    ],
    color: parseInt("2578FF", 16)
  }});
}
