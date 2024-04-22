1. For deployment go to manifest, datasource change uri from "uri": "/odata/v4/valid/", to "uri": "srv-api/odata/v4/valid/"
   At runtime the application will look for srv-api in the xs-app.json

2. To build the app, it is needed to have the package-lock.json files already produced. To do this activity, you must run:
```sh
npm update --package-lock-only
```
in both root folder and app/frontend folder (in general, in every folder that has its own package.json)