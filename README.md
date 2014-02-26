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



## Development

###Code Reviews
- Use personal branches (ie. __do not__ develop in the `master` branch)
- When you're ready to promote your code, create a [Pull Request](https://help.github.com/articles/using-pull-requests).
    - If possible, reference your Task and User Story from Trello.
- Code review comments are recorded in github
- Code reviewer sign-off must be recorded as a comment on the pull request

###Git Workflow
Here is a sample workflow of how to work on a new Task.
For the purposes of this outline, assume I am working on a task called "Build project skeleton".
The feature branch I am working on is called `proj-skeleton`.

1. Create a new feature branch for the task from the most up-to-date `master` branch (assumes your current branch is `master`)

    ```
    git pull origin master
    git checkout -b proj-skeleton
    ```

2. Complete the work for the task (including unit tests)
3. Push task branch to github so that you can create a pull request

    ```
    git push origin proj-skeleton
    ```

4. Create a pull request at https://github.com/mpwoz/carpool (you should see a button to open a pull request at the top)
5. Your code now needs to be reviewed by Martin or Rishi. Make any changes suggested by the reviewer and repeat steps 2 through 3
    - Comment on your pull request if new commits are made so anybody involved is notified of changes
6. Once your code is signed off on, Martin or Rishi will merge your user branch into `master`. Be sure to checkout `master` once your work is done before starting a new task.

    ```
    git checkout master
    ```
