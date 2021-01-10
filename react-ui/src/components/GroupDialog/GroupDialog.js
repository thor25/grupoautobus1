import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Chip from '@material-ui/core/Chip';

import SubgrupoDlg from "./components/SubgruposDlg"


export default function FormDialog(props) {
    const {open, handleClose, grupo} = props
    console.log ("Dialog-grupo", grupo)
    const [nombre, setnombre] = useState('')
   
useEffect(() => {
   const setText = (texto)=>
   {
    setnombre(texto)
   }
   if (grupo!==null)
    if (grupo.dato.name!= '')
      setText(grupo.dato.name)
}, [grupo])

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edición</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edite los distintos campos que componen el grupo de paradas
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre de grupo"
            type="text"
            fullWidth
            value = {nombre}
          />
        <SubgrupoDlg grupo={grupo} index={0}></SubgrupoDlg>
        <SubgrupoDlg grupo={grupo} index={1}></SubgrupoDlg>
        <SubgrupoDlg grupo={grupo} index={2}></SubgrupoDlg>
        { ["hola","adios"].map ((dato)=>
            ( <Chip label={dato  } onDelete={() => {}} />))
           
           }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
