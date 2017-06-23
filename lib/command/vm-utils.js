var injector = require("poormans-injector").globalInjector;

function getVmPath({vmDirectory, cwd, name}){
  return vmDirectory.replace("${cwd}", cwd).replace("${name}", name);
}

function getServerInfo({serverPort}){
  return {port:serverPort}
}

class VMUtils{
  constructor(){

  }

  static getVmPath(cwd, name){
    return injector.injectData(getVmPath, {cwd, name});
  }

  static getServerInfo(){
    return injector.injectData(getServerInfo, {});
  }
}

module.exports = VMUtils
