![logo](https://raw.githubusercontent.com/jjron/anyharvest/9a2a2203dfb170c50d1410d066f95cafb7fa7369/assets/logo_assets/anyharvest.png)

[![Coverage Status](https://coveralls.io/repos/github/jjron/anyharvest/badge.svg?branch=master)](https://coveralls.io/github/jjron/anyharvest?branch=master) [![Build Status](https://travis-ci.org/jjron/anyharvest.svg?branch=master)](https://travis-ci.org/jjron/anyharvest)

## Description
A REST API for where users can make **POST**, **GET**, **PUT**, and **DELETE** requests to `/api/*` This lab we use **MongoDB** with **Mongoose.js**.

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
