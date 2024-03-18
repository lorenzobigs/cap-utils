## Consuming an external service and exposing as a projection in you service

1. Copy the metadata of the service in your root folder (example: "nw.xml")

Open the terminal in your **CAP Project root directory** and run 
```sh
cds import nw.xml
```

This will :
- create a folder **external** in your srv folder which will contain the .xml and .cds format of the metadata.
- add a section in your package.json with the service dependency

2. In the service use the imported service definition (see external-service.cds) to expose the entity you need

3. In the .js of you service you implement the handler for the service

4. Install the required dependencies

```sh
npm i @sap-cloud-sdk/http-client @sap-cloud-sdk/util
```

References:

https://www.npmjs.com/package/@sap-cloud-sdk/util

https://www.npmjs.com/package/@sap-cloud-sdk/http-client

