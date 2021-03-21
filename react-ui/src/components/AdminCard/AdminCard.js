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
import {AddGrupo,DeleteGrupo, EditGrupo, ListGroup} from "../../firebaseutils"

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
    const [grupos, setgrupos] = useState([{name:''}])
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

    useEffect(() => {
    

        async function  SetTreeData() 
        {
          var  datos =  await  ListGroup(user.uid)
          // console.log("UserCard - Datos",datos)
          // console.log(grupos)
          console.log("SetData", datos.datos)
          setgrupos(datos.datos)
          
          // console.log(arr)
         
         
      
        }
         SetTreeData();
        //  console.log("selected",selected)
        return () => {
          
        }
      }, [])

    const handleClickEdit = ()=>
    {

    }

   
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
          <List className={classes.root}>
      {grupos.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Grupo ${value.nombre}`} />
           
          </ListItem>
        );
      })}
    </List>
          </CardContent>
          <CardActions>
     
          <Button
            onClick={handleClickEdit}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<EditIcon />}
            disabled = {false}
          >  Editar
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
  
  