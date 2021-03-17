import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";


import PropTypes from "prop-types";

import { Box, Card, CardActions, CardContent, CardHeader } from "@material-ui/core";

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
import ConfirmationDialog from "../ConfirmationDialog"

import {AddGrupo,DeleteGrupo, EditGrupo, ListGroup} from "../../firebaseutils"

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
  const [add, setAdd] = useState(false)
  const [openDelete, setopenDelete] = useState(false)
  const classes = useStyles();
  const { userId } = useParams();
  const [valorInicial, setvalorInicial] = useState(null)
  const [grupos, setgrupos] = useState(null)
  const [loading, setloading] = useState(false)
  console.log("UserCard - inicio", userId)
 
  
 //  const datos = user.datos
  console.log(grupos)

  useEffect(() => {
    

    async function  SetTreeData() 
    {
      var  datos =  await  ListGroup(userId)
      console.log("UserCard - Datos",datos)
      setgrupos(datos)
      console.log(grupos)
      var arr = [];
      datos.datos.forEach(function(subgrupos) {
       // let subgrupos = grupos[key]
        console.log("Grupo",subgrupos)
        let datosNodo = {id:uuid(),name:subgrupos.nombre,children:[],datos:subgrupos}
        Object.keys(subgrupos).forEach(function(key0) {
          console.log("subgrupo",subgrupos[key0])
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
     setloading(false)
    return () => {
      
    }
  }, [loading])
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
    setvalorInicial(padre.dato.datos)
    setAdd(false)
    setOpen(true);

  } 

  const handleClickAdd = () =>{
    setvalorInicial(null)
    setAdd(true)
    setOpen(true);
  } 

  const handleClickDelete = () =>{
    console.log('Button Delete')
    setopenDelete(true);
  } 

   const handleCloseDelete = ()=>
  {
    console.log("Cierra delete")
    setopenDelete(false)
  }
  const handleCloseDeleteOk = ()=>
  {
    console.log("Cierra delete - Accept", padre)
    setopenDelete(false)
   
    DeleteGrupo(userId,padre.dato.datos)
  }
  const handleClose = (tipo = null) => {
    console.log("Close Dialog - user card", tipo, user,valorInicial)

    setOpen(false);

    // Generamos base de datos
    if (tipo!==null)
    {
   
      if (tipo.nombre!==undefined)
        if (valorInicial===null)
           AddGrupo(userId,tipo)
        else
           EditGrupo(userId,valorInicial,tipo)
    }
    setloading(true)
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
    <Grid container  className={classes.root} justify="center"
      direction="row"  >
    <Grid item xs={6} md={12}>
    <Card  className={classes.paper} >
      <CardHeader  className={classes.paper}
        title={`${user.firstName} ${user.lastName}`}
        subheader={user.username}
      />
      <CardContent>
         <DataTreeView treeItems={arbol} />

      </CardContent>
      <CardActions>
         <Button
        onClick={handleClickAdd}
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
        onClick = {handleClickDelete}
      >  Borrar
      </Button>
      </CardActions>
      
    </Card>

    <GroupDialog open={open} handleClose={handleClose} grupo={padre} add={add}></GroupDialog>
    <ConfirmationDialog  dialogProps={{
        open: openDelete,
        onClose: handleCloseDelete,
      }}
    title="Borrar parada" 
    content={<Box> Con esta acción, borrará la parada elegida.  </Box> }
    dismissiveAction = {<Button color="primary" onClick = {handleCloseDelete}>Cancelar</Button>}
    confirmingAction  =  {<Button color="primary" onClick = {handleCloseDeleteOk}>Aceptar</Button>}
    ></ConfirmationDialog>
   </Grid>
  </Grid> 
    
    
  );
}


UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};


