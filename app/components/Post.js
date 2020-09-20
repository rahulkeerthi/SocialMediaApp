import React from "react"
import { Link } from "react-router-dom"

function Post({ post: { createdDate, _id, author, title }, onClick, noAuthor }) {
	const date = new Date(createdDate)
	const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
	return (
		<Link onClick={onClick} to={`/post/${_id}`} className='list-group-item list-group-item-action'>
			<img className='avatar-tiny' src={author.avatar} /> <strong>{title}</strong>
			<span className='text-muted small'>
				{" "}
				{!noAuthor && <>by {author.username}</>} on {dateFormatted}
			</span>
		</Link>
	)
}

export default Post
