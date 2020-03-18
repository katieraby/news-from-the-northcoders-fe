import React from "react";

const DeleteComment = props => {
  return (
    <div>
      <button
        onClick={() => {
          props.handleDelete(props.id);
        }}
      >
        Delete Comment
      </button>
    </div>
  );
};

export default DeleteComment;
