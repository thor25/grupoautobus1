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
 const {grupo,index} = props
 const [nombre, setnombre] = useState('')
 const [paradas, setparadas] = useState('')
 const [parada, setparada] = useState([])
 const [chips,setchips] = useState([])


 useEffect(() => {
     function  formatText  (texto) {
      var datosParada = []

        var valores=texto.split('.-')
        setnombre ( valores[0].trim())
        setparadas ( valores[1].trim())
        var array = valores[1].split(',')
        var jsonParada = {}
        array.map((dato)=>{
          jsonParada = {numero:dato, lineas:[]}
          var indice = dato.indexOf(':')
          if (indice>-1)
          {
            jsonParada.numero=dato.substring(0,indice-1)
            jsonParada.lineas = dato.substring(indice+1).split('-')
          }
         parada.push(jsonParada)
        })
        setchips(parada[0].lineas)

        console.log("parada:",parada)

     }
     if (grupo!==null){
       {
         var sg = grupo.dato.children[index]
         console.log(sg);
         if (sg !==undefined )
         {
          var s = sg.name
          if (s)
            formatText(s)
         }
       }
     }
     return () => {
      
    }
 }, [grupo])
 function renderChips()
 {
   console.log("chips", parada)
   return 
    { ["hola","adios"].map((datos)=>{
       <Chip label={datos}></Chip>
     })
   
    }
 }

 function handleClick(index)
 {
   console.log( index) 
   
 }
 console.log("Subgrupo", grupo, index)
  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
          <TextField className={classes.primaryHeading}
             value={nombre}
            margin="dense"
            id={`name${index}`}
            label="Nombre de grupo"
            type="text"
            fullWidth
          />
          </div>
          <div className={classes.column}>
            <TextField className={classes.secondaryHeading}
             value={paradas}
            margin="dense"
            id={`paradas${index}`}
            label="Lista de paradas"
            type="text"
            fullWidth
          /></div> 
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} >
          {
        parada.map((dato, index) => 
            ( <Chip label={dato.numero  } onClick={()=>{handleClick(index)}} onDelete={() => {}} />))
           
           
        }
          </div>
          <div className={classes.column}>
          <List>
          {chips.map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={`${index}.-${text}`} />
          </ListItem>
        ))}
      </List>
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              Select your destination of choice
              <br />
              <a href="#secondary-heading-and-columns" className={classes.link}>
                Learn more
              </a>
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
      
    </div>
  );
}
