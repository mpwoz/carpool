# carpool

Application for linking student drivers with riders
and allowing them to carpool to and from Chicago 
with minimal hassle. 

REMOVE ME THIS IS A TEST


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

### Running Tests

#### Unit Tests

Run the `test.sh` script to run all server and client unit tests.

`./scripts/test.sh`

#### End-To-End Tests

Run the `e2e-test.sh` script to run all end-to-end tests.

`./scripts/e2e-test.sh`
