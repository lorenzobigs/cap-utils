### New Sample Files Available
In version 1.0.7 sample files for xsuaa,html5-repo,hana,mta based deployment were added:
- valid-service.cds were changed to add scope protection on srv
- test.http were modified to add Basic authentication for local testing
- xs-security.json: it will add scope base authorizations
- xs-security-cc.json : it will add a client credential user with authorizations to consume srv
- mta.yaml : enable the app for a Cloud Foundry deployment. 
- package-for-cap.json: it is provided some examples to mock user for local development, features for production deployment. Copy the required section in your package.json

Please subsistute the "demo" app identifier with you app ID wherever needed. In a future release it will be automated.