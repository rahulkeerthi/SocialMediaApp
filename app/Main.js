import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080"
import { useImmerReducer } from "use-immer"

// CREATED COMPONENTS
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeGuest from "./components/HomeGuest"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
import CreatePost from "./components/CreatePost"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/FlashMessages"
import Profile from "./components/Profile"

// CONTEXT
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

function App() {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem("complexappToken")),
		flashMessages: [],
		user: {
			token: localStorage.getItem("complexappToken"),
			username: localStorage.getItem("complexappUsername"),
			avatar: localStorage.getItem("complexappAvatar"),
		},
	}

	function OurReducer(draft, action) {
		switch (action.type) {
			case "login":
				draft.loggedIn = true
				draft.user = action.data
				return
			case "logout":
				draft.loggedIn = false
				return
			case "flashMessage":
				draft.flashMessages.push(action.value)
				return
		}
	}

	const [state, dispatch] = useImmerReducer(OurReducer, initialState)
	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem("complexappToken", state.user.token)
			localStorage.setItem("complexappUsername", state.user.username)
			localStorage.setItem("complexappAvatar", state.user.avatar)
		} else {
			localStorage.removeItem("complexappToken")
			localStorage.removeItem("complexappUsername")
			localStorage.removeItem("complexappAvatar")
		}
	}, [state.loggedIn])

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<FlashMessages messages={state.flashMessages} />
					<Header />
					<Switch>
						<Route path='/' exact>
							{state.loggedIn ? <Home /> : <HomeGuest />}
						</Route>
						<Route path='/about-us' exact>
							<About />
						</Route>
						<Route path='/profile/:username'>
							<Profile />
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
			</DispatchContext.Provider>
		</StateContext.Provider>
	)
}

ReactDOM.render(<App />, document.getElementById("app"))

if (module.hot) {
	module.hot.accept
}
