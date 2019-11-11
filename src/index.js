import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.css"
import * as serviceWorker from './serviceWorker'
import ScrollHandler from './components/ScrollHandler'
import App from './App'

var sandbox = ''

const RoutedApp = () => (
    <Router>
      <Route path='/sandbox' component={Sandbox} />
      <Route path='/' component={MainApp}
      />
    </Router>
  );

function Sandbox() {
  sandbox = true
  return null
}

function MainApp() {
  return (
    <ScrollHandler>
      <App sandbox = {sandbox}/>
    </ScrollHandler>
  )
}

render(<RoutedApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
