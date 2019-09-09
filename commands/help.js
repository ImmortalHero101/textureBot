module.exports = function(client, message, splitArgs) {
  return message.channel.send({embed:{
    author: {name: message.member.displayName, icon_url: message.author.displayAvatarURL},
    title: "Help Menu | All Commands",
    fields: [
      {name: "View your submissions", value: "**Usage:** `$submissions [Optional Mention]`\nView your (or mentioned member's) submissions."},
      {name: "Add a submission", value: "**Usage:** `$submit [entity/block/item name] [URL/attachment]`\nSubmits your entry on the bot database."},
      {name: "Update your submission", value: "**Usage:** `$update [Submission ID] [URL/attachment]`\nUpdates your existing entry with the provided one."},
      {name: "Remove your submission", value: "**Usage:** `$remove [Submission ID]`\nPermanently remove your entry from the bot database and the resource pack."},
      {name: "Info on texture instance", value: "**Usage:** `$check [entity/block/item name]`\nCheck if entity/block/item is taken by a different user and suggestions left by others."},
      {name: "Occupy a texture instance", value: "**Usage:** `$occupy [entity/block/item]`\mMark a texture instance as occupied by you."},
      {name: "Leave a suggestion on an instance", value: "**Usage:** `$suggest [entity/block/item] [Your suggestion]`\nMake a suggestion on an unoccupied texture instance."}
    ],
   footer: {text: "Report to Confuwusion or any other mod in case of any errors"},
   color: parseInt("2578FF", 16)
  }});
}
