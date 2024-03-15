![cap-utils v1.0.5](https://img.shields.io/badge/cap%20utils-v1.0.4-green)

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

### Additional Modules
In version 1.0.4 it has been added a feature to add extra modules to your app.
```sh
npx cap-utils --add <extra_module_1,extra_module_2...>
```

Available modules:
  - **ui5** --> add a basic UI5 freestyle application in your project


### Suggested Extension in your IDE
|  Visual Studio / SAP BAS   |
| -------------------------- |
| "sapse.vscode-cds"         |
| "dbaeumer.vscode-eslint"   |
| "humao.rest-client"        |
| "qwtel.sqlite-viewer"      |
| "mechatroner.rainbow-csv"  |
