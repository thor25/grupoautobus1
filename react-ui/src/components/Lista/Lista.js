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

import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

 

export default function Lista()
{


  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

 
    var data = {
       
         userId: 2,
         params : {
           principal:'253',
           tipo:'primera', // orden, primera, principal
           reloj: 'true'
         },
         parada : '47,253'
    }
      
      const  url = "/users"     
      const [options,setOptions] = useState(null)
      const [refresh, setRefresh] = useState(true) 
    
      const [loading, setLoading] = useState(true);
      const [result, setResult] = useState(null);
      const [error, setError] = useState(null);
     
      const [dense, setDense] = React.useState(false);
      const [secondary, setSecondary] = React.useState(false);

     
      useEffect(() => {
       async function fetchData() 
       {
          try {
            console.log("fetchdata")

            const res = await fetch(url, options);
            const json = await res.json();

            setResult(json);
            setLoading(false);
            setRefresh (false);
          } catch (err) {
            setError(err);
            setLoading(false);
          }
       }
       if (options === null)
          setOptions(
           {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            }
          )
        fetchData();
        },[refresh]);
      
     
      const  setUrl =  (url) =>
      {
      console.log("url")
  /*      enqueueSnackbar('CArgando datos', { 
          variant: 'info',
      });
    */ 
      //   data.parada ="26"
      //   options.body=  JSON.stringify(data)      
        setRefresh(false) 
        console.log(result)   
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
     console.log(result)
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
     <>
        <BotonRedondo funcion = {setUrl}/>  
       
        <List dense={dense}>
        { result.map((value,index) =>(
                <ListItem key={index}>  
                <ListItemAvatar>
                  <Avatar style={{backgroundColor:value.color}}>
                    {value.linea}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={value.descripcion}
                  secondary={`Prox.:${value.tiempo1} Sig.:${value.tiempo2}` }
                  
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
                ))
              }
            </List>
   </>
    )    
    
}
