import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import JobsRoute from './components/JobsRoute'
import NotFound from './components/NotFound'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import JobDetailedView from './components/JobDetailedView'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobsRoute} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetailedView} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App
