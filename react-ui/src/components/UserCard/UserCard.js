import React, {useState, useEffect} from "react";

import PropTypes from "prop-types";

import { Card, CardHeader } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from '@material-ui/lab/TreeItem';

import { v4 as uuid } from "uuid";


import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const seasons = [
  {
    id: uuid(),
    name: "Seasons",
    children: [
      {
        id: uuid(),
        name: "Summer",
        children: [
          {
            id: uuid(),
            name: "June"
          },
          {
            id: uuid(),
            name: "July"
          },
          {
            id: uuid(),
            name: "August"
          }
        ]
      },
      {
        id: uuid(),
        name: "Fall",
        children: [
          {
            id: uuid(),
            name: "September"
          },
          {
            id: uuid(),
            name: "October"
          },
          {
            id: uuid(),
            name: "November"
          }
        ]
      },
      {
        id: uuid(),
        name: "Winter",
        children: [
          {
            id: uuid(),
            name: "December"
          },
          {
            id: uuid(),
            name: "January"
          },
          {
            id: uuid(),
            name: "February"
          }
        ]
      },
      {
        id: uuid(),
        name: "Spring",
        children: [
          {
            id: uuid(),
            name: "March"
          },
          {
            id: uuid(),
            name: "April"
          },
          {
            id: uuid(),
            name: "May"
          }
        ]
      }
    ]
  }
];


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
const classes = useStyles();

  console.log(user)
  const grupos = user.grupos

  useEffect(() => {
    function SetTreeData() 
    {
      console.log(grupos)
      var arr = [];
      Object.keys(grupos).forEach(function(key) {
        let subgrupos = grupos[key]
        console.log("Grupo",subgrupos)
        let datosNodo = {id:uuid(),name:subgrupos.nombre,children:[]}
        Object.keys(subgrupos).forEach(function(key0) {
          console.log("subgrupo",subgrupos[key0])
            if (subgrupos[key0].nombre!==undefined)
            datosNodo.children.push(
              { 
                id:uuid(),
                name:`${subgrupos[key0].nombre} : ${subgrupos[key0].paradas}` 
              });
        }
        );
        arr.push(datosNodo);
      });
      console.log(arr)
     
      setArbol(arr)
     
  
    }
    SetTreeData();
    return () => {
      
    }
  }, [])
 
   
  const getTreeItemsFromData = treeItems => {
    return treeItems.map(treeItemData => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      return (
        <TreeItem
          key={treeItemData.id}
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
      >
        {getTreeItemsFromData(treeItems)}
      </TreeView>
    );
  };
  return (
    <Grid container spacing={3} className={classes.root}>
    <Grid item xs={12}>
    <Card  className={classes.paper}  xs={12}>
      <CardHeader  className={classes.paper}
        title={`${user.firstName} ${user.lastName}`}
        subheader={user.username}
      />
    </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
    <Paper  className={classes.paper}>
    <DataTreeView treeItems={arbol} />
    </Paper>
     </Grid>
    <Grid item xs={12} sm={6}>
      <Paper className={classes.paper}>xs=12 sm=6</Paper>
    </Grid>
    </Grid>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};


