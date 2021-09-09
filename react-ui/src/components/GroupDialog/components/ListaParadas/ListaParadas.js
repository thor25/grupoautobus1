import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import TextField from '@material-ui/core/TextField';

import { getParadasLinea } from "../../utils/utils"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width:'100%',
    backgroundColor: theme.palette.background.paper,
  },
  lista: {
    width: '100%',   
    backgroundColor: theme.palette.background.paper,
    dense : true,
    maxHeight: 200,
     overflow: 'auto'
  },
  appBar: {
   
  }
}));



function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function ListaParadas(props) {
  const {linea,handle} = props
  const [paradas, setParadas] = useState({"sentido":[]})
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [newParadas, setNewParadas] = useState("Sin paradas")
  const [checked, setChecked] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    async function formatParadas(linea)
    {
      var jsonParadas = await getParadasLinea(linea)
      console.log("🚀 ~ file: ListaParadas.js ~ line 90 ~ useEffect ~ jsonParadas", jsonParadas)
      return jsonParadas.datos;

    }
    setChecked([])
    if (linea !== '')
       formatParadas(linea).then((paradas)=>
       {
         setParadas(paradas)
       })

  
  }, [linea])

  useEffect(() => {
     function setDatos(valores)
    {
      var datos = ""
      checked.forEach(dato=>{
        if (datos.length!==0) 
          datos+=","  
        datos += dato
      })
      if (datos!=="")
      {
         setNewParadas(datos)
         handle(datos)
      }
      else
      {
      handle("")
      setNewParadas("Sin paradas")
      }

    }
    setDatos(checked)
  
  }, [checked])

  function cambioValor(value)
  { const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
   
  }
  return (
    <div className={classes.root}>
     <AppBar position="static"  className={classes.appBar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Ida" {...a11yProps(0)} />
          <Tab label="Vuelta" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CheckboxList paradas = {paradas.sentido[0]} checked = {checked} sentido={'0'} valor={cambioValor} ></CheckboxList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CheckboxList paradas = {paradas.sentido[1]} checked = {checked} sentido={'1'} valor={cambioValor}></CheckboxList>
      </TabPanel>  
      <TextField
       //   id="standard-read-only-input"
          label="Paradas seleccionadas"
          defaultValue="Sin paradas"
          value={newParadas}
          InputProps={{
            readOnly: true,
          }}
        />  
    </div>
  );
}

function CheckboxList(props) {
  var valores = props.paradas
  const { valor,checked } = props

  const classes = useStyles();
 

  const handleToggle = (value) => () => {  
      valor(value)
  };

  if (valores===undefined)
    return (<>No hay paradas</>)
  if (valores.length===0)
    return (<>No hay paradas</>)
  else 
   {
   return (
    <List className={classes.lista}>
      {valores.paradas.map((value) => {
        const labelId = `checkbox-list-label-${value.codigo}`;

        return (      
          <ListItem key={value.codigo} role={undefined} dense button onClick={handleToggle(value.codigo)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value.codigo) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value.descripcion} />           
          </ListItem>    
        );
      })}
    </List>
  );
    }
}
