import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { PetDetails } from './pages/PetDetails'
import { Home } from './pages/Home'
import { Header } from './cmps/Header'


export function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/details" component={ PetDetails } />
            <Route path="/" component={ Home } />
          </Switch>
        </main>
        <footer>
          Starter
        </footer>
      </Router>
    </div>
  )
}

