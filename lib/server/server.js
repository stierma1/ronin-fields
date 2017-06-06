
var express = require("express");
var getFullVmInfos = require("../command/get-all-full-vm-info");
var rootTemplate = require("../templates/root");
var vmInfosTemplate = require("../templates/vm-infos");
var vmTable = require("../templates/vm-table");

var app = express();

app.get("/all-vms", async function(req, res){
  var infos = await getFullVmInfos();
  res.status(200).send(rootTemplate(vmTable(infos)));
});

app.listen(5151)
