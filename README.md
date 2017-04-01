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
- [x] Switch to Ducks file structure.
- [ ] Update tests
- [ ] Refactor chars/words components/containers codes into one. Maybe use this: https://facebook.github.io/react/docs/higher-order-components.html
- [ ] Move logic definition out of containers.
- [ ] Explicit URLs like app/text/:id/edit
- [ ] Make better separation between containers and components.
- [ ] Move css into components and containers folders.
- [ ] Better use of selectors. See http://blog.sapegin.me/all/react-structure
- [ ] Adjust the css to fit all screens size.
- [ ] Test in different browsers.
- [ ] Loader on loading.
- [ ] Confirmation to leave if not saved
- [ ] Write tests for components.
- [ ] Write tests for async action creators.
- [ ] Highlight words/char in text when clicked.

## Next steps: Collaborator features
- [ ] Suggestion feature (2/2)
- [ ] Project model
- [ ] Guidelines model
- [ ] Offer page, where users can add projects to their list
- [ ] Edit text infos
- [ ] Add contact infos / copyrights
