var injector = require("poormans-injector").globalInjector;
var path = require("path");

var JsonPropertiesResolver = require("poormans-injector").Resolvers.JsonPropertiesResolver;
var defaultProps = new JsonPropertiesResolver({filePath: path.join(__dirname, "../properties/default.json")});

injector.addGlobalFromPropsList(defaultProps.getPropertiesList());
