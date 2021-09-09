import React, {useState, useContext} from 'react';

const ParadasContext = React.createContext([{}, () => {}]);


const ParadasProvider = (props) => {
    const [state, setState] = useState({
       
        id : '', 
        nombre : '',
        hora:'00:00-00:00',
        subgrupo1 : {nombre:'', paradas:''},
        subgrupo2:  {nombre:'',paradas:''},
        subgrupo3:  {nombre:'',paradas:''}
        
    });
    const [add,setAdd] = useState(false)
    const [valorInicial,setValorInicial] =useState ({})
   
  return (
    <ParadasContext.Provider value={[state, setState,add,setAdd,valorInicial,setValorInicial]}>
      {props.children}
    </ParadasContext.Provider>
  );
}

export { ParadasContext, ParadasProvider };