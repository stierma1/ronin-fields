
function addVmTemplate(){
  return `<div>
    <form action="/create-vm" method="post">
      <div>
      <label>Key:</label><input name="key" type="text"></input>
      </div>
      <div>
      <label>Prefix Name:</label><input name="name" type="text"></input>
      </div>
      <div>
      <label>Guest OS:</label><input name="guest_os" type="text"></input>
      </div>
      <div>
      <label>Number of CPUs:</label><input name="number_of_cpus" type="text"></input>
      </div>
      <div>
      <label>Memory:</label><input name="memory" type="text"></input>
      </div>
      <div>
      <label>Port Mapping 1(Name):</label><input name="port_mapping_1_name" type="text"><label>Port Mapping 1(Host):</label><input name="port_mapping_1_host" type="text"></input><label>Port Mapping 1(Guest):</label><input name="port_mapping_1_guest" type="text"></input>
      </div>
      <div>
      <label>Port Mapping 2(Name):</label><input name="port_mapping_2_name" type="text"><label>Port Mapping 2(Host):</label><input name="port_mapping_2_host" type="text"></input><label>Port Mapping 2(Guest):</label><input name="port_mapping_2_guest" type="text"></input>
      </div>
      <div>
      <label>Port Mapping 3(Name):</label><input name="port_mapping_3_name" type="text"><label>Port Mapping 3(Host):</label><input name="port_mapping_3_host" type="text"></input><label>Port Mapping 3(Guest):</label><input name="port_mapping_3_guest" type="text"></input>
      </div>
      <div>
      <label>Port Mapping 4(Name):</label><input name="port_mapping_4_name" type="text"><label>Port Mapping 4(Host):</label><input name="port_mapping_4_host" type="text"></input><label>Port Mapping 4(Guest):</label><input name="port_mapping_4_guest" type="text"></input>
      </div>
      <input type="submit" value="Submit">
    </form>
  </div>`
}

module.exports = addVmTemplate;
