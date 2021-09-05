import { useContext } from 'react';
import {ParadasContext} from "./ParadasContext"
const useParadas = () => {
  const [state, setState] = useContext(ParadasContext);
 function edit(nombre,hora,sub1,sub2,sub3)
 {
  setNombre(nombre)
  setHora(hora)
  setState(state=>({...state,subgrupos:[
    {nombre:sub1.nombre,paradas:sub1.paradas},
    {nombre:sub2.nombre,paradas:sub2.paradas},
    {nombre:sub3.nombre,paradas:sub3.paradas}
  ]}))
  console.log("edit in context", state)
  /*
  setGrupo(sub1,0)
  setGrupo(sub2,1) 
  setGrupo(sub3,2)
  */
 }
 function init()
 {
   edit ('','00:00-00:00',{nombre:'',paradas:''},{nombre:'',paradas:''},{nombre:'',paradas:''}) 
 }

 function setGrupo(valor,index)
 {
   /*
   switch (index)
   {
     case 0:
      setState(state => ({...state, 'subgrupo1':valor}))
      break;
      case 1:
        setState(state => ({...state, 'subgrupo2':valor}))
        break;
      case 2:
       setState(state => ({...state, 'subgrupo3':valor}))
       break;

   }
   */
  var grupos = state.subgrupos;
  grupos[index]=valor
   setState(state => ({...state, 'subgrupo1':grupos}))
   console.log("Grupo en Context", state,valor)
  
 }  
 function setNombre(valor)
 {
  setState(state => ({...state, nombre:valor}))
 }

 function setHora(valor)
 {
   setState(state => ({...state, hora:valor}))
 }
  function updateGrupo() 
{
    console.log("Update grupo en userContext")
}
function toggleUpdate() {
    setState(state => ({ ...state, isUpdate: !state.isUpdate }));
  }
function getGrupo(index)
{
  console.log("getgrupo in context", state)
  return state.subgrupos[index]
}
return {
    updateGrupo,
    toggleUpdate,
    setGrupo,
    setNombre,
    setHora,
    init,
    edit,
    getGrupo
   
        

}


};



export default useParadas;