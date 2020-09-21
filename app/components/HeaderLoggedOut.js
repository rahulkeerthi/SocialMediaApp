import React, { useState, useContext, useEffect } from "react"
import Axios from "axios"
import DispatchContext from "../DispatchContext"

function HeaderLoggedOut() {
	const [username, setUsername] = useState()
	const [usernameInvalid, setUsernameInvalid] = useState(false)
	const [password, setPassword] = useState()
	const [passwordInvalid, setPasswordInvalid] = useState(false)
	const appDispatch = useContext(DispatchContext)

	useEffect(() => {
		if (username) {
			setUsernameInvalid(false)
		}
		if (password) {
			setPasswordInvalid(false)
		}
	}, [username, password])

	async function handleSubmit(e) {
		e.preventDefault()
		if (!username || !password) {
			setUsernameInvalid(!username)
			setPasswordInvalid(!password)
			appDispatch({ type: "flashMessage", value: "You must enter a username and password to log in", colour: "red" })
			return
		}
		try {
			const response = await Axios.post("/login", { username, password })
			if (response.data) {
				appDispatch({ type: "login", data: response.data })
				appDispatch({ type: "flashMessage", value: "You have successfully logged in" })
			} else {
				console.log("Invalid username or password")
				appDispatch({ type: "flashMessage", value: "Invalid username or password", colour: "red" })
			}
		} catch (e) {
			console.log("There was an error")
		}
	}

	return (
		<form onSubmit={handleSubmit} className='mb-0 pt-2 pt-md-0'>
			<div className='row align-items-center'>
				<div className='col-md mr-0 pr-md-0 mb-3 mb-md-0'>
					<input onChange={e => setUsername(e.target.value)} name='username' className={"form-control form-control-sm input-dark " + (usernameInvalid ? "is-invalid" : "")} type='text' placeholder='Username' autoComplete='off' />
				</div>
				<div className='col-md mr-0 pr-md-0 mb-3 mb-md-0'>
					<input onChange={e => setPassword(e.target.value)} name='password' className={"form-control form-control-sm input-dark " + (passwordInvalid ? "is-invalid" : "")} type='password' placeholder='Password' />
				</div>
				<div className='col-md-auto'>
					<button className='btn btn-success btn-sm'>Sign In</button>
				</div>
			</div>
		</form>
	)
}

export default HeaderLoggedOut
