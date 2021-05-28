import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { PetDetails } from './pages/PetDetails'
import { Header } from './cmps/Header'
import { PetApp } from './pages/PetApp'
import { Explore } from './pages/Explore'


export function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/explore" component={Explore} />
            {/* <Route path="/login" component={LoginSignup} /> */}
            <Route path="/:petId" component={PetDetails} />
            <Route path="/" component={PetApp} />
          </Switch>
        </main>
        <footer>
        </footer>
      </Router>
    </div>
  )
}

