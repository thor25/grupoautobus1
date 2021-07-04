import { Component } from "react";

import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";


import PropTypes from "prop-types";

import { Box, Card, CardActions, CardContent, CardHeader } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import {ListGroup} from "../../firebaseutils"
import {url, getFitbit,setFitbit} from "../GroupDialog/utils/utils"

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

export default function AdminCard(props) {
    const classes = useStyles();
         
    const {user} = props
    const [checked, setChecked] = React.useState([0]);
   
    useEffect(() => {
    
        async function fetchData() 
        {
          var newLeft0 = []
          var newRight = []
              console.log("fetchdata")
              console.log("🚀 ~ file: AdminCard.js ~ line 77 ~ useEffect ~ newLeft0", newLeft0)
              console.log("🚀 ~ file: AdminCard.js ~ line 77 ~ useEffect ~ newRight", newRight)
              console.log("SetTreeData")
              var listaFitbit = await getFitbit()
              var grupoFitbit = listaFitbit.grupos.toUpperCase().split(',')
    
              var  datos =  await  ListGroup(user.uid)
              datos.datos.forEach(dato => {
               
               var dato0 = convert(dato)
                  if (grupoFitbit.find(grupo=>dato.nombre.toUpperCase()===grupo))
                  {
                     newRight.push(dato0)
                  }
                  else
                  newLeft0.push(dato0)
    
              });    
             setRight(newRight)
             setLeft(newLeft0)
            //  const s =  pruebaNot(newLeft0,newRight);
            
        } 
       
          fetchData();
         },[]);

   
    const convert= (valor)=>
    {
      var conversion=
    {
      id:valor.nombre,
      nombreGeneral:valor.nombre,
      nombreSubGrupo1:valor.subgrupo1.nombre,
      paradasSubGrupo1:valor.subgrupo1.paradas,
      nombreSubGrupo2:valor.subgrupo2.nombre,
      paradasSubGrupo2:valor.subgrupo2.paradas,
      nombreSubGrupo3:valor.subgrupo3.nombre,
      paradasSubGrupo3:valor.subgrupo3.paradas,
     }
    return conversion
    }
    const handleClickEdit =async  ()=>
    {
      var cadena = ""
      console.log("Edit")
      right.forEach(dato=>{
        if (cadena!=="")
         cadena = cadena + ","
        cadena = cadena + dato.nombreGeneral

      })
      console.log("🚀 ~ file: AdminCard.js ~ line 99 ~ AdminCard ~ cadena", cadena)

     await setFitbit(cadena)
    }

    // function filtrarPorID(obj,b) {
    // console.log(`obj:${obj},b:${b}`)
    // return true;
    // }
    // function pruebaIntersection(a,b)
    // {
    //   console.log("pruebaint",a,b)
    //   return a.filter( (el) =>
    //   {
    //     let retorno = false
    //     b.forEach(valor=>{
    //       if (el.id===valor.id) 
    //       {           
    //            retorno = true
    //        }
    //     })
    //     return retorno;
    //   }
    //   );
     
    // }

    // function pruebaNot(a,b)
    // {
    //   console.log("pruebaNot",a,b)
    //   return a.filter( (el) =>
    //   {
    //     let retorno = true
    //     b.forEach(valor=>{
    //       if (el.id===valor.id) 
    //       {           
    //         retorno = false
    //        }
    //     })
    //     return retorno;
    //   }
    //   );
     
    // }
    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
      }
      
      function intersection(a, b) {
        return a.filter((value) => b.indexOf(value) !== -1);
      }
      
        const [left, setLeft] = React.useState([]);
        const [right, setRight] = React.useState([]);
      
        const leftChecked = intersection(checked, left);
        const rightChecked = intersection(checked, right);
      
        const handleToggle = (value) => () => {
          const currentIndex = checked.indexOf(value);
          const newChecked = [...checked];
      
          if (currentIndex === -1) {
            newChecked.push(value);
          } else {
            newChecked.splice(currentIndex, 1);
          }
      
          setChecked(newChecked);
        };
      
        const handleAllRight = () => {
          setRight(right.concat(left));
          setLeft([]);
        };
      
        const handleCheckedRight = () => {
          setRight(right.concat(leftChecked));
          setLeft(not(left, leftChecked));
          setChecked(not(checked, leftChecked));
        };
      
        const handleCheckedLeft = () => {
          setLeft(left.concat(rightChecked));
          setRight(not(right, rightChecked));
          setChecked(not(checked, rightChecked));
        };
      
        const handleAllLeft = () => {
          setLeft(left.concat(right));
          setRight([]);
        };
      
        const customList = (items) => (
          <Paper className={classes.paper}>
            <List dense component="div" role="list">
              {items.map((value) => {
                const labelId = `transfer-list-item-${value.id}-label`;
      
                return (
                  <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
                    <ListItemIcon>
                      <Checkbox
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`Gr. ${value.nombreGeneral}`} />
                  </ListItem>
                );
              })}
              <ListItem />
            </List>
          </Paper>
        );
      
       
    return (
        <>
        <Grid container  className={classes.root} justify="center"
          direction="row"  >
        <Grid item>
        <Card  className={classes.paper} >
          <CardHeader  className={classes.paper}
            title={`${user.firstName} ${user.lastName}`}
            subheader={user.username}
          />
          <CardContent>
          <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList(left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleAllRight}
                  disabled={left.length === 0}
                  aria-label="move all right"
                >
                  ≫
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleAllLeft}
                  disabled={right.length === 0}
                  aria-label="move all left"
                >
                  ≪
                </Button>
              </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
          </Grid>
          </CardContent>
          <CardActions>
     
          <Button
            onClick={handleClickEdit}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<EditIcon />}
            disabled = {false}
          >  Actualizar
          </Button>
          
          </CardActions>
          
        </Card>
    </Grid>
    </Grid>
        </>
    )
}
  AdminCard.propTypes = {
    user: PropTypes.object.isRequired,
  };
  
  