import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeGuest from "./components/HomeGuest"
import About from "./components/About"
import Terms from "./components/Terms"

function ExampleComponent() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path='/' exact>
					<HomeGuest />
				</Route>
				<Route path='/about-us' exact>
					<About />
				</Route>
				<Route path='/terms' exact>
					<Terms />
				</Route>
			</Switch>
			<Footer />
		</BrowserRouter>
	)
}

ReactDOM.render(<ExampleComponent />, document.getElementById("app"))

if (module.hot) {
	module.hot.accept
}
