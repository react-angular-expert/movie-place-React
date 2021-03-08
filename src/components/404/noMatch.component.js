import React from 'react';

import './noMatch.component.css';

const NoMatch = () =>  {
  // Our main app wrapper
  return(
    <div className="movie_wrap nothing">
      <h1>Error 404</h1>
      <p>Looks like this page doesn't exust.</p>
    </div>
  )
}

export default NoMatch;
