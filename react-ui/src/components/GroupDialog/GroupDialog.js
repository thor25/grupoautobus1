import React, {useState,useEffect,useContext} from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SubgrupoDlg from "./components/SubgruposDlg"
import HoraParadas from "./components/HoraParadas"
import Paradas from './components/Paradas';
import { v4 as uuid } from "uuid";

import useParadas from './context/paradasContextuseParadas';

export default function FormDialog(props) {

  const {updateGrupo,setNombreContext,getNombre} = useParadas();
    const {open, handleClose,add} = props
    const [nombre, setnombre] = useState('')
    
    const handleChange = (event) =>
    {
      setnombre(event.target.value)
      setNombreContext(event.target.value)
    }

    const handleOk =() => 
  {
    updateGrupo()
    handleClose()  
  }

  const handleCancel = () => 
  {
    handleClose()
  }

 
useEffect(() => {
  var nombre = getNombre()
  
setnombre(nombre)
})

  if (add===false)
   return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edición</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edite los distintos campos que componen el grupo de paradas
          </DialogContentText>
          <TextField
            margin="dense"
            id="nameGrupo"
            label="Nombre de grupo"
            type="text"
            fullWidth
            value = {nombre}
            onChange = {handleChange}
          
          />
          <HoraParadas></HoraParadas>
        <SubgrupoDlg  index={0}></SubgrupoDlg>
        <SubgrupoDlg  index={1}></SubgrupoDlg>
        <SubgrupoDlg  index={2}></SubgrupoDlg>
      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleOk} disabled = {nombre===''} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  else
    return (
     <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Añadir</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Añada los distintos campos que componen el grupo de paradas
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre de grupo"
            type="text"
            fullWidth
            value = {nombre}
            onChange = {handleChange}
          />
          <HoraParadas></HoraParadas>
     
        <SubgrupoDlg  index={0}></SubgrupoDlg>
        <SubgrupoDlg  index={1}></SubgrupoDlg>
        <SubgrupoDlg  index={2}></SubgrupoDlg>
     
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleOk} disabled = {nombre===''} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
     </div>
      );
}
