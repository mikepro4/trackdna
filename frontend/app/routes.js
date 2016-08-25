import React from 'react'
import AppContainer from './pages/application'
import Home from './pages/home'
import Browse from './pages/browse'
import Trends from './pages/trends'
import Track from './pages/track'
import Landing from './pages/landing'
import NotFound from './pages/404'
import { Route, IndexRoute } from 'react-router'

export default (
  <Route path='/' component={AppContainer}>
    { /* Home (main) route */ }
    <IndexRoute component={Landing} />

    { /* Routes */ }
    <Route path='home' component={Home} />
    <Route path='browse' component={Browse} />
    <Route path='trends' component={Trends} />
    <Route path='track:id' component={Track} />

    { /* Catch all route */ }
    <Route path='*' component={NotFound} status={404} />
  </Route>
)
