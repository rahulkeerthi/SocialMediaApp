import React, { useEffect, Suspense } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = process.env.BACKENDURL || ""
console.log(process.env.BACKENDURL)
import { useImmerReducer } from "use-immer"
import { CSSTransition } from "react-transition-group"

// CREATED COMPONENTS
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeGuest from "./components/HomeGuest"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
const CreatePost = React.lazy(() => import("./components/CreatePost"))
const ViewSinglePost = React.lazy(() => import("./components/ViewSinglePost"))
const Search = React.lazy(() => import("./components/Search"))
const Chat = React.lazy(() => import("./components/Chat"))
import FlashMessages from "./components/FlashMessages"
import Profile from "./components/Profile"
import EditPost from "./components/EditPost"
import NotFound from "./components/NotFound"
import LoadingDotsIcon from "./components/LoadingDotsIcon"

// CONTEXT
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

function App() {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem("complexappToken")),
		isSearchOpen: false,
		isChatOpen: false,
		flashMessages: [],
		user: {
			token: localStorage.getItem("complexappToken"),
			username: localStorage.getItem("complexappUsername"),
			avatar: localStorage.getItem("complexappAvatar"),
		},
		unreadChatCount: 0,
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
			case "openSearch":
				draft.isSearchOpen = true
				return
			case "closeSearch":
				draft.isSearchOpen = false
				return
			case "toggleChat":
				draft.isChatOpen = !draft.isChatOpen
				return
			case "closeChat":
				draft.isChatOpen = false
				return
			case "incrementUnreadChatCount":
				draft.unreadChatCount++
				return
			case "clearUnreadChatCount":
				draft.unreadChatCount = 0
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

	useEffect(() => {
		if (state.loggedIn) {
			const ourRequest = Axios.CancelToken.source()
			async function checkToken() {
				try {
					const response = await Axios.post("/checkToken", { token: state.user.token }, { cancelToken: ourRequest.token })
					if (!response.data) {
						dispatch({ type: "logout" })
						dispatch({ type: "flashMessage", value: "Your session has expired. Please login again." })
					}
				} catch (e) {
					console.log(e.message)
				}
			}
			checkToken()
			return () => ourRequest.cancel()
		}
	}, [])

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<FlashMessages messages={state.flashMessages} />
					<Header />
					<Suspense fallback={<LoadingDotsIcon />}>
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
							<Route path='/post/:id' exact>
								<ViewSinglePost />
							</Route>
							<Route path='/post/:id/edit' exact>
								<EditPost />
							</Route>
							<Route path='/create-post'>
								<CreatePost />
							</Route>
							<Route path='/terms' exact>
								<Terms />
							</Route>
							<Route>
								<NotFound />
							</Route>
						</Switch>
					</Suspense>
					<CSSTransition timeout={330} in={state.isSearchOpen} classNames='search-overlay' unmountOnExit>
						<div className='search-overlay'>
							<Suspense fallback=''>
								<Search />
							</Suspense>
						</div>
					</CSSTransition>
					<Suspense fallback=''>{state.loggedIn && <Chat />}</Suspense>
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
