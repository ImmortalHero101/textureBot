module.exports = function (client, message, content) {
  let targetMember = message.member;
  if (content) {
    let {matchedID} = (content.match(/(<matchedID>?\d+)|<@!?(<matchedID>?\d+)>/)||{groups:{}}).groups;
    targetMember = message.guild.members.get(matchedID)
    if (!targetMember) return message.channel.send("I could not find the user you mentioned!");
  }
  let data = client.rawDB.submissions.find(submission => submission.authorID === targetMember.user.id);
  if (!data.length) return message.channel.send({embed:{
    author: {name: message.member.displayName, icon_url: message.author.displayAvatarURL},
    title: "Submissions Menu | View Submissions",
    description: "You have no submissions!",
    color: parseInt("2578FF", 16)
  }});
  let entities = data.filter(texture => texture.instanceType === "entity"),
      blocks = data.filter(texture => texture.instanceType === "block"),
      items = data.filter(texture => texture.instanceType === "item");
  return message.channel.send({embed:{
    author: {name: message.member.displayName, icon_url: message.author.displayAvatarURL},
    title: `Submissions Menu | View ${targetMember.displayName}'s Submissions`,
    fields: [
      {name: "Entities", value: entities.length ? `${entities.map(entity => `▫️ ${entity.instanceName}: ${entity.instanceID}`).join("\n")}\n` : "*No entries*"},
      {name: "Block", value: blocks.length ? `**Blocks:**\n${blocks.map(block => `▫️ ${block.instanceName}: ${block.instanceID}`).join("\n")}\n` : "*No entries*"},
      {name: "Items", value: items.length ? `**Items:**\n${items.map(item => `▫️ ${item.instanceName}: ${item.instanceID}`).join("\n")}\n` : "*No entries*"}
    ],
    color: parseInt("2578FF", 16)
  }});
}
