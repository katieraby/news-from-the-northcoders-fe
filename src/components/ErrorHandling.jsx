import React from "react";

const ErrorHandling = ({ status, msg }) => {
  return (
    <div>
      <h2>
        Ooops error {status}!<br />
        {msg}
      </h2>
    </div>
  );
};

export default ErrorHandling;
