import React, {useState,useEffect} from "react"
import  { firestore } from "../../../../firebase"

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {getData,getLineas } from "../../utils/utils"
import { Modal, ModalManager } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Paradas () {


  const classes = useStyles();

  const [lineas, setLineas] = useState([{}])
  const [linea, setlinea] = useState('01')
  
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  

  useEffect(() => {

  
  }, [linea])
  
  useEffect(() => {
  
    async function formatLineas() {

        var jsonLineas = await  getLineas()
        setLineas(jsonLineas)
        return jsonLineas
       }
       let jsonLineas = formatLineas()
       setLineas(jsonLineas)
       console.log("jsonlineas", jsonLineas, lineas)

      // console.log('datos')
  }, [])
  
    return(    
      <div className={classes.root}>
        
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
           <FormControl >
             <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={age}
               onChange={handleChange}
              >
              <div>
              {
                lineas ? lineas.map((dato,index)=>(
                <MenuItem value={dato.key}>{dato.nombre}</MenuItem>
              )) : null
              }
              </div>
              </Select>
            </FormControl>

          </Paper>
          </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid> 
     </Grid>
     </div>
      
    )
}