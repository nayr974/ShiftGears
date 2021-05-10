# ShiftGears

To give ShiftGears an extra gear or two, first clone this repository and install the following dependencies plus recommended tools:

Dependencies:
* Node.js 14+

Recommended Tools:
* Visual Studio Code, as a general development environment

Run `npm install` in the /shift-gears folder to install node module dependencies.

## Core Technologies

### React

[React](https://reactjs.org/) allows the building of complex user interfaces using declartive, functional components.

### Redux

[Redux](https://redux.js.org/) provides state management. It uses messages, called actions, which are handled by reducers that update the central state, called a store. Then, selectors allow components to connect to changes in this state.

### Redux Toolkit

[Redux Tookit](https://redux-toolkit.js.org/) is used to simplify it's Redux implimentation and generally improve the developer experience. It provides helpers and patterns to minimize boilerplate code, and simplify interaction with the Redux store.

### Ant Design Component Library

This project uses the [Ant Design of React](https://ant.design/docs/react/introduce) component library for base components.

## Project structure

* /public - index.html and other static content
* /src - Entry point App component; global styles
	* /app - Redux store, reducers, prop-types, and other shared application files
	* /components - Application components
	
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

