var nicRules = require("./nic-rules");

module.exports = function(vmInfo){
  return `<div>
    <div><label>Name:</label>&nbsp; ${vmInfo.name}</div>
    <div><label>UUID:</label>&nbsp;${vmInfo.uuid}</div>
    <div><label>Guest OS:</label>&nbsp;${vmInfo.guestOS}</div>
    <div><label>Number of CPUs:</label>&nbsp;${vmInfo.numberOfCPUs}</div>
    <div><label>Memory Size:</label>&nbsp;${vmInfo.memorySize}</div>
    <div><label>State:</label>&nbsp;${vmInfo.state}</div>
    <div><label>Hard Drive Max Capacity:</label>&nbsp;${vmInfo.hdInfo.capacity}</div>
    <div><label>Hard Drive Used:</label>&nbsp;${vmInfo.hdInfo.sizeOnDisk}</div>
    <div><label>Port Mappings:</label>${nicRules(vmInfo.nics[0].rules)}</div>
  </div>`
}
