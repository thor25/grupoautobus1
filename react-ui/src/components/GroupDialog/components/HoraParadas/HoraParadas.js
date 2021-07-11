import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function HoraParadas(props) {
  const classes = useStyles();
  const {grupo} = props
  const [horaInicial,setHoraInicial] = useState('00:00')
  const [horaFinal,setHoraFinal] = useState('00:00')

  useEffect(() => {  
   const formatHoras = (horas)=>{
   console.log("🚀 ~ file: HoraParadas.js ~ line 24 ~ formatHoras ~ horas", horas)

   }
    formatHoras(grupo.datos)
  }, [])
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        label="Hora inicial"
        type="time"
        value = {horaInicial}
        defaultValue="00:00"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
       <TextField
        id="time end"
        label="Hora final"
        type="time"
        value = {horaFinal}

        defaultValue="00:00"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </form>
  );
}