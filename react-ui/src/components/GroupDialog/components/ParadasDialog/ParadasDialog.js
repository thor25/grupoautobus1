import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ParadasDialog(props) {
  const {open,onClose} = props
  const [valor, setvalor] =React.useState('')
  const handleChange = (event) => {
    setvalor( event.target.value );
  };


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
     
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nueva parada</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Indique la parada a añadir
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nueva Parada"
            type="number"
            fullWidth
            onChange={handleChange}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleOk} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
