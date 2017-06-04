
var getHdds = require("./get-hdd-list");
var getHdInfo = require("./get-hd-info");

async function getAllHddInfos(){
  var vms = await getHdds();

  var infos = await vms.reduce(async (red, val) => {
    var acc = await red;
    var vmInfo = await getHdInfo(val.location);
    acc.push(vmInfo);
    return Promise.resolve(acc);
  }, Promise.resolve([]));

  return infos;
}

module.exports = getAllHddInfos;
