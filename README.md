This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## admin-portable

This is a generic admin tool/portal/dashboard framework built with React.

Main components (aside from React and ReactDOM):
* flexlayout-react - provides a generic panel/tab management framework in the browser
* rc-tree - a tree component used for menus and any general tree requirements
* react-jsonschema-forms - for form definition and rendering
* json-server - for mocking up test data
* shortid - for generating unique id values for the UI
* bootstrap@3 - just for styling
* react-table - for displaying tabular data
* superagent - for HTTP calls

## Installation
* clone the repo
* open a terminal window
* cd into the cloned repo local directory
* run: npm install
* run: npm start
* open a 2nd terminal window
* ensure you are in the local cloned directory
* run: npm install json-server -g
* run: json-server db.json --port <portnumber> (suggest something like 3090 - this will provide a localhost:3090/ REST API into the db.json data)

Then develop.
