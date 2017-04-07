# Kewen-lab-client
The application is built with react and redux.  
It is based on the [create-react-app](https://github.com/facebookincubator/create-react-app).

## Development
```
$ cd react-ui/
$ npm install
$ npm start
// Need to run kewen-lab-server
```

### Debug mode
Activate debug mode by setting REACT_APP_DEBUG env var to true. This disable autosave and display save buttons.

### Tests
create-react-app offers a test command in watch mode:
```
$ npm test
```

## Deployment
The app is deployed to Heroku with a Node server as described [here](https://github.com/mars/heroku-cra-node).  
ESLint config comes from https://github.com/rangle/react-redux-example/blob/master/.eslintrc

```
$ heroku create kewen-lab --remote production
// Set environment variables on Heroku (IMPORTANT: need to be done before building)
$ git push production master // This will run the build
```

## Environment variables
See .env.example file.

Note: In order for Environment variables to be updated in the code after a change,
the app needs to be rebuilt. This can be done by pushing an empty commit like so:

```
git commit --allow-empty -m "empty commit"
git push heroku master
```

## Environments
- development - http://localhost:3000
- staging - https://limitless-fortress-75797.herokuapp.com
- production - https://kewen-lab.herokuapp.com
