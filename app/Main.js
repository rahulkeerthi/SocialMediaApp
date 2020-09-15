import React, { useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080"

import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeGuest from "./components/HomeGuest"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
import CreatePost from "./components/CreatePost"
import ViewSinglePost from "./components/ViewSinglePost"

function App() {
	const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))

	return (
		<BrowserRouter>
			<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<Switch>
				<Route path='/' exact>
					{loggedIn ? <Home /> : <HomeGuest />}
				</Route>
				<Route path='/about-us' exact>
					<About />
				</Route>
				<Route path='/post/:id'>
					<ViewSinglePost />
				</Route>
				<Route path='/create-post'>
					<CreatePost />
				</Route>
				<Route path='/terms' exact>
					<Terms />
				</Route>
			</Switch>
			<Footer />
		</BrowserRouter>
	)
}

ReactDOM.render(<App />, document.getElementById("app"))

if (module.hot) {
	module.hot.accept
}
