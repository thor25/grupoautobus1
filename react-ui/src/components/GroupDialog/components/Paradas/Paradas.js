import React, {useState,useEffect} from "react"

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {getParadas,getLineas } from "../../utils/utils"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Paradas () {


  const classes = useStyles();

  const [lineas, setLineas] = useState(null)
  const [linea, setlinea] = useState('')
  
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    console.log(event.target.value)
    var newLinea = []
    console.log(newLinea)

    newLinea.push(event.target.value)
    console.log(newLinea)
    setlinea(event.target.value)

  };

  

  useEffect(() => {
    async function formatParadas(linea)
    {
      var jsonParadas = await getParadas(linea)
      console.log("Paradas",jsonParadas)
      return jsonParadas;

    }
    console.log("linea",linea)
    if (linea !== '')
       formatParadas(linea).then((paradas)=>
       {
         console.log(paradas)
       })

  
  }, [linea])
  
  useEffect(() => {
  
    async function formatLineas() {

        var jsonLineas = await  getLineas()
        setLineas(jsonLineas)
        return jsonLineas
       }
       formatLineas().then(jsonLineas =>{
       setLineas(jsonLineas)
       console.log("jsonlineas", jsonLineas, lineas)
       }
       )
      // console.log('datos')
  }, [])
  
    return(    
      <>
        
      <Grid>

        <Grid>
           <FormControl>
             <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               onChange={handleChange}
               value = {linea}

              >
              {
                lineas!==null ? lineas.map((dato,index)=>(
                <MenuItem value={dato.key}>{dato.nombre}</MenuItem>
              )) :  <MenuItem value=''>Sin lineas</MenuItem>
              }
              </Select>
            </FormControl>

          </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid> 
     </Grid>
     </>
      
    )
}