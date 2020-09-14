import React from "react"
import ReactDOM from "react-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeGuest from "./components/HomeGuest"

function ExampleComponent() {
	return (
		<>
			<Header />
			<HomeGuest />
			<Footer />
		</>
	)
}

ReactDOM.render(<ExampleComponent />, document.getElementById("app"))

if (module.hot) {
	module.hot.accept
}
