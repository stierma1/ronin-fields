
module.exports = function nicRules(rules){
  var rulesStr  = "";
  for(var rule of rules){
    rulesStr += itemWrap(nicRule(rule));
  }
  return `<ul>${rulesStr}</ul>`
}

function itemWrap(content){
  return `<li>${content}</li>`
}

function nicRule(rule){
  return `
    <div>
    <div><label>Name:</label>${rule.name}</div>
    <div><label>Host Port - Guest Port:</label>&nbsp;${rule.host_port} - ${rule.guest_port}</div>
    </div>
  `
}
