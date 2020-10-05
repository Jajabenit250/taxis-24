# Taxi24
[![Build Status](https://travis-ci.com/Jajabenit250/taxis-24.svg?branch=main)](https://travis-ci.com/Jajabenit250/taxis-24)
[![Coverage Status](https://coveralls.io/repos/github/Jajabenit250/taxis-24/badge.svg?branch=main)](https://coveralls.io/github/Jajabenit250/taxis-24?branch=main)
## Description
Taxi24 is a new startup based in Kigali. They would like to disrupt the taxi industry in Rwanda by providing a white-label solution to the
existing taxi companies and hotels. Practically, they will build a set of APIs that other companies can use to manage their fleet of drivers and
allocate drivers to passengers. They would like your help building these APIs
## Technologies
- Environment : [Nodejs](https://nodejs.org/)
- Package Manager : [NPM](https://www.npmjs.com)
- Compiler : [Babel](https://babeljs.io/)
- Testing : [Mocha and Chai](https://mochajs.org/)
- Object-relational mapping (ORM) : [Sequelize](https://sequelize.org/)
- Database : [PostgreSQL](https://www.postgresql.org/)
## Requirements and Installation steps
### You need the following to be able to run the application
[Node](https://nodejs.org/en/download/) a runtime environment for JavaScript
[Postman](https://www.getpostman.com/downloads/) to test the Api endpoints
[Visual studio code](https://code.visualstudio.com/download) for editing and running the app
[PostgreSQL](https://www.postgresql.org/download/) for Database
## Installation
#### A. Clone the project
1. From your computer, open terminal 
2. Run `git clone https://github.com/Jajabenit250/taxis-24.git` to clone the repository.
3. cd `CD taxis-24`
`
#### B. Setting up the environment
1. Create a file and name it `.env` in root directory
2. Find a file named `.env.example`
3. use `.env.example` as a blueprint for your `.env`
4. Provide values to all environmental variables in `.env` file.
## Run commands
Open terminal from your computer
1. Run `npm install` to install all dependencies.
2. Run `CREATE DATABASE databasename;` to create your database.
3. Run `npm run migrate` to create your database tables and insert seeds.
5. Run `npm start` to start the app in development environment. 
## API endpoints
`- GET /drivers - Get a list of all drivers`

`- GET /drivers/:available - Get a list of all available drivers`

`- GET /drivers/closeto/:locationId - Get a list of all available drivers within 3km for a specific location`

`- GET /drivers/:driverId  - Get a specific driver by ID`

`- POST /trips - Create a new ‘Trip’ request by assigning a driver to a rider`

`- PUT /trips/:tripId/:action  - Complete a trip`

`- GET /trips/:active  Get a list of all active Trips`

`- GET /riders  - Get a list of all riders`

`- GET /riders/:ridersId  - Get a specific rider by ID`

`- GET /riders/closest/:driverId - For a specific driver, get a list of the 3 closest drivers`

## Heroku Link and Postman Collection

https://taxi-24.herokuapp.com/

# Author
 [Havugimana Benit](https://github.com/Jajabenit250)