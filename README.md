# Kewen-lab-client
The application is built with react and redux.  
It is based on the [create-react-app](https://github.com/facebookincubator/create-react-app) repository (after $ npm run eject).

## Development
```
$ npm install
$ npm start
// Need to run kewen-lab-server
```

## Deployment
The app is deployed to Heroku using this [buildpack](https://github.com/mars/create-react-app-buildpack).  
Note: The current buildpack serves the app with Nginx server. It does not catch all URLs and refresh on browsers results in a 404 error.  
ESLint config comes from https://github.com/rangle/react-redux-example/blob/master/.eslintrc

```
$ heroku create kewen-lab -b https://github.com/mars/create-react-app-buildpack.git --remote production
// Set environment variables on Heroku (need to be done before building)
$ git push production master // This will run the build
```

## Environment variables
- NODE_ENV=
- REACT_APP_API_URL=
- REACT_APP_ADMIN_URL=

## Environments
- development - http://localhost:3000
- staging - https://obscure-lake-53261.herokuapp.com
- production - https://kewen-lab.herokuapp.com

## TODO
- [x] Add favicon.
- [x] Use Immutable.JS in all reducers.
- [x] Use plain key names instead of "payload" in actions.
- [x] Write tests for utils and reducers.
- [x] Hide notifications after X seconds.
- [x] Manually added/deleted chars/words feature.
- [x] Refactor chars/words actions/reducer codes into one.
- [x] Save words and chars in the right order.
- [x] Display words and chars in the right order.
- [x] Auto-save after change.
- [ ] Serve the app with different strategy to handle refresh. See [here](https://github.com/mars/create-react-app-buildpack#routing-clean-urls) OR [this](https://github.com/mars/heroku-cra-node)
- [ ] NotSaved / saving / saved states
- [ ] Confirmation to leave if note saved
- [ ] Refactor chars/words components/containers codes into one. Maybe use this: https://facebook.github.io/react/docs/higher-order-components.html
- [ ] Better handle async calls (display loaders).
- [ ] Write tests for components.
- [ ] Write tests for async action creators.
- [ ] Adjust the css to fit all screens size.
- [ ] Test in different browsers.
- [x] Remove redux devTools from production build.
- [ ] Highlight words/char in text when clicked.
