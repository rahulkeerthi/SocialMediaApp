import React, { useState, useEffect } from "react"
import Page from "./Page"
import { useParams, Link } from "react-router-dom"
import Axios from "axios"
import LoadingDotsIcon from "./LoadingDotsIcon"
import ReactMarkdown from "react-markdown"

function ViewSinglePost() {
	const { id } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const [post, setPost] = useState()

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source()
		async function fetchPost() {
			try {
				const response = await Axios.get(`/post/${id}`, { cancelToken: ourRequest.token })
				setPost(response.data)
				setIsLoading(false)
			} catch (e) {
				console.log("Issue!")
			}
		}
		fetchPost()
		return () => {
			ourRequest.cancel()
		}
	}, [])

	if (isLoading)
		return (
			<Page title='...'>
				<LoadingDotsIcon />
			</Page>
		)

	const date = new Date(post.createdDate)
	const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

	return (
		<Page title={post.title}>
			<div className='d-flex justify-content-between'>
				<h2>{post.title}</h2>
				<span className='pt-2'>
					<Link to='/' className='text-primary mr-2' title='Edit'>
						<i className='fas fa-edit'></i>
					</Link>
					<Link to='/' className='delete-post-button text-danger' title='Delete'>
						<i className='fas fa-trash'></i>
					</Link>
				</span>
			</div>

			<p className='text-muted small mb-4'>
				<Link to={`/profile/${post.author.username}`}>
					<img className='avatar-tiny' src={post.author.avatar} />
				</Link>
				Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
			</p>

			<div className='body-content'>
				<ReactMarkdown source={post.body} allowedTypes={["paragraph", "break", "strong", "emphasis", "heading", "text", "list", "listItem"]} />
			</div>
		</Page>
	)
}

export default ViewSinglePost
