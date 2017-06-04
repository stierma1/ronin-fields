
var System = require("pid-system");

async function builder(){
  var [returnPid, op, fieldname, config] = await this.receive();
  var fieldStatusPid = await System.spawn("field-status");
  fieldStatusPid.send([this, fieldname]);
  var [status, fieldStatus] = await this.receive();

  if(status !== "OK"){
    returnPid.send("ERR", fieldStatus);
    this.exit();
    return
  }

  if(fieldStatus === "EXISTS" && op === "NEW"){
    returnPid.send("ERR", new Error("Field already exists"));
    this.exit();
    return
  }

  var makeRoomPid = await System.spawn("make-room");
  makeRoomPid.send([this, op, fieldname, config]);

  var [status, makeRoomStatus] = await this.receive();
  if(status !== "OK"){
    returnPid.send("ERR", makeRoomStatus);
    this.exit();
    return
  }

  var buildBoxPid = await System.spawn("build-box");
  buildBoxPid.send([this, fieldname, config]);


}
