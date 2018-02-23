# Single Page Web App
Do you have a Last.fm account and do you wanna know your weekly, monthly of your overall top 10? In this repo you can find the application I made from scratch. The application is based on the api of Last.fm. You can check it out on:

[http://suuscharlotte.nl/MAPPEN/wafs/#home](http://suuscharlotte.nl/MAPPEN/wafs/#home)

![alt text](https://github.com/s44s/wafs/blob/week2/app/static/img/screen3.png "Screen")


##

## How does it work?
The app is build with the api of Last.fm. If you want to contribute on this project, please change the properties below. The username and api_key needs to change. You also have the option to change the method, the format and the limit. The period change is build in the Front-end of the application already.

````
var search =  {
 method:'user.gettoptracks',
 user: username,
 api_key: config.api_key,
 format: 'json',
 limit: '10',
 period: period
}
````

Libraries that are used in this application:
- [routie.js](http://projects.jga.me/routie/) for the hashchange routing
- [transparency.js](https://github.com/leonidas/transparency) as a template engine

Furthermore, keep in mind the following limitations. Read more about it on [API Terms of Service](https://www.last.fm/api/tos)

> You will implement suitable caching in accordance with the HTTP headers sent with web service responses. You will not make more than 5 requests per originating IP address per second, averaged over a 5 minute period, without prior written consent. You agree to cache similar artist and any chart data (top tracks, top artists, top albums) for a minimum of one week.

## Features
In this application you have the possibility to find your (personal) top 10 from a period you have chosen. You can find out some more details about that specific album and about the tags people have given.

## Coming soon..
Because there are still so many things to add on this application, I'm still working on it. For the future, this application will contain:
- A local storage option for each song that have been searched for
- The option to change the top 10 for example to a top 100
- More information about the artist (I have been looking at a second API to find more information, check [here](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2)
- Rewrite the code to ES6

## Actor Diagram and Interaction diagram
To give you an overview of my application, I made two diagrams, the Actor Diagram and the Interaction diagram.

![alt text](https://github.com/s44s/wafs/blob/week2/app/static/img/actordiagram_final.jpg "Actor Diagram")

![alt text](https://github.com/s44s/wafs/blob/week2/app/static/img/interactiondiagram.jpg "Interaction Diagram")


##

## Advantages and disadvantages of JavaScript libraries/frameworks
In this course we are going to develop a singe page web app with native JavaScript. So no use of jQuery, React or other libraries and/or frameworks. Learn the actual underlying technologies, before learning abstractions. I have listed some pros and cons of using JavaScript libraries;

#### Pros
* Frameworks can provide you with a stable code base and a good set of features to begin with (but now we are going to learn those base in native JavaScript). [1]
* When your project needs to be accomplished quickly, a framework will be faster to set things up. [1]
* Most of the frameworks have a established community you can count on.  [1]
* There are some libraries that are offering something different, like D3.JS (a JavaScript library for visualizing data). [2]

#### Cons
* The number of libraries and frameworks available can be overwhelming. Vanilla JavaScript is making it much easier to choose. Plus, you only have to learn JavaScript instead of new basic principles of other libraries/frameworks.
* If your projects is a lightweight entity, you might just not even use the majority of the features and functions provided by the framework in question. Vanilla JavaScript is generally lightweight and quicker to operate as compared to frameworks.[1]
* You are independent of the updates and actions of the using framework.
* It doesn't mean that other colleagues are working with the same library/framework. For example, when you find a different company to work for it is possible that they using a different library than you are used to. You have to dive into another library again.
* Frameworks need to work for masses. Almost every product has something unique about it. And eventually there will at least be one such case that doesn't fit into the approach suggested by the framework. [3]

***

## Advantages and disadvantages of client-side single page web apps
A single-page application is a web application that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server.[4] This means that our website will run client side, the web browser of the user. The script runs on your computer after you've loaded a webpage. Below some pros and cons about this way of building an application. SPAs are all about serving an outstanding UX by trying to imitate a “natural” environment in the browser – no page reloads, no extra waiting time. It is just one web page that you visit which then loads all other content using JavaScript – which they heavily depend on.[8]

#### Pros
* Only the elements that were changed will be reloaded. This is good for the server, not too many things are loaded. The document is already at the client side.
* Clear line between Front-end and Back-end. [5]
* Easy to test and work on, no server needed. You can work on it locally.

#### Cons
* Your user needs to enable JavaScript in their browser.
* Careful thought must be put into search engine optimization (SEO) so your content can be discoverable by search engines and social media websites that provide a link preview.[7]
* The browser does most of the heavy lifting, which means performance can be a problem — especially on less capable mobile devices.[7]

***

## Best practices
* Don't use global variables/objects
* Declare variables at top of scope
* Use short clear meaningful names (English)
* Work in strict mode
* camelCase your code if(code != Constructor || CONSTANTS)
* Place external scripts at the bottom of the page
* Indent your code
* Commit often & push once
* Build first, optimize later

***

## Resources
[1 - JavaScript Frameworks: To Use or Not To Use?](https://www.noupe.com/development/javascript-frameworks-94897.html)

[2 - 10 JAVASCRIPT LIBRARIES AND FRAMEWORKS YOU SHOULD KNOW ABOUT](https://learntocodewith.me/posts/javascript-libraries-frameworks/)

[3 - What are the pros and cons of JavaScript frameworks?](https://www.quora.com/What-are-the-pros-and-cons-of-JavaScript-frameworks)

[4 - Single-page application](https://en.wikipedia.org/wiki/Single-page_application)

[5 - Single Page Applications](https://www.oberon.nl/whitepapers/single-page-applications)

[6 - Single-Page vs. Multi-page UI Design: Pros & Cons](https://www.uxpin.com/studio/blog/single-page-vs-multi-page-ui-design-pros-cons/)

[7 - Single page Applications ](https://www.codeschool.com/beginners-guide-to-web-development/single-page-applications)

[8 - Single-page application vs. multiple-page application](https://neoteric.eu/single-page-application-vs-multiple-page-application)

[9 - Object Oriented Javascript for beginners](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS)

***

by [suus](https://github.com/s44s)
