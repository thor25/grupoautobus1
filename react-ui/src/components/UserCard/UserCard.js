import React, {useState, useEffect} from "react";

import PropTypes from "prop-types";

import { Card, CardActions, CardContent, CardHeader } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from '@material-ui/lab/TreeItem';

import { v4 as uuid } from "uuid";
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import GroupDialog from "../GroupDialog"


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

export default function UserCard(props) {
  const user = props.user;
  const [arbol, setArbol] = useState([])
  const [padre, setPadre] = useState(null)
  const [open,setOpen]=useState(false)
  const classes = useStyles();


  console.log(user)
  const grupos = user.grupos

  useEffect(() => {
    function SetTreeData() 
    {
      // console.log(grupos)
      var arr = [];
      Object.keys(grupos).forEach(function(key) {
        let subgrupos = grupos[key]
        // console.log("Grupo",subgrupos)
        let datosNodo = {id:uuid(),name:subgrupos.nombre,children:[]}
        Object.keys(subgrupos).forEach(function(key0) {
          // console.log("subgrupo",subgrupos[key0])
            if (subgrupos[key0].nombre!==undefined)
            datosNodo.children.push(
              { 
                id:uuid(),
                name:`${subgrupos[key0].nombre}.- ${subgrupos[key0].paradas}` 
              });
        }
        );
        arr.push(datosNodo);
      });
      // console.log(arr)
     
      setArbol(arr)
     
  
    }
    SetTreeData();
    return () => {
      
    }
  }, [])
  const handleTreeSelected =( event, value)=>
  {
  console.log("treeSelect",event.target, value)
   var padre = 1
   var valorBusqueda = {}
 
  arbol.map((dato)=>
 
    {
    if (dato.id===value)
      {
        valorBusqueda = {
        'grupo' : padre,
        'subgrupo' : 0,
        'dato':dato
        }
      }
    var hijo = 1
    dato.children.map((child)=>{
      if (child.id===value)
      {
        valorBusqueda = {
        'grupo' : padre,
        'subgrupo' : hijo,
        'dato':dato
        }
      }
      hijo ++

    })  
      padre++;
    }
    
  )
  setPadre(valorBusqueda)
  console.log("valor", valorBusqueda.dato,padre)
  
  }

  // Control Dialog
  const handleClickEdit = () =>{
    setOpen(true);

  } 

  const handleClose = () => {
    console.log("Close Dialog")
    setOpen(false);
  };



  const handleSelectNode = (event, nodeIds)=> 
  {
    console.log("Node", event.target.label, nodeIds)
  }
  const getTreeItemsFromData = treeItems => {
    return treeItems.map(treeItemData => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      return (
        <TreeItem
          key={treeItemData.name}
          nodeId={treeItemData.id}
          label={treeItemData.name}
          children={children}
         />
      );
    });
  };
  const DataTreeView = ({ treeItems }) => {
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeSelect={handleTreeSelected}
      >
        {getTreeItemsFromData(treeItems)}
      </TreeView>
    );
  };
  return (
    <Grid container spacing={3} className={classes.root}>
    <Grid item xs={12}
    direction="row"
  justify="center"
  alignItems="stretch">
    <Card  className={classes.paper}   
  direction="column"
  justify="center"
  alignItems="stretch">
      <CardHeader  className={classes.paper}
        title={`${user.firstName} ${user.lastName}`}
        subheader={user.username}
      />
      <CardContent>
         <DataTreeView treeItems={arbol} />

      </CardContent>
      <CardActions>
         <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<AddIcon />}
      >  Añadir
      </Button> 
      <Button
        onClick={handleClickEdit}
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<EditIcon />}
        disabled = {padre===null}
      >  Editar
      </Button>
         <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        disabled = {padre===null}

      >  Borrar
      </Button>
      </CardActions>
      
    </Card>
    </Grid>

    <GroupDialog open={open} handleClose={handleClose} grupo={padre} ></GroupDialog>
   
    </Grid>
    
    
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};


