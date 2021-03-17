import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SubgrupoDlg from "./components/SubgruposDlg"
import Paradas from './components/Paradas';


export default function FormDialog(props) {
    const {open, handleClose, grupo,add} = props
    console.log ("Dialog-grupo", grupo)
    const [nombre, setnombre] = useState('')
    const [newGroup, setnewGroup] = useState(
      {
        'nombre':"",
         'subgrupo1':{'nombre':'','paradas':''},
         'subgrupo2':{'nombre':'','paradas':''},
         'subgrupo3':{'nombre':'','paradas':''},       
      }
    )
    const handleSubChange = (index, valor) =>
    {
    
      var indice = `subgrupo${index+1}`
      console.log("SubChange", index,indice,valor)
      setnewGroup({... newGroup, [indice]:valor})

    }
    const handleChange = (event) =>
    {
      setnombre(event.target.value)
      setnewGroup({... newGroup, "nombre":nombre})
    }

    const handleOk =() => 
  {
    console.log('ok')
    setnewGroup({... newGroup, 'nombre':nombre})
     
    handleClose(newGroup)
  }

  const handleCancel = () => 
  {
    console.log('cancel')
    handleClose(null)
  }

useEffect(() => {
  setnewGroup({... newGroup, "nombre":nombre})
}, [nombre])
useEffect(() => {
  if (add===true) 
  setnombre('')
  else
  if (grupo!==null)
   if (grupo.dato.name!= '')
     setnombre(grupo.dato.name)
}, [add])
useEffect(() => {

   const setText = (texto)=>
   {
    setnombre(texto)
   }
   console.log('UseEffect-grupo', grupo)
   if (add===true)
   {
     setText('')
   }
   else
   if (grupo!==null)
    if (grupo.dato.name!= '')
      setText(grupo.dato.name)
}, [grupo])
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
        <SubgrupoDlg handleSubChange = {handleSubChange} grupo={grupo} index={0}></SubgrupoDlg>
        <SubgrupoDlg handleSubChange = {handleSubChange} grupo={grupo} index={1}></SubgrupoDlg>
        <SubgrupoDlg handleSubChange = {handleSubChange} grupo={grupo} index={2}></SubgrupoDlg>
      
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
        <SubgrupoDlg handleSubChange = {handleSubChange} grupo={null} index={0}></SubgrupoDlg>
        <SubgrupoDlg handleSubChange = {handleSubChange} grupo={null} index={1}></SubgrupoDlg>
        <SubgrupoDlg handleSubChange = {handleSubChange} grupo={null} index={2}></SubgrupoDlg>
     
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
