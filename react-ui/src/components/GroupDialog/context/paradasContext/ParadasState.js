import React from 'react';

const MusicPlayerContext = React.createContext();

const MusicPlayerProvider = (props) => {
  return (
    <MusicPlayerContext.Provider value={}>
      {props.children}
    </MusicPlayerContext.Provider>
  );
}

export { MusicPlayerContext, MusicPlayerProvider };