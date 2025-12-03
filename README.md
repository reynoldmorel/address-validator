# address-validator

## Thought process

1. I need to define scope since this is very opened.
2. Let me try to make this as simple as possible.
3. Let me use NodeJS for an easy setup using [ExpressJS](https://expressjs.com/)
4. Now let me build a simple api that will accept and string and return and empty object (just to make the whole backend workflow work)
5. Since manipulating the string to identify parts, like street, city, state and so on. I will just look for a library since I don't think we want to build a whole NLP system. (Probably I can find a library using NLP)
6. On the internet I wrote down: `"NLP library to parse addresses in NodeJS"`, I found [node-postal](https://www.npmjs.com/package/node-postal). No reason why I decided to use that one, I can wrap the library into a function so it can be changed at any moment.
7. Setting it up to work on the local machine is hard, in order to simplify the project set up, I will just put it into a Docker container (would quickly use AI support from VS Code to build it for me).
8. After parsing the input, I need to validate the resulting parts from the pasing process like the address1, address2, city, state and so on. I took a look again in the internet, writing down: `"address validation api"` and found out that the USPS API can do address validation for free. Just needed to create and account, and request access to the api. See the docs [here](https://www.usps.com/business/web-tools-apis/address-information-api.htm)
9. Started integrating the library and the external service.

## Tradeoffs

1. The current project as it is, can't be considered as a production ready project. It is more like a POC.
2. Using [node-postal](https://www.npmjs.com/package/node-postal) can make things more complex. It would be good look for a provider that could handle string parsing and validation like [Google Address Validation API](https://developers.google.com/maps/documentation/address-validation/overview), it could be more complete. If we want to handle the validation ourselves we would need to think in a bigger infrastucture to support a DB with all the mappings and keep up to date with all the changes like street names, zip codes, states and so on.
3. We could implement either AI agents or build our own AI system to handle this validation and more human-like way. It will definitely consume more resources, but people and also other services might start using the tool, probably increasing revenue.
4. The API is not protected, even though protection adds another layer of abstraction and more overhead, it is still beneficial to keep the services healthy, since a lot of devices or clients could hit the endpoint.
5. I didn't have time to add tests, but these are critical, any change to this API can break the clients that are using it as a source. We should not make breaking changes without us knowing first what will be broken. When devs failed to review a change properly, the tests are the backups. Deployment pipeline could increase time to deliver the app to prod, but the product will have more quality due to less bugs.

## Setup

If you don't want to use the default USPS user id, then you can register to https://registration.shippingapis.com/ and use yours.


This project is using docker due to [node-postal](https://www.npmjs.com/package/node-postal) library.

In order to run it:

```
docker build -t address-validator .

docker run --name address-validator -p 8080:8080 address-validator
```

Then you can call the endpoint by hitting this url from `curl` or `postman`:

```
curl --location 'localhost:8080/validate-address' \
--header 'Content-Type: application/json' \
--data '{"address": "TESTING-ADDRESS"}'
```