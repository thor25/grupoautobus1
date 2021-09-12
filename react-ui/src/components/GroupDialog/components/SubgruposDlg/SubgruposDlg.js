import React, {useState,useEffect} from 'react';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ParadasDialog from "../ParadasDialog"

import firebase, { firestore } from "../../../../firebase"
import { deprecatedPropType } from '@material-ui/core';
import useParadas from '../../context/ParadasContext/useParadas';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function SubgruposDlg(props) {
  const classes = useStyles();
 const {index} = props
 const [nombre, setnombre] = useState('')
 const [paradas, setparadas] = useState('')
 const [parada, setparada] = useState([])
 const [lista, setlista] = useState([])
 const [nombreParada, setnombreParada] = useState('')
 const [indice, setindice] = useState(0)

 const [checked, setChecked] = React.useState([0]);

 const [open, setOpen] = useState(false)
 const {getGrupo, setGrupo} = useParadas()

 const handleChange = (valor) => (event) =>
 {
   if (valor==='nombre')
    setnombre(event.target.value)
   if (valor==='paradas')
    setparadas(event.target.value)
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    var lineas = parada[indice].todo
     console.log("checked", indice, parada[indice], paradas)
    setChecked(newChecked);
    var txtLineas = ""
     console.log("txtParadas",txtLineas)

    newChecked.map((nombre)=>{
      var linea = lineas[nombre].linea
      if (txtLineas.length>0)
        txtLineas = txtLineas+"-"+linea
      else
        txtLineas = linea

    })
    txtLineas = ":"+txtLineas
   var txtParada=paradas.split(',')
   txtParada[indice]= txtParada[indice]+txtLineas
   var i = txtParada[indice].indexOf(':')
   if (i!=-1)
        txtParada[indice]=txtParada[indice].substring(0,i)
   txtParada[indice]=txtParada[indice]+txtLineas
   var txtParadas = ""
   txtParada.map((linea)=>{
    if (txtParadas.length==0)
        txtParadas = linea
    else
       txtParadas += ','+linea


   })    
   setparadas(txtParadas)
  };

useEffect(() => {
 setGrupo({'nombre':nombre,'paradas':paradas}, index)
}, [paradas,nombre])

 const paradasRef =   firestore.collection("paradas")
 
 const getData = async(array) => {
  
  return Promise.all( array.map(async (dato)=>{
    var jsonParada = {numero:dato, lineas:[], todo:[]}

    var indice = dato.indexOf(':')
    if (indice>-1)
    {
      jsonParada.numero=dato.substring(0,indice)
      jsonParada.lineas = dato.substring(indice+1).split('-')
    }
    
    let todo =await  paradasRef.where("NODO", "==", parseInt(jsonParada.numero)).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
      }
   
      var lineas = []
      snapshot.forEach(doc => {   
        lineas.push({
          nombre:doc.data()['NOMBRE PARADA'],
          linea: doc.data().LINEA})
       });

       return lineas
      
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
    jsonParada = 
    {
      numero : jsonParada.numero,
      lineas : jsonParada.lineas,
      todo : todo
    }

   return jsonParada
  }))
 }
 useEffect(() => {
   var sg = getGrupo(index)
     async function  formatText  (sg) {
        setnombre ( sg.nombre )
        setparadas ( sg.paradas)        
        var jsonParada = []
        if (sg.paradas!=='')
          jsonParada = await  getData( sg.paradas.split(','))
        setparada(jsonParada)
        return jsonParada
       }
     if (sg!==null)
         if ( sg !==undefined )
             formatText(sg)
     return () => {
    }
 }, [])


 function handleClick(index)
 { 
  
  setindice(index)
  var  newChecked = [];
   var array = []
   var valor = 0  
   parada[index].todo.map((dato)=>{
     var s=dato.linea;
     if (!array.includes (s))
     {
          array.push(s)
          newChecked.push(valor)
          valor++;

     }
   }
   );

   var lineas0 = parada[index].lineas
   if (lineas0.length!==0)
   {
   newChecked = []
   lineas0.map((dato)=>{
    
    var i = array.indexOf (dato) 
    if (i!==-1)
         newChecked.push(i)
 }
  );
   }  
   setChecked(newChecked)
   setnombreParada(parada[index].todo[0].nombre)
   setlista(array)
 }
 const handleDelete = (index,txtParada)=>
 {
   var valor = parada
   valor.splice(index,1)
   setparada(valor)
   var txtParadas = ''
   var lineas = paradas.split(',')
   lineas.map((linea)=>
   {
    var i = linea.indexOf(':')
    var s
    if (i!=-1)
      s = linea.substring(0,i)
    else
      s = linea
    if (s!==txtParada)
      if (txtParadas.length===0)
        txtParadas = s
      else
        txtParadas=txtParadas+','+s
   })
   if (parada.length>0)
      handleClick(0)
    else
    if  (parada.length===0)
    {
      setlista([])
       setnombreParada("")
       txtParadas = ''
    }
    setparadas(txtParadas)
 }


 const handleClose = async  (valor) => {
  console.log("Close Dialog")
  setOpen(false);
  if (valor ==='') return
  var valor1 = valor.split(',')  
  console.log(valor1)
  var i = parada.length
  valor1.forEach(async (valor)=>{
    var valor0 = []
  valor0.push(valor)
  var jsonParada = await  getData(valor0)
  var newPar = parada
  newPar.push(jsonParada[0])
  console.log("jsonParada", jsonParada[0], newPar)
  setparada(newPar)
  var s = paradas
  if (s!=='')
    s=s+','
  s= s + valor
  setparadas(s)
  handleClick(i)
  i++
  })
};

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded = {false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
          <TextField className={classes.primaryHeading}
                      autoComplete='off'
             value={nombre}
            margin="dense"
            id={`name${index}`}
            label={`subgrupo ${index+1}`}
            type="text"
            fullWidth
            onChange = {handleChange('nombre')}
          />
          </div>
          <div className={classes.column}>
            <TextField className={classes.secondaryHeading}
            value={paradas}
            margin="dense"
            id={`paradas${index}`}
            label="Paradas"
            type="text"
            fullWidth
            autoComplete='off'
            InputProps={{
            readOnly: true,
          }}
            onChange = {handleChange('paradas')}
          /></div> 
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} >
          {
        parada.map((dato, index) => 
            ( <Chip key = {index} label={dato.numero  } 
            color='primary'
            clickcable='true'
            onClick={()=>{handleClick(index)}} onDelete={() => {handleDelete(index,dato.numero)}} />))
        }
          <Chip label = 'Add' disabled={nombre===''} onClick={()=>{setOpen(true)}} ></Chip>
          </div>
          <div className={classes.column}>
          <List>
          {lista.map((dato, value) => (
          <ListItem key={dato} onClick={handleToggle(value)}>
          <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': value }}
              />
            </ListItemIcon>
            <ListItemText id={value} primary={dato} />
          </ListItem>
          ))}
      </List>
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
             {nombreParada}    
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
      </Accordion>
      <ParadasDialog  open={open} onClose={handleClose}></ParadasDialog>
    </div>
  );
}
