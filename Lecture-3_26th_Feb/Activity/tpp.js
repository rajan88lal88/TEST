let cmd = process.argv[2];
let view = require("./commands/view");
let treefy = require("./commands/treefy");
let untreefy = require("./commands/untreefy");
let monitor = require("./commands/monitor");
let help = require("./commands/help");

switch (cmd) {
  case "view":
    viewFile.view(process.argv[3],process.argv[4]);
    break;
  case "untreefy":
    untreefyFile.untreefy(process.argv[3],process.argv[4]);
    break;
  case "treefy":
    treefyFile.treefy(process.argv[3],process.argv[4]);
    break;
  case "monitor":
    monitorFile.monitor(process.argv[3],process.argv[4]);
    break;
  case "help":
    helpFile.help();
    break;
  default:
    console.log("Wrong Command");
}
