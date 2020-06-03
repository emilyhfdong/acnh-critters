import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { FishPage } from "./pages/fish"
import { BugsPage } from "./pages/bugs"

export const PATH_NAMES = {
  fish: "/fish",
  bugs: "/bugs",
}

export const App: React.SFC<{}> = () => (
  <Router>
    <Switch>
      <Route path={PATH_NAMES.fish} component={FishPage} />
      <Route path={PATH_NAMES.bugs} component={BugsPage} />
      <Route path="/" component={FishPage} />
    </Switch>
  </Router>
)
