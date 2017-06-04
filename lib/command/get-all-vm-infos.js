
var getVms = require("./get-vm-list");
var getVmInfo = require("./get-vm-info");

async function getAllVmInfos(){
  var vms = await getVms();

  var infos = await vms.reduce(async (red, val) => {
    var acc = await red;
    var vmInfo = await getVmInfo(val.boxName);
    acc.push(vmInfo);
    return Promise.resolve(acc);
  }, Promise.resolve([]));

  return infos;
}

module.exports = getAllVmInfos;
