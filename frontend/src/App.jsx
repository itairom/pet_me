import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { PetDetails } from './pages/PetDetails'
import { Header } from './cmps/Header'
import { Footer } from './cmps/Footer'
import { PetApp } from './pages/PetApp'
import { Profile } from './pages/Profile'
import { Explore } from './pages/Explore'
import { LoginSignup } from './pages/LoginSignup'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Link } from 'react-router-dom'


export function App() {
  return (
    <div className="app flex column">
      <Router>
        <Link to='/profile' >
          <ReactNotification />
        </Link>
        <Header />
        <main className="main-layout">
          <Switch>
            <Route path="/explore" component={ Explore } />
            <Route path="/profile" component={ Profile } />
            <Route path="/login" component={ LoginSignup } />
            <Route path="/:petId" component={ PetDetails } />
            <Route path="/" component={ PetApp } />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

