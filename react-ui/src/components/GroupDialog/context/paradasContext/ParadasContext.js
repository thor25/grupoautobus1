import React, {useState, useContext} from 'react';

const ParadasContext = React.createContext([{}, () => {}]);


const ParadasProvider = (props) => {
    const [state, setState] = useState({
        isAdd:true,
        valorInicial:{},
        datos:{
        id : '', 
        nombre : '',
        hora:'00:00-00:00',
        subgrupo1 : {nombre:'', paradas:''},
        subgrupo2:  {nombre:'',paradas:''},
        subgrupo3:  {nombre:'',paradas:''}
        }
    });
   
  return (
    <ParadasContext.Provider value={[state, setState]}>
      {props.children}
    </ParadasContext.Provider>
  );
}

export { ParadasContext, ParadasProvider };