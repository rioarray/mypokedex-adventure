// source: https://dev.to/ganeshmani/how-to-get-query-string-parameters-in-javascript-2019-4dm2

export const getQueryParamsFromUrl = (url) => {
  let queryParams = {};
  //create an anchor tag to use the property called search
  let anchor = document.createElement('a');
  //assigning url to href of anchor tag
  anchor.href = url;
  //search property returns the query string of url
  let queryStrings = anchor.search.substring(1);
  let params = queryStrings.split('&');

  for (var i = 0; i < params.length; i++) {
    var pair = params[i].split('=');
    queryParams[pair[0]] = decodeURIComponent(pair[1]);
  }
  return queryParams;
};

export default getQueryParamsFromUrl;
