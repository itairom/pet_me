import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { PetDetails } from './pages/PetDetails'
import { Home } from './pages/Home'
<<<<<<< HEAD
=======
import { PetList } from './cmps/PetList'


>>>>>>> a7cae71230b720c6869b6d33552470308d4d94b9
import { Header } from './cmps/Header'
import { PetApp } from './pages/PetApp'


export function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <main>
          <Switch>
<<<<<<< HEAD
            <Route path="/details" component={ PetDetails } />
            <Route path="/" component={ Home } />
=======
            <Route component={PetList} path="/pet" />
            <Route path="/" component={PetApp} />
>>>>>>> a7cae71230b720c6869b6d33552470308d4d94b9
          </Switch>
        </main>
        <footer>
          Starter
        </footer>
      </Router>
    </div>
  )
}

