
var spawnSync = require("child_process").spawnSync;
var VMUtils = require("./vm-utils");
var fs = require("fs");

async function up({name}){
  var vmPath = VMUtils.getVmPath(process.cwd(), name);
  var returnVal = spawnSync("vagrant", ["up"], {cwd:vmPath})
  fs.writeFileSync(vmPath + "/last-status.txt", returnVal.output.toString());
  return returnVal.output.toString();
}

module.exports=  up;
