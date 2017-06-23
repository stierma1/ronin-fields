
var spawnSync = require("child_process").spawnSync;
var spawn = require("child_process").spawn;
var VMUtils = require("./vm-utils");
var fs = require("fs");

async function destroy({name}){
  var vmPath = VMUtils.getVmPath(process.cwd(), name);
  var returnVal = spawnSync("vagrant", ["destroy", "--force"], {cwd:vmPath})
  fs.writeFileSync(vmPath + "/last-status.txt", returnVal.output.toString());
  return returnVal.output.toString();
}

module.exports=  destroy;
