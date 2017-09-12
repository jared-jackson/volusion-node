# Volusion Interview

![alt text](https://assets.themuse.com/uploaded/companies/919/small_logo.png?v=169d34b9a5db6efad45665f325d849eba2950728cb7f925e90eeee8c067f0c7f)

## Technologies used

- [Node.js](https://aws.amazon.com/lambda/)
- [Angular.js](https://aws.amazon.com/api-gateway/)
- [Express.js](https://expressjs.com/)
- [AWS EC2](https://claudiajs.com/)
- [AWS S3](https://www.ibm.com/watson/)
- [Supertest](https://www.npmjs.com/package/supertest)

# Access the dashboard utilizing this tech here : http://34.232.141.25:3000/

## Overview

The idea of this application was to get a level of emotion behind Volusion blog posts using the power of IBM Watson's
natural language understanding. When a user submits a Volusion blog post url, the url is send as a request parameter to
our Lambda function that then uses a framework called 'cheerio' that parses the html and returns plain text. We then feed
the plain text article into IBM Watson to analyze. Watson then returns us with 5 different levels of emotion, those being sadness,
joy, fear, disgust, and anger. We then take the JSON values returned to us from Watson, and assemble them into front end radial graphs
with a percentage value of the level of emotion detected. This code serves as the Node.js server that hosts the dashboard containing the
user interface / front end code for submitting Volusion blog posts to our Lambda function.

If for some reason there are issues with opening the dashboard, please get a hold of the recruiter who sent you the project.

