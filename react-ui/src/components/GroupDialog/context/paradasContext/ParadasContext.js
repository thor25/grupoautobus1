import React, {useState} from 'react';

const ParadasContext = React.createContext([{}, () => {}]);


const ParadasProvider = (props) => {
    const [state, setState] = useState({});
  return (
    <ParadasContext.Provider value={}>
      {props.children}
    </ParadasContext.Provider>
  );
}

export { ParadasContext, ParadasProvider };