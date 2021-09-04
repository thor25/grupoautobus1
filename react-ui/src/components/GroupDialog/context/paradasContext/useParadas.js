import { useContext } from 'react';
import {ParadasContext} from "./ParadasContext"
const useParadas = () => {
  const [state, setState] = useContext(ParadasContext);
  function updateGrupo() 
{
    console.log("Update grupo en userContext")
}
function toggleUpdate() {
    setState(state => ({ ...state, isPlaying: !state.isPlaying }));
  }
return {
    updateGrupo,
    toggleUpdate
}


};



export default useParadas;