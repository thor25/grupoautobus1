import 'date-fns';
import React, {useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  




export default function HoraParadas(props) {
  const classes = useStyles();
  const {grupo} = props
  const [horaInicial,setHoraInicial] = useState('00:00')
  const [horaFinal,setHoraFinal] = useState('00:00')

  useEffect(() => {  
   
   const horas = grupo.dato.datos.hora
   if (horas!==undefined)
   {
   console.log("🚀 ~ file: HoraParadas.js ~ line 24 ~ formatHoras ~ horas", horas)

     setHoraInicial(horas.substring(0,5))
     console.log("🚀 ~ file: HoraParadas.js ~ line 31 ~ formatHoras ~ horas.substring(0,6)", horas.substring(0,5))
     setHoraFinal(horas.substring(6))
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
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        
       
        <KeyboardTimePicker
          margin="normal"
          id="time-picker-end"
          label="Hora final"
          value={horaFinal}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
        }