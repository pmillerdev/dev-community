import React from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

const CommentFeed = ({ comments, postId }) => (
  <>
    {comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ))}
  </>
);

CommentFeed.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired
};

export default CommentFeed;
