var vmInfoTemplate = require("./vm-info");

module.exports = function(vmInfos){
  var infos = "";
  vmInfos.map((info) => {
    infos += vmItem(vmInfoTemplate(info));
  });
  return `<ul>${infos}</ul>`
}

function vmItem(content){
  return `<li class="box">${content}</li>`
}
