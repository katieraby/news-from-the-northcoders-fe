import React from "react";

const ErrorHandling = ({ status, msg }) => {
  return (
    <div>
      <h2>Ooops error {status}!</h2>
      <p>{msg}</p>
    </div>
  );
};

export default ErrorHandling;
