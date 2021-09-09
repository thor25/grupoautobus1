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

import useParadas from "../GroupDialog/context/ParadasContext/useParadas"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tree:{
    textAlign: 'left',
  color: theme.palette.red
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
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const {initContext,editContext} = useParadas()
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };
  
 //  const datos = user.datos
  // console.log(grupos)

  useEffect(() => {
    

    async function  SetTreeData() 
    {
      var  datos =  await  ListGroup(userId)
      // console.log("UserCard - Datos",datos)
      setgrupos(datos)
      // console.log(grupos)
      var arr = [];
      datos.datos.forEach(function(subgrupos) {
         let datosNodo = {id:uuid(),
          name : subgrupos.nombre, 
          nameTree : subgrupos.hora===undefined ? subgrupos.nombre : `${subgrupos.nombre} (${subgrupos.hora})`,
        
          children:[],datos:subgrupos}
          
        Object.keys(subgrupos).forEach(function(key0) {
          //  console.log("subgrupo",subgrupos[key0],key0,subgrupos[key0].nombre)
            if (subgrupos[key0].nombre!==undefined)
            if (subgrupos[key0].nombre!=="")
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
    //  console.log("selected",selected)
     setloading(false)
    return () => {
      
    }
  }, [loading])
  const handleTreeSelected =( event, value)=>
  {
  // console.log("treeSelect",event.target, value)
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
  // console.log("valor", valorBusqueda,padre)
  setSelected(value)
  }

  // Control Dialog
  const handleClickEdit = () =>{
    
    setvalorInicial(padre.dato.datos)
    console.log(padre.dato.datos)
    console.log("🚀 ~ file: UserCard.js ~ line 159 ~ handleClickEdit ~ padre.dato.datos", padre.dato.datos)
    var hora = padre.dato.datos.hora===undefined?"00:00-00:00":padre.dato.datos.hora
    editContext(padre.dato.datos.id,padre.dato.datos.nombre,hora,padre.dato.datos.subgrupo1,padre.dato.datos.subgrupo2,padre.dato.datos.subgrupo3 )
    setAdd(false)
    setOpen(true);

  } 

  const handleClickAdd = () =>{
    initContext(uuid())
    setvalorInicial(null)
    setAdd(true)
    setOpen(true);
  } 

  const handleClickDelete = () =>{
   // console.log('Button Delete')
    setopenDelete(true);
  } 

   const handleCloseDelete = ()=>
  {
    // console.log("Cierra delete")
    setopenDelete(false)
  }
  const handleCloseDeleteOk = ()=>
  {
    // console.log("Cierra delete - Accept", padre)
    setopenDelete(false)
   
    DeleteGrupo(userId,padre.dato.datos)
    setloading(true)
  }
  const handleClose = (tipo = null) => {
    console.log("Close Dialog - user card", tipo, user,valorInicial)

    setOpen(false);

    // Generamos base de datos
    // if (tipo!==null)
    // {
   
    //   if (tipo.nombre!==undefined)
    //     if (valorInicial===null)
    //        AddGrupo(userId,tipo)
    //     else
    //        EditGrupo(userId,valorInicial,tipo)
    // }
    setloading(true)
    setSelected(null)

  };



  const handleSelectNode = (event, nodeIds)=> 
  {
    // console.log("Node", event.target.label, nodeIds)
  }
  const getTreeItemsFromData = treeItems => {
  return treeItems.map(treeItemData => {
      let children = undefined;
      // console.log("Tree", treeItemData)
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      return (
        <TreeItem
          key={treeItemData.name}
          nodeId={treeItemData.id}
          label={treeItemData.nameTree}
          children={children}
          key={treeItemData.id}
         />
      );
    });
  };
  const DataTreeView = ({ treeItems }) => {
    return (
      <TreeView
        className={classes.tree}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeSelect={handleTreeSelected}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}   
      >
        {getTreeItemsFromData(treeItems)}
      </TreeView>
    );
  };
  return (
    <Grid container  className={classes.root} justify="center"
      direction="row"  >
    <Grid item>
    <Card  className={classes.paper} >
      <CardHeader  className={classes.paper}
        title={`${user.firstName} ${user.lastName}`}
        subheader={user.username}
      />
      <CardContent>
         <DataTreeView className={classes.tree} treeItems={arbol} />

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
        disabled = {selected===null}
      >  Editar
      </Button>
         <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        disabled = {selected===null}
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
    content={selected!==null?<Box> Con esta acción, borrará la parada {padre.dato.datos.nombre} </Box> 
    :<Box></Box>}
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


