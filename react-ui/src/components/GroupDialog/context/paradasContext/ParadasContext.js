import React, {useState, useContext} from 'react';

const ParadasContext = React.createContext([{}, () => {}]);


const ParadasProvider = (props) => {
    const [state, setState] = useState({
        nombre : '',
        hora:'00:00-00:00',
        subgrupos : [
          { nombre:'', paradas:''},
          {nombre:'',paradas:''},
          {nombre:'',paradas:''}
        ],
        isUpdate :false

    });
   
  return (
    <ParadasContext.Provider value={[state, setState]}>
      {props.children}
    </ParadasContext.Provider>
  );
}

export { ParadasContext, ParadasProvider };