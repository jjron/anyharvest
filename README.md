![logo](https://raw.githubusercontent.com/jjron/anyharvest/9a2a2203dfb170c50d1410d066f95cafb7fa7369/assets/logo_assets/anyharvest.png)

[![Coverage Status](https://coveralls.io/repos/github/jjron/anyharvest/badge.svg?branch=master)](https://coveralls.io/github/jjron/anyharvest?branch=master) [![Build Status](https://travis-ci.org/jjron/anyharvest.svg?branch=master)](https://travis-ci.org/jjron/anyharvest


### Team
[Jaren Escueta](https://github.com/jjron) |
[Thomas Martinez](https://github.com/thomasxmartinez) |
[David Porter](https://github.com/thegrimheep) |
[Geno Guerrero](https://github.com/gnoevil)

## Description
anyHarvest is a web based application that provides a listing and sales platform for the agricultural community to sell directly to the local consumer. A new user can sign up for an account and create a profile, make or update listings associated with their profile, and upload or delete their own listings. Users can also retrieve the account, listings, and make a transaction. Express routes the client requests and responses to and from the server at any given endpoint. Models for user, account, post, and photo are made through mongoose and stored in respective MongoDB collections. Uploaded photos are stored using AWS S3 service. Angular and SCSS were used in conjunction to add functionality to our user interface adding their data to our existing RESTful API.

## App directory
- db directory (for MongoDB to create collection and documents)
- lib directory (empty)
- model directory (user.js, profile.js)
- node_modules (Once you npm install this will be created)
- routes (profile-router.js , auth-router.js) - this is for operations of CRUD)
- test (mock-env.js - for mock environment variables, auth-router-test.js, profile-router-test.js - Mocha and Chai are used to test and expect results using our applications resources)
- **server.js** -- starts the server and creates an instance of a router for the superheroes API

# Usage
## In your terminal
- After cloning directory run `npm install` to install all the required dependancies.
```
npm install
```
- Create a `.env` in the root directory this will have you environment variables.
```
PORT=3000
MONGODB_URI=mongodb://localhost/dev
```
- To start the mongo server dedicate one of terminal window to this and type.

  **NOTE: You must be in the root directory of this application to start this server correctly.**
```
mongod --dbpath ./db
```
- In the second terminal tab or window, type
```
npm start
```
- nodemon will serve up port you have identified in your `.env` file.

### To Create a User

### To Create a Listing

### To Create a Profile

### Profile
- **userName**
  - *String*
  - input, required, unique
- **email**
  - *String*
  - input, required, unique
- **zipCode**
  - *String*
  - input, required
- **userID**
  - self-generated, unique

### Listing
- **product**
  - *String*
  - input, required
- **description**
  - input, required
- **price**
  - input, required
- **zipCode**
  - input, required
- **userID**
  - added by signup model, required

### Stripe
- **card number**
  - *String*
  - input, required
- **exp_month**
  - *String*
  - input, required
- **exp_year**
  - *String*
  - input, required
- **cvc**
  - *String*
  - input, required

## Routes
### User Routes
###### Signup
- `POST /api/signup`
  - Create a user
  - `200 OK`
  - `400 Bad Request`
  - `404 Not Found`
  - `409 Conflict`

###### Login
- `GET /api/login`
  - Requires basic auth via username:password
  - Provides JSON web token for requests requiring authorization
  - `200 OK`
  - `401 Unauthorized`

### Routes
###### Create a profile
- `POST /api/profiles`
  - Requires authorization

###### Retrieve account
- `GET /api/profiles/:id`
  - profileID parameter

###### Retrieve the user's own listings
- `GET /api/profiles/me/mylistings`
  - Requires authorization

###### Retrieve listings of all users
- `GET /api/listings`

###### Create a listing
- `POST /api/profile/:profileID/listings`
  - Requires authorization

###### Retrieve a listing
- `GET /api/listings/me/mylistings/:id`
  - listingID parameter

###### Update one of the user's existing listings
- `PUT /api/listings/me/mylistings/:id`
  - listingID parameter
  - Requires authorization

## Middleware
- **basic-auth-middleware**
  - implements the user login feature
- **bearer-auth-middleware**
  - implements the token authentication for POST, GET, and DELETE routes
- **jsonParser**
  - parses JSON
- **error middleware**
  - handles errors

## Issues
The anyHarvest development team may be reached via the Issues tab for this repo on GitHub.
