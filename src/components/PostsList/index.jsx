import React from 'react';
import PropTypes from 'prop-types';

PostsList.propTypes = {
    posts: PropTypes.array,
};

PostsList.defaultProps = {
    posts: [],
}

function PostsList(props) {

    const { posts } = props;

    return (
        <ul className="posts-list">
           { posts.map(post => (
               <li key={post.id}>
                   { post.title }
               </li>
           ))} 
        </ul>
    );
}

export default PostsList;