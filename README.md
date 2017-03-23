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


## Deployment
The app is deployed to Heroku with a Node server as described [here](https://github.com/mars/heroku-cra-node).  
ESLint config comes from https://github.com/rangle/react-redux-example/blob/master/.eslintrc

```
$ heroku create kewen-lab --remote production
// Set environment variables on Heroku (IMPORTANT: need to be done before building)
$ git push production master // This will run the build
```

## Environment variables
- NODE_ENV=
- REACT_APP_API_URL=
- REACT_APP_ADMIN_URL=
- REACT_APP_DEBUG= (on/off)

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
- [x] Serve the app with different strategy to handle refresh.
- [x] Debug mode.
- [x] Back to create-react-app with no config.
- [x] Correct handling of environment vars.
- [x] isSaving states for items with loaders displayed.
- [x] Loaders for Sidebar.
- [x] Better organize screens.
- [x] Switching modes should not be handled in router (to avoid rerender sidebar)
- [ ] Create separate modules for pages.
- [ ] Adjust the css to fit all screens size.
- [ ] Test in different browsers.
- [ ] Move logic out of containers, back in actions. See: https://github.com/reactjs/redux/issues/291
- [ ] Loaders for contents.
- [ ] Global Saved selector with icon displayed.
- [ ] Confirmation to leave if not saved
- [ ] Refactor chars/words components/containers codes into one. Maybe use this: https://facebook.github.io/react/docs/higher-order-components.html
- [ ] Write tests for components.
- [ ] Write tests for async action creators.
- [x] Remove redux devTools from production build.
- [ ] Highlight words/char in text when clicked.
