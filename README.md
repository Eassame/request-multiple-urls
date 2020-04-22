# request-multiple-urls
This is a package to handle multiple urls containing json data and return their contents in a promise

# Features
- Checks urls are valid (unless the url is only a path)
- Cancels request response time takes to longer than timeout value (default value is 1000 ms but this can be edited)


# Promises
This package requires native ES6 Promises to be supported. If your environment doesn't support ES6 Promises, you can use a [polyfill](https://www.npmjs.com/package/es6-promise/).

# Getting Started
Below we are simply importing the module, inputting a number of endpoints, and handling the promise that returns:
```
const requestMultipleUrls = require("./requestMultipleUrls");

const urls = [
  "url-json-1",
  "url-json-2",
  "url-json-3",
];

//Custom timeout of 2000ms (2 seconds)
requestMultipleUrls(urls, 2000)
  .then((urlsContent) => {
  
    //Url data content is available here as 'urlsContent', e.g:
    
    console.log(urlsContent)
  })
  .catch((err) => console.log(err));

```

# Dependencies (2):
- [axios](https://www.npmjs.com/package/axios)
- [is-url](https://www.npmjs.com/package/is-url)
