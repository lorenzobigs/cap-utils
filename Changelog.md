### 1.2.2 - Service Restriction
Typo fix in *service.cds on role definition for entity restrictions

### 1.2.0 - Unit Tests Sample
In version 1.2.0 there were added sample files to run unit tests on the application.
Ensure to add the required devDependencies.
The feature can be used with:
```sh
npx cap-utils --add test
```
Then run:
```sh
npm test
```

### 1.1.1 - External Service Sample
In version 1.1.1 there were added sample files to consume an external odata service exposed as entity of the internal catalog service.
The feature can be used with:
```sh
npx cap-utils --add ext
```

### 1.0.7 - New Sample Files Available
From version 1.0.11 you can modify your package.json to add a cds profiling section.

In version 1.0.7 sample files for xsuaa,html5-repo,hana,mta based deployment were added:
- valid-service.cds were changed to add scope protection on srv
- test.http were modified to add Basic authentication for local testing
- xs-security.json: it will add scope base authorizations
- xs-security-cc.json : it will add a client credential user with authorizations to consume srv
- mta.yaml : enable the app for a Cloud Foundry deployment. 



