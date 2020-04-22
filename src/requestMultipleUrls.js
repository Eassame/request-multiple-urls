const axios = require("axios");
const isUrl = require("is-url");

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const requestMultipleUrls = (urls, timeout) => {
  //Check if 'urls' is an array
  if (!Array.isArray(urls) || urls.length <= 1) {
    throw new Error("Please pass an array of multiple urls as a parameter");
  }

  //Check if urls are strings and are valid urls (if not just an endpoint path)
  if (
    urls.some(
      (url) => typeof url !== "string" || (!isUrl(url) && url[0] !== "/")
    )
  ) {
    throw new Error(
      "Please make sure all of the elements of the array are urls of type string"
    );
  }

  //Array of requests
  const arrayOfRequests = urls.map((url) => {
    return axios.get(url, {
      cancelToken: source.token,
    });
  });

  //Array of requests to be called at once until all calls have resolved

  const timeoutValue = 1000 || timeout;
  let isResolved = false;
  let promiseTimeOutCount;

  const combinedPromises = () => {
    const combinedPromise = Promise.all(arrayOfRequests);

    //This is to make sure the request endpoints don't take unnecessarily long if they aren't valid
    promiseTimeOutCount = setTimeout(() => {
      if (!isResolved) {
        source.cancel(
          `Response from one or more of the endpoints took longer than ${Math.floor(
            timeoutValue / 100
          )}s`
        );
      }
    }, timeoutValue);
    return combinedPromise;
  };

  //Extract data from the promise and return a new promise with all data
  return combinedPromises()
    .then((promise) => {
      isResolved = true;
      clearTimeout(promiseTimeOutCount);

      //Create new promise to return array of data
      return new Promise((res) => {
        res(promise.map((dataObject) => dataObject.data.data.items[0]));
      });
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        throw new Error(
          `The request was cancelled as it timed out. Please make sure all urls are correct and endpoints are working. \n Error detail: ${err.message}`
        );
      }
      throw new Error(err);
    });
};

module.exports = requestMultipleUrls;
