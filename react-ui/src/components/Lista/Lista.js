import React, {useEffect,useState} from "react"
import { Button } from '@material-ui/core'

import BotonRedondo from "../../components/BotonRedondo"
import { useSnackbar } from 'notistack';
// Para Lista
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import {url}  from "../GroupDialog/utils/utils"
export default function Lista(props)
{
 const {paradas} = props
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();


      const [refresh, setRefresh] = useState(true) 
    
      const [loading, setLoading] = useState(true);
      const [result, setResult] = useState(null);
      const [error, setError] = useState(null);
     
      const [dense, setDense] = React.useState(false);

     
      useEffect(() => {
        console.log("🚀 ~ file: Lista.js ~ line 148 ~ process.env.NODE_ENV", process.env.NODE_ENV)

       async function fetchData(paradas) 
       {
         var options = 
         {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                userId: 2,
                params : {
                  principal:'253',
                  tipo:'primera', // orden, primera, principal
                  reloj: 'true'
                },
                parada : paradas
           })
          }
        
          try {
            // console.log("fetchdata", paradas,options)

            const res = await fetch(`${url}/users`, options);
            const json = await res.json();

            setResult(json);
            setLoading(false);
            setRefresh (false);
          } catch (err) {
            setError(err);
            setLoading(false);
          }
       } 
       if (paradas!=="")    
         fetchData(paradas);
        },[refresh,paradas]);
      
      const handleClick = (valor) => {
      console.log("🚀 ~ file: Lista.js ~ line 80 ~ handleClick ~ event", valor)

      }
      const  setUrl =  (url) =>
      {
  /*      enqueueSnackbar('CArgando datos', { 
          variant: 'info',
      });
    */ 
      //   data.parada ="26"
      //   options.body=  JSON.stringify(data)      
        setRefresh(true) 
        // console.log("resultado-set url",result)   
  /*    if (error)
         enqueueSnackbar(error, { 
          variant: 'error',
            });
         else
        enqueueSnackbar('Recargado', { 
          variant: 'success',
           });
*/
     }
    //  console.log("resultado",result)
     if (result === null) {
      return (
        <div>
          <BotonRedondo funcion = {setUrl}/>  
          <h2>No hay paradas</h2>
        </div>
      );
    }
    if (result.message !== undefined)    
    return (
      <div>
        <BotonRedondo funcion = {setUrl}/>  
        <h2>No hay paradas</h2>
      </div>
    );


    return (
     <div>

        <BotonRedondo funcion = {setUrl}/>  
        <List dense={dense}>
        { result.map((value,index) =>(
                
                <ListItem key={index} divider>  
                <ListItemAvatar>
                  <Avatar style={{backgroundColor:value.color,color:"white"}}>
                    {value.linea}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={value.descripcion}
                  secondary={`Prox.:${value.tiempo1} Sig.:${value.tiempo2}` }
                  
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={handleClick(value)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
                ))
              }
            </List>
   </div>
    )    
    
}
