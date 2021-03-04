import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Paradas from "../Paradas"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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


 


export default function ParadasDialog(props) {
  const {open,onClose, linea} = props
  const [valor, setvalor] =React.useState('')
  const classes = useStyles();

  const handleValor = (valor) =>
  {
    setvalor(valor)
  }

  const handleOk =() => 
  {
    console.log('ok')
    onClose(valor)
  }

  const handleClose = () => 
  {
    onClose('')
  }
  return (
    <div>     
      <Dialog linea = {linea} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nueva parada</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Indique las paradas a añadir
          </DialogContentText>   
          <Grid item xs={12}>
            <Paradas handle={handleValor}></Paradas>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleOk} color="primary" disabled={valor===""}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
