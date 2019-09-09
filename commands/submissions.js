module.exports = async function (client, message, contents) {
  let targetMember = message.member;
  if (content) {
    let {matchedID} = (content.match(/(<matchedID>?\d+)|<@!?(<matchedID>?\d+)>/)||{groups:{}}).groups;
    if (!matchedContent && targetMember = message.guild.members.get(matchedID)) return message.channel.send("I could not find the user you mentioned!");
  }
  let data = await client.dataModel.find({author: targetMember.user.id});
  
}
