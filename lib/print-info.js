var getFullVmInfos = require("./command/get-all-full-vm-info");
var rootTemplate = require("./templates/root");
var vmInfosTemplate = require("./templates/vm-infos");

(async function(){
  var infos = await getFullVmInfos();
  console.log(rootTemplate(vmInfosTemplate(infos)));
})()
