# data-model-sdk

|***THIS IS STILL VERY PRELIMINARY. PLEASE DON'T USE.***|
|---|


```javascript
const { getProfile } = require("@actito/data-model-sdk/lib/profiles");
const { init } = require("@actito/data-model-sdk/lib/init");

init({
  user: "user",
  password: "password",
  entity: "product",
  env: "test"
});

getProfile("Clients", "7").then(({ profile }) => console.log(profile));
```