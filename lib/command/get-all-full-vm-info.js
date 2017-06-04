
var getAllHddInfos = require("./get-all-hd-infos");
var getAllVmInfos = require("./get-all-vm-infos");

async function getFullHddsInfo(){
  var vmInfos = await getAllVmInfos();
  var hddInfos = await getAllHddInfos();
  var fullVMInfo = [];
  for(var hdInfo of hddInfos){

    for(var vmInfo of vmInfos){

      if(hdInfo.inUseByVms === vmInfo.name){
        vmInfo.hdInfo = hdInfo;

        fullVMInfo.push(vmInfo);
        break;
      }
    }
  }
  return fullVMInfo;
}


module.exports = getFullHddsInfo;
