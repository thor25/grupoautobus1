import React, {useState, useContext} from 'react';

const ParadasContext = React.createContext([{}, () => {}]);


const ParadasProvider = (props) => {
    const [state, setState] = useState({});
  return (
    <ParadasContext.Provider value={[state, setState]}>
      {props.children}
    </ParadasContext.Provider>
  );
}

export { ParadasContext, ParadasProvider };