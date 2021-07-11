import 'date-fns';
import React, {useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';


  // The first commit of Material-UI

export default function HoraParadas(props) {
  const {grupo,handleHora} = props
  const [horaInicial,setHoraInicial] = useState(new Date('2021-07-08T00:00:00'))
  const [horaFinal,setHoraFinal] = useState(new Date('2021-07-08T00:00:00'))


  const handleDateChangeInicial = (date) => {
    setHoraInicial(date);
    handleHora(horaInicial,horaFinal)
     };

     const handleDateChangeFinal = (date) => {
       setHoraFinal(date);
       handleHora(horaInicial,horaFinal)
     };
      
  useEffect(() => {  
   
   const horas = grupo.dato.datos.hora
   if (horas!==undefined)
   {
   console.log("🚀 ~ file: HoraParadas.js ~ line 24 ~ formatHoras ~ horas", horas)

     setHoraInicial(new Date(`2021-08-07T${horas.substring(0,5)}:00`))
     console.log("🚀 ~ file: HoraParadas.js ~ line 31 ~ formatHoras ~ horas.substring(0,6)", `2021-08-07T${horas.substring(0,5)}:00`)
     setHoraFinal(new Date(`2021-08-07T${horas.substring(6)}:00`))
     console.log("🚀 ~ file: HoraParadas.js ~ line 33 ~ formatHoras ~ horas.substring(6)", horas.substring(6))
   }
  console.log("🚀 ~ file: HoraParadas.js ~ line 21 ~ HoraParadas ~ horaInicial", horaInicial)
  console.log("🚀 ~ file: HoraParadas.js ~ line 23 ~ HoraParadas ~ horaFinal", horaFinal)

   
  
  }, [])
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        
      
       
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="HoraInicial"
          value={horaInicial}
          onChange={handleDateChangeInicial}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        
       
        <KeyboardTimePicker
          margin="normal"
          id="time-picker-end"
          label="Hora final"
          value={horaFinal}
          onChange={handleDateChangeFinal}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
        }