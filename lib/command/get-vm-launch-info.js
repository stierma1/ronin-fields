var VMUtils = require("./vm-utils");
var fs = require("fs");

async function getVmLaunchInfo({name}){
  return fs.readFileSync(VMUtils.getVmPath(process.cwd(), name) + "/launch.txt", "utf8")
}

module.exports = getVmLaunchInfo;
