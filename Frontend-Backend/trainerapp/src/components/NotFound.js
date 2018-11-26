import React from 'react';
import Header from "./Header";

const NotFound = () => (
  <div className="container-fluid">
    <Header />
    <div className="main-content not-found">
      <i className="material-icons icn-error">error_outline</i>
      <h2>Page Not Found</h2>
    </div>
  </div>
);

export default NotFound;