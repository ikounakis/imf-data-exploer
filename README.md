# [IMF Data Explorer](https://ikounakis.github.io/imf-data-explorer/)
This is a simple UI for the graphical exploration of the data provided by the IMF [JSON RESTful Web Service](http://datahelp.imf.org/knowledgebase/articles/667681-using-json-restful-web-service).

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/77cac01c477ca812fba2)

Inspired by [IMF World Economic Outlook Explorer](https://github.com/raskoleinonen/raskoleinonen.github.io), a similar tool developed for the IMF World Economic Outlook report.

Aimed to supplement the official resources and tools provided by IMF from the links below
* http://data.imf.org
* http://www.imf.org/en/Data

The best place to start exploring the available data might be the
* [IMF DataMapper](http://www.imf.org/external/datamapper/datasets)
* [A Guide to IMF Data](http://www.imf.org/external/np/ds/matrix.htm)

Please come back to try the [IMF Data Explorer](https://ikounakis.github.io/imf-data-explorer/) after and feel free to send me your comments and suggestions by [email](mailto:johnrhogr@gmail.com).

## Access Limitations

* The code makes use of serveral ES6 features that are currently not supported by Internet Explorer (IE11) so please use another browser to access the UI.

* Because user pages from github.io are served over https but the IMF Web Service provides data over http, all browsers will complain about the use of [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) and will block the requests to IMF.
Most browsers however, will allow you to **tempararily disable** this security feature by clicking on a popup or shield/lock icon in their address bar.

* Because the IMF Web Service doesn't return the necessary [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) headers, all browsers will block the cross-origin requests from github.io to imf.org. Thankfully, there are addons for most browsers that will simulate the necessary headers so please the one for your browser from the list below

  * [Firefox](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/)
  * [Chrome](https://chrome.google.com/webstore/detail/cors-toggle/jioikioepegflmdnbocfhgmpmopmjkim?hl=en)
  * [Opera](https://addons.opera.com/en/extensions/details/cors-toggle/?display=en)

* Finally, the IMF Web Service imposes a certain limit to the number of requests it will server from the same origin, so please wait a few seconds if you reach that limit while using the UI.

  Thank you for your patience and understanding!