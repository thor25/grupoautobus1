import { useContext, useState } from 'react';
import {ParadasContext} from "./ParadasContext"
import {AddGrupo,DeleteGrupo, EditGrupo, ListGroup} from "../../../../firebaseutils"

const useParadas = () => {
  const [state, setState] = useContext(ParadasContext);
 


 function  editContext(id,nombre,hora,sub1,sub2,sub3)
 {
  setAdd(false)
  edit(id,nombre,hora,sub1,sub2,sub3)
  setValorInicial(state)
  console.log("editcontext in context", state)
 }
 

 function edit(id,nombre,hora,sub1,sub2,sub3)
 {
   setId(id)
  setNombreContext(nombre)
  setHoraContext(hora)
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
 function initContext(id)
 {
   setAdd(true)
   setValorInicial({})
   edit (id,'','00:00-00:00',{nombre:'',paradas:''},{nombre:'',paradas:''},{nombre:'',paradas:''}) 
 }
 function setId(valor)
 {
  setState(state => ({...state, id:valor}))
  console.log("id en Context", state)
 }
 function setAdd(valor)
 {
  setState(state => ({...state, add:valor}))
  console.log("add en Context", state)
 }

 function setValorInicial(valor)
 {
  setState(state => ({...state, valorInicial:valor}))
  console.log("add en Context", state)
 }
 function setGrupo(valor,index)
 {
   
   switch (index)
   {
     case 0:
      setState(state => ({...state.datos, 'subgrupo1':valor}))
      break;
      case 1:
        setState(state => ({...state.datos, 'subgrupo2':valor}))
        break;
      case 2:
       setState(state => ({...state.datos, 'subgrupo3':valor}))
       break;

   }
   
   console.log("Grupo en Context", state,valor)
  
 }  
 function setNombreContext(valor)
 {
  setState(state => ({...state.datos, nombre:valor}))
  console.log("Nombre en Context", state)
 }

 function setHoraContext(valor)
 {
   setState(state => ({...state.datos, hora:valor}))
   console.log("Hora en Context", state)

 }
  function updateGrupo(userId) 
{
    console.log("Update grupo en userContext",  state,userId )
    // var tipo = 
    // {
    //   id:state.id,
    //   nombre:state.nombre,
    //   hora:state.hora,
    //   subgrupo1:{
    //     nombre:state.subgrupos[0].nombre,
    //     paradas:state.subgrupos[0].paradas
    //   },
    //   subgrupo2:{
    //     nombre:state.subgrupos[1].nombre,
    //     paradas:state.subgrupos[1].paradas
    //   },  subgrupo3:{
    //     nombre:state.subgrupos[2].nombre,
    //     paradas:state.subgrupos[2].paradas
    //   }
    // }
    
    if (state.add===true)
       AddGrupo(userId,state.datos)
    else
      EditGrupo(userId,valorInicial,state.datos)
}

function getGrupo(index)
{
 
  var valor;
  switch (index)
  {
    case 0:
   valor = state.datos.subgrupo1
     break;
     case 1:
    valor = state.datos.subgrupo2
       break;
     case 2:
   valor= state.datos.subgrupo3
      break;

  }
  console.log("getgrupo in context", state, index, valor)
  return valor
}
function getHora()
{
  return state.datos.hora
}

function getNombre()
{
  return state.datos.nombre
}
return {
    updateGrupo,
    setGrupo,
    setNombreContext,
    setHoraContext,
    initContext,
    editContext,
    getGrupo,
    getHora,
    getNombre,
}


};



export default useParadas;