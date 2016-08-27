import React from 'react'
import AppContainer from './pages/application'
import Home from './pages/home'
import Browse from './pages/browse'
import Trends from './pages/trends'

import Landing from './pages/landing'
import NotFound from './pages/404'
import { Route, IndexRoute } from 'react-router'

import TrackContainer from './pages/track/track_container'
import Track from './pages/track'
import TrackNew from './pages/track/new'
import TrackEdit from './pages/track/edit'

import SignIn from './pages/auth/signin'
import SignUp from './pages/auth/signup'

export default (
  <Route path='/' component={AppContainer}>
    { /* Home (main) route */ }
    <IndexRoute component={Landing} />

    { /* Routes */ }
    <Route path='home' component={Home} />
    <Route path='browse' component={Browse} />
    <Route path='trends' component={Trends} />

    <Route path='/track' component={TrackContainer}>
      <Route path='new' component={TrackNew} />
      <Route path=':id' component={Track} />
      <Route path='edit/:id' component={TrackEdit} />
    </Route>

    <Route path='/auth/signin' component={SignIn} />
    <Route path='/auth/signup' component={SignIn} />

    { /* Catch all route */ }
    <Route path='*' component={NotFound} status={404} />
  </Route>
)
