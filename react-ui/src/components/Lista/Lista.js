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
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import {url}  from "../GroupDialog/utils/utils"

import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Lista(props)
{
 const {paradas} = props
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();

 
      const [refresh, setRefresh] = useState(true) 
    
      const [loading, setLoading] = useState(true);
      const [result, setResult] = useState(null);
      const [error, setError] = useState(null);
      const [datosModal,setDatosModal] = useState('')
      const [bodyText, setBodyText] = useState('Sin datos')
      const [resultModal, setResultModal] = useState(null)
     
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
             console.log("fetchdata linea 98", paradas,options)

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
       console.log("🚀 ~ file: Lista.js ~ line 118 ~ useEffect ~ paradas", paradas)

       if (paradas!=="")    
         fetchData(paradas);
        },[refresh,paradas]);

      useEffect (()=>{
        async function fetchData(paradas) 
        {
        console.log("🚀 ~ file: Lista.js ~ line 120 ~ useEffect ~ paradas", paradas)
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
                 parada : paradas.toString()
            })
           }
         
           try {
             console.log("fetchdata linea 141", paradas,options)
 
             const res = await fetch(`${url}/users`, options);
             const json = await res.json();
             console.log("🚀 ~ file: Lista.js ~ line 141 ~ useEffect ~ json", json)
             setResultModal(json)
           
           } catch (err) {
      
           }
        } 
        console.log('datosModal', datosModal)
        if (datosModal!=="")    
          fetchData(datosModal);
      }, [datosModal])
        const [open, setOpen] = React.useState(false);

        const handleOpen = (valor) => {
        console.log("🚀 ~ file: Lista.js ~ line 154 ~ handleOpen ~ valor", valor)
          setDatosModal(valor.codigo)
          setOpen(true);


        };
      
        const handleClose = () => {
          setOpen(false);
        };

        const [modalStyle] = React.useState(getModalStyle);
        const body =  (valor) =>
        {
       
         console.log(valor,datosModal,resultModal)
          return (
          <div className={classes.paper} style={modalStyle}>
            <h2 id="simple-modal-title">Parada {datosModal}</h2> 
            <h3>{resultModal[0].descripcion} </h3>           
            <p id="simple-modal-description">
             {resultModal.map((valor)=>(
            <p>Linea: {valor.linea} :Prox. {valor.tiempo1}, Sig. {valor.tiempo1}</p>
          ))}

            </p>
          </div>
        );
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
                  <IconButton edge="end" aria-label="delete" onClick={()=>{handleOpen(value)}}>
                    <DeleteIcon />
                  </IconButton>
                  <Modal open={open}         onClose={handleClose}
                     aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                 >
                   {body()}
                 </Modal>
                </ListItemSecondaryAction>
              </ListItem>
                ))
              }
            </List>
   </div>
    )    
    
}
