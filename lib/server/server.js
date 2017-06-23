
var express = require("express");
var getFullVmInfos = require("../command/get-all-full-vm-info");
var rootTemplate = require("../templates/root");
var vmInfosTemplate = require("../templates/vm-infos");
var vmTable = require("../templates/vm-table");
var addVm = require("../templates/add-vm");
var bodyParser = require("body-parser");
var run = require("../command/vagrant-run");
var getVmLaunchInfo = require("../command/get-vm-launch-info");
var vagrantHalt = require("../command/vagrant-halt");
var vagrantUp = require("../command/vagrant-up");
var vagrantDestroy = require("../command/vagrant-destroy");

require("../init")

var app = express();

app.get("/all-vms", async function(req, res){
  var infos = await getFullVmInfos();
  res.status(200).send(rootTemplate(vmTable(infos)));
});

app.get("/create-vm", async function(req, res){
  res.status(200).send(rootTemplate(addVm()));
});

app.post("/create-vm", bodyParser.urlencoded({ extended: false }), async function(req, res){
  var numberOfCPUs = req.body.number_of_cpus;
  var memorySize = req.body.memory;
  var guestOS = req.body.guest_os === "" ? undefined : req.body.guest_os;
  var boxName = req.body.name;
  var portForwards = {};
  if(req.body.port_mapping_1_name !== ""){
    portForwards[req.body.port_mapping_1_name] = {guest:req.body.port_mapping_1_guest, host: req.body.port_mapping_1_host}
  }
  run(boxName, guestOS, portForwards, numberOfCPUs, memorySize);
  res.redirect("/all-vms");
});

app.get("/get-vm-launch-info/:name", async function(req, res) {
  var name = req.params.name;
  var vmInfo = await getVmLaunchInfo({name});
  res.status(200).send(`<html><body><pre>${vmInfo}</pre></body></html>`);
});

app.get("/halt-vm/:name/:key", async function(req, res) {
  var name = req.params.name;
  var key = req.params.key;
  var status = await vagrantHalt({name});
  res.redirect("/all-vms");
});

app.get("/up-vm/:name/:key", async function(req, res) {
  var name = req.params.name;
  var key = req.params.key;
  var status = await vagrantUp({name});
  res.redirect("/all-vms");
});

app.get("/destroy-vm/:name/:key", async function(req, res) {
  var name = req.params.name;
  var key = req.params.key;
  var status = await vagrantDestroy({name});
  res.redirect("/all-vms");
});

app.listen(5151)
