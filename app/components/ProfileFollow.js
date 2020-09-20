import React, { useState, useEffect } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"

function ProfileFollow(props) {
	const { username } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const [follows, setFollows] = useState([])

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source()
		async function fetchFollows() {
			try {
				const response = await Axios.get(`/profile/${username}/${props.action}`, { cancelToken: ourRequest.token })
				setFollows(response.data)
				setIsLoading(false)
			} catch (e) {
				console.log("Issue!")
			}
		}
		fetchFollows()
		return () => {
			ourRequest.cancel()
		}
	}, [username, props.action])

	if (isLoading) return <LoadingDotsIcon />
	if (!isLoading && follows.length == 0) {
		return (
			<div className='list-group text-center h3'>
				<p>No {props.action} yet!</p>
			</div>
		)
	}
	return (
		<div className='list-group'>
			{follows &&
				follows.map((follow, index) => {
					return (
						<Link key={index} to={`/profile/${follow.username}`} className='list-group-item list-group-item-action'>
							<img className='avatar-tiny' src={follow.avatar} /> {follow.username}
						</Link>
					)
				})}
		</div>
	)
}

export default ProfileFollow
