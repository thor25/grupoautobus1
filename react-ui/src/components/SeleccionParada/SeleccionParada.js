import React, {useEffect,useState} from 'react';
import Paper from '@material-ui/core/Paper';


import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Lista from "../Lista/Lista"
import TextoParadas from "../TextoParadas"
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      color:'transparent'
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar:theme.minHeight,
  
  drawerPaper: {
    width: drawerWidth,
    top:70,
  
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    position:"relative"
  },
}));

export default function SeleccionParadas(props) {
  const [grupoParada,setgrupoParada] = useState('')
 
  const { window, grupos } = props;
  console.log(grupos)
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [paradas, setparadas] = useState('')
 const [arrayGrupos, setarrayGrupos] = useState([])
  const [grupo, setgrupo] = useState('')
  var grupo0 = []
  useEffect(() => {
    function getGrupos(grupos)
    {
      const arr = []
      Object.keys(grupos).forEach(key => arr.push({name: key, value: grupos[key]}))
      setarrayGrupos(arr)  
      updateGrupo(0,arr)
    } 
    getGrupos(grupos)
  }, [])
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const updateGrupo = (index,datos) =>
  {
    var g = datos[index]

    console.log("update",index,arrayGrupos[index],datos,g, g.value.nombre)
    setgrupoParada(g.value.nombre)
    grupo0 = []
    
    ponerDatosRadio( g.value.Subgrupo1, grupo0)
    ponerDatosRadio( g.value.Subgrupo2, grupo0)
    ponerDatosRadio( g.value.Subgrupo3, grupo0)

    setgrupo(JSON.stringify(grupo0))

console.log("grupo", grupo,grupo0)

   
//    setgrupo(... [subgrupos],arrayGrupos[index].nombre)


  }
  function ponerDatosRadio(sg, subgrupos) {
    console.log(sg);

    if (sg!==undefined)
      subgrupos.push({ nombre: sg['nombre'], paradas: sg['paradas'] });
    else
      subgrupos.push({ nombre: '', paradas:'' });

    }
  
  const handleListItemClick = (event,text,index) =>
  {
    console.log('Click',index,arrayGrupos,arrayGrupos[index].value)
    updateGrupo(index,arrayGrupos)
    console.log("handle", grupo0)

    setMobileOpen(!mobileOpen);
  }
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List >
        {arrayGrupos.map((dato, index) => (
          <ListItem button key={dato.value.nombre} 
           onClick={(event) => handleListItemClick(event, dato.value.nombre,index)}
          >
            <ListItemText primary={dato.value.nombre} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Nuevo grupo ', 'Borrar'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    
    </div>
  );
 
 
  function setParadas(valor)
  {
    setparadas(valor)
  }
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
    
    
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
      <CssBaseline />
      <Paper superficie={3} variant="outlined" square style={{paddingTop:5}}>

      <AppBar className={classes.AppBar} position='relative' color="transparent">
        <Toolbar className={classes.toolbar}  >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {grupoParada}
          </Typography>
          <Divider />
          </Toolbar>
          </AppBar>
         </Paper>   
         <Paper superficie={3} variant="outlined" square style={{paddingTop:5}}>
          <FormControlLabelPlacement setParadas = {setParadas}   grupo= {grupo}></FormControlLabelPlacement>
        </Paper>
        <Paper  variant="outlined" square style={{paddingTop:5}}>
        <TextoParadas txtParadas = {paradas} setParadas = {setParadas}></TextoParadas>
        </Paper>
        <Paper  variant="outlined" square style={{paddingTop:5}}>
        <Lista refresh={true} paradas={paradas} style={{top:120}}></Lista>
        </Paper>
           </main>
     
    </div>
  );
}
;

function FormControlLabelPlacement(props) {
 
  const [value, setValue] = React.useState('');
  const {setParadas,grupo} = props

  console.log("Radios",grupo,setParadas) 
  const handleRadioChange = (event) => {
    console.log(event.target.value)
    setParadas (event.target.value)
  }
 
 if (grupo!=='')
  {
    var grupoJSON = JSON.parse(grupo)
    console.log('GrupoJSON',grupoJSON)
  return (
    
    <FormControl component="fieldset">
      <FormLabel component="legend">Paradas</FormLabel>
      <RadioGroup row aria-label="Paradas" onChange={handleRadioChange} 
       name="paradas" defaultValue="top" >
         {      
          grupoJSON.map((dato, index) => (
          <FormControlLabel
          value={dato.paradas}
          control={<Radio color="primary" disabled={dato.nombre===''}   style = {{visibility:dato.nombre!==''?'visible':'hidden'}} />}
          label={dato.nombre}
          labelPlacement="end"
        
        />
        ))}
      
      </RadioGroup>
    </FormControl>
  );
          }
  else
  return (
    
    <FormControl component="fieldset">
      <FormLabel component="legend">Paradas</FormLabel>
      <RadioGroup row aria-label="Paradas" onChange={handleRadioChange} 
       name="paradas" defaultValue="top" >
       
        <FormControlLabel
          value="253,47"
          control={<Radio color="primary" />}
          label="Salida de casa"
          labelPlacement="end"
        />
        <FormControlLabel
          value="918"
          control={<Radio color="primary" />}
          label="Llegada a Prado"
          labelPlacement="end"
          style={{visibility:'hidden'}}
          
        />
        <FormControlLabel
          value="21"
          control={<Radio color="primary" />}
          label="Trinidad"
          labelPlacement="end"
        />
      </RadioGroup>
    </FormControl>
  );
}




  