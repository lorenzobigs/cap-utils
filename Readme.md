![cap-utils v1.0.11](https://img.shields.io/badge/cap%20utils-v1.0.11-green)

# Cap Utilities
This npx tools provides a set of example files to explore SAP Cloud Application Programming features.

## How to use
It's simple! Open the terminal in your **CAP Project root directory** and run 
```sh
npx cap-utils
```

Your project will be updated. Run
```sh
cds watch 
```
and use the **test.http** to run some test. You are very encouraged to explore and extend the example files!

*If you don't know how to initialize a SAP CAP Project:* [Jumpstart guide in SAP CAPire](https://cap.cloud.sap/docs/get-started/in-a-nutshell#jumpstart)

Keep in mind that from 1.0.7 version the service were enhanced with scope protection.
To add a local mock user copy the **auth** section from package-for-cap.json into your package.json and run : 
```sh
cds watch --profile local
```
The local profile will inject a mock user with the required scope to consume the service. You can use the same user to access to the webapp.



### Additional Modules
In version 1.0.4 it has been added a feature to add extra modules to your app.
```sh
npx cap-utils --add <extra_module_1>,<extra_module_2>...
```

Available modules:
  - **ui5**        --> add a basic UI5 freestyle application in your project
  - **mta**        --> add sample files for mta based deployment on Cloud Foundry runtime
  - **profiling**  --> add a section in your package.json with cds profiles


### Suggested Extension in your IDE
|  Visual Studio / SAP BAS   |
| -------------------------- |
| "sapse.vscode-cds"         |
| "dbaeumer.vscode-eslint"   |
| "humao.rest-client"        |
| "qwtel.sqlite-viewer"      |
| "mechatroner.rainbow-csv"  |
