

var util = require("util");
var spawn = require("child_process").spawn;
var parse = require("../parsers/hd-info").parse;

module.exports = function getHds(hdPath){
  return new Promise((res, rej) => {
    var proc = spawn("VBoxManage", ["showhdinfo", hdPath])
    var data = "";
    proc.stdout.on("data", function(d){
      data += d.toString();
    });
    proc.on("close", function(code){
      if(code !== 0){
        rej(new Error("VBoxManage showhdinfo failed"))
        return;
      }
      res(parse(data));
    })
  });
}
