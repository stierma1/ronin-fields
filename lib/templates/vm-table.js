
function vmTable(vmInfos){
  var rows = vmRows(vmInfos);
  return `<table>
    ${vmHeader()}
    ${rows}
  </table>`
}

function vmHeader(){
  return `<tr><th>Name</th><th>State</th><th>OS</th><th>#CPUs</th><th>Memory</th><th>Hard Drive Usage</th><th>Hard Drive Max Capacity</th><th>SSH Port</th></tr>`
}

function vmRows(vmInfos){
  var rows = "";
  for(var i in vmInfos){
    var sshNic = vmInfos[i].nics[0].rules.filter((rule) => {return rule.name === "ssh"})[0] || {};
    sshNic = sshNic.host_port
    rows += `<tr><td>${vmInfos[i].name}</td><td>${vmInfos[i].state.split("(")[0]}</td><td>${vmInfos[i].guestOS}</td><td>${vmInfos[i].numberOfCPUs}</td><td>${vmInfos[i].memorySize}</td><td>${vmInfos[i].hdInfo.sizeOnDisk}</td><td>${vmInfos[i].hdInfo.capacity}</td><td>${sshNic}</td></tr>`
  }
  return rows;
}

module.exports = vmTable;
