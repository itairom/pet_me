import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { PetDetails } from './pages/PetDetails'
import { Home } from './pages/Home'
import { PetList } from './cmps/PetList'


import { Header } from './cmps/Header'
import { PetApp } from './pages/PetApp'


export function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <main>
          <Switch>
            <Route component={PetList} path="/pet" />
            <Route path="/" component={PetApp} />
          </Switch>
        </main>
        <footer>
          Starter
        </footer>
      </Router>
    </div>
  )
}

