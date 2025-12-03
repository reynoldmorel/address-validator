# address-validator

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