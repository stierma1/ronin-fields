

var util = require("util");
var spawn = require("child_process").spawn;
var parse = require("../parsers/hdd-list").parse;

module.exports = function getHdds(){
  return new Promise((res, rej) => {
    var proc = spawn("VBoxManage", ["list", "hdds"])
    var data = "";
    proc.stdout.on("data", function(d){
      data += d.toString();
    });
    proc.on("close", function(code){
      if(code !== 0){
        rej(new Error("VBoxManage list vms failed"))
        return;
      }
      
      res(parse(data));
    })
  });
}
