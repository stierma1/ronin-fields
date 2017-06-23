
var spawnSync = require("child_process").spawnSync;
var mkdirp = require("mkdirp");
var templ = require("./vagrant-template");
var fs = require("fs");
var injector = require("poormans-injector").globalInjector;
var VMUtils = require("./vm-utils");

async function run(name, box, portForwards, numCpus, memory){
  var vmPath = VMUtils.getVmPath(process.cwd(), name);
  var wait = await new Promise((res) => {mkdirp(vmPath, function(){
    res();
  })});

  var temp = templ(box, portForwards, numCpus || 1, memory || 1048);
  fs.writeFileSync(vmPath + "/VagrantFile", temp);
  var returnVal = spawnSync("vagrant", ["up"], {cwd:vmPath})
  fs.writeFileSync(vmPath + "/launch.txt", returnVal.output.toString());
}


module.exports=  run;

//run("test", null, {ssh:{guest:"22", host:"2223"}})
