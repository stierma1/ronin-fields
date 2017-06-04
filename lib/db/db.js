
var PouchDB = require("pouchdb");

class DB{
  constructor(connectionString){
    this._db = new PouchDB(connectionString || "fields");
  }

  async get(id, withMeta){
    if(withMeta)
      return (await this._db.get(id, {include_docs:true}))
    else
      return (await this._db.get(id, {include_docs:true})).fieldData
  }

  async put(id, data){
    return await this._db.put({_id, fieldData:data});
  }
}

module.exports = DB;
mdoule.exports.globalDb = null;
