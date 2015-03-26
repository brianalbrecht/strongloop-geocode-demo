# strongloop-geocode-demo

### To run the app
Install the dependencies (first time)
```
npm install
```
Run the app:
```
slc run
```

###Relevant code:
**server/datasources.json** (define the datasource)
```json
{
  "db": {
    "name": "db",
    "connector": "memory",
    "user": "demo"
  },
  "restsvc": {
    "name": "restsvc",
    "connector": "rest",
    "debug": "false",
    "operations": [
      {
        "template": {
          "method": "GET",
          "url": "http://maps.googleapis.com/maps/api/geocode/json",
          "headers": {
            "accepts": "application/json",
            "content-type": "application/json"
          },
          "query": {
            "address": "{street},{city},{zipcode}",
            "sensor": "{sensor=false}"
          },
          "responsePath": "$.results[0].geometry.location"
        },
          "functions": {
            "geocode": [
              "street",
              "city",
              "zipcode"
            ]
          }
      }
    ]
  }
}
```
**server/model-config.json** (register the model)
```json
...
  "Geocode": {
    "dataSource": "restsvc",
    "public": true
  }
```
**common/models/geocode.json**  (define the model properties)
```json
{
  "name": "Geocode",
  "plural": "Geocode",
  "base": "Model",
  "idInjection": true,
  "properties": {
    "street": {
      "type": "string",
      "required": true
    },
    "city": {
      "type": "string",
      "required": true
    },
    "zipcode": {
      "type": "string",
      "required": true
    }
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": []
}
```
**common/models/geocode.js**  (custom business logic to hide the out-of-the-box *invoke* method on the model)
```javascript
module.exports = function(Geocode) {
    var isStatic = true;
    Geocode.disableRemoteMethod('invoke', isStatic);
};
```