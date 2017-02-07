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
- [ ] Manually added/deleted chars/words should not be modified by save buttons.
- [ ] Display words and chars in the right order.
- [ ] Auto-save after change.
- [ ] Better handle async calls (display loaders).
- [ ] Write tests for components and async action creators.
- [ ] Serve the app with different strategy to handle refresh. See [option 1](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment) and [option 2](https://github.com/mars/heroku-cra-node).
- [ ] Adjust the css to fit all screens size.
- [ ] Test in different browsers.
- [x] Remove redux devTools from production build.
- [ ] Refactor chars and words code into a single items code.
- [ ] Highlight words/char in text when clicked.
