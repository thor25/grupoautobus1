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

import useParadas from "../GroupDialog/context/paradasContextuseParadas"

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
  const [arbol, setArbol] = useState({})
  const [datos, setDatos] = useState(null)
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

 
 
  useEffect(() => {
    

    async function  SetTreeData() 
    {
      var  datos =  await  ListGroup(userId)
      console.log("UserCard - Datos",datos)
      if (datos.datos===undefined)
      {
        await AddGrupo(userId,
           {
            nombre:'',
            id:'',
            subgrupo1:{nombre:'',paradas:''},
            subgrupo2:{nombre:'',paradas:''},
            subgrupo3:{nombre:'',paradas:''}
           })
        datos = await  ListGroup(userId)
      }
    
      setgrupos(datos)
      var arr = {id:'root' , name:'Paradas', children:[]};
      datos.datos.forEach(function(subgrupos) { creaGrupo(subgrupos, arr. children); });

    
     
      setArbol(arr)
     
  

      function creaGrupo(subgrupos ,arr) {
        var id = arr.length.toString()
        let datosNodo = {
          id:id+'-',
          nameTree: 'padre',
          name: subgrupos.hora === undefined ? subgrupos.nombre : `${subgrupos.nombre} (${subgrupos.hora})`,
          children: [], 
          datos: subgrupos
        };

        Object.keys(subgrupos).forEach(function (key0) {
         
          if (subgrupos[key0].nombre !== undefined)
            if (subgrupos[key0].nombre !== "")
              datosNodo.children.push(
                {
                  id: `${id}-${key0.substring(8)}`,
                  name: `${subgrupos[key0].nombre}.- ${subgrupos[key0].paradas}`
                });
        }
        );  
        arr.push(datosNodo);
      }
    }
     SetTreeData();
    //  console.log("selected",selected)
     setloading(false)
    return () => {
      
    }
  }, [loading])
  const handleTreeSelected =( event, value)=>
  {
   

   

   var padre = 1
   var valorBusqueda = {}

   if (value==='root')
    setSelected(null)
  else  
  { 
    var index =  parseInt(value.substring(value.indexOf('-')-1))
    valorBusqueda= arbol.children[index].datos
       
  //  arbol.children.map((dato)=>
 
  //    {
  //   if (dato.id===value)
  //     {
  //       valorBusqueda = {
  //       'grupo' : padre,
  //       'subgrupo' : 0,
  //       'dato':dato
  //       }
  //     }
  //   var hijo = 1
  //   dato.children.map((child)=>{
  //     if (child.id===value)
  //     {
  //       valorBusqueda = {
  //       'grupo' : padre,
  //       'subgrupo' : hijo,
  //       'dato':dato
  //       }
  //     }
  //     hijo ++

  //   })  
  //     padre++;
  //   }
    
  // )
  
   setDatos(valorBusqueda)
  // console.log("valor", valorBusqueda,padre)
   setSelected(value)
  }
  }

  // Control Dialog
  const handleClickEdit = () =>{
    
    setvalorInicial(datos)
    console.log("🚀 ~ file: UserCard.js ~ line 183 ~ handleClickEdit ~ datos", datos)
    var hora = datos.hora===undefined?"00:00-00:00":datos.hora
    editContext(datos.id,datos.nombre,hora,datos.subgrupo1,datos.subgrupo2,datos.subgrupo3 )
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
    DeleteGrupo(userId,datos)
    setloading(true)
  }
  const handleClose = () => {
    setOpen(false);
   setloading(true)
    setSelected(null)
  };



  const handleSelectNode = (event, nodeIds)=> 
  {
    // console.log("Node", event.target.label, nodeIds)
  }

  const renderTree = (nodes) => 
    {
    if (nodes.id===undefined)
      nodes.id = uuid()
      
    return (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
    )
    }
  ;
  const getTreeItemsFromData = treeItems => {
  return treeItems.map(treeItemData => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      console.log("🚀 ~ file: UserCard.js ~ line 228 ~ UserCard ~ children", children)

      return (
        <TreeItem       
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
        {renderTree(arbol)}
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

    <GroupDialog open={open} handleClose={handleClose}  add={add}></GroupDialog>
    <ConfirmationDialog  dialogProps={{
        open: openDelete,
        onClose: handleCloseDelete,
      }}
    title="Borrar parada" 
    content={selected!==null?<Box> Con esta acción, borrará la parada {datos.nombre} </Box> 
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


