# carpool

Application for linking student drivers with riders
and allowing them to carpool to and from Chicago 
with minimal hassle. 


## Architecture

There are two parts:
* A REST API server
    - Node.js
* A responsive front-end
    - AngularJS
    - Twitter Bootstrap


## Documentation


### Installation

1. Install [node.js](http://nodejs.org/)
2. `npm install` to install all dependencies

### Running Locally

1. `./scripts/start-server.sh`
2. Open browser to [http://localhost:8000](http://localhost:8000)

### Deploying to Heroku

Set up [https://devcenter.heroku.com/articles/quickstart](Heroku)

Add the git remote so you can push to heroku 

`git remote add heroku git@heroku.com:cps-carpool.git`

Then, commit all your changes and run 

`git push heroku master`

To view the site, visit [http://cps-carpool.herokuapp.com](http://cps-carpool.herokuapp.com)

### Running Tests

#### Unit Tests

Run the `test.sh` script to run all server and client unit tests.

`./scripts/test.sh`

#### End-To-End Tests

Run the `e2e-test.sh` script to run all end-to-end tests.

`./scripts/e2e-test.sh`
