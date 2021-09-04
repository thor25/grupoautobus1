import { useContext } from 'react';
import {ParadasContext} from "./ParadasContext"
const useParadas = () => {
  const [state, setState] = useContext(ParadasContext);
};

export default useParadas;