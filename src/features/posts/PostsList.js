import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const PostsList = () => {
  const posts = useSelector((state) => state.posts)

  // Ταξινομηση ετσι ωστε να προσθετεται το νεο post στην αρχη και οχι στο τελος
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))



  const renderedPosts = orderedPosts.map((post) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content.substring(0, 100)}</p>

        <ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} className="button muted-button">
        {/* πηγαινει στο posts/2, αν υπαρχει αυτος ο ελεγχος θα γινει απο το SinglePostPage,  οπου απο το App.js υπαρχει exact path με βαση το postId του SinglePostPage */}
          View Post
        </Link>
      </article>
    )
  })

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
