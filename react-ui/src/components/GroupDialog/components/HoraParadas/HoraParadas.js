import 'date-fns';
import React, {useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

import useParadas from "../../context/ParadasContext/useParadas"
  // The first commit of Material-UI

export default function HoraParadas(props) {
  const {getHora, setHoraContext} = useParadas()
  const [horaInicial,setHoraInicial] = useState(new Date('2021-07-08T00:00:00'))
  const [horaFinal,setHoraFinal] = useState(new Date('2021-07-08T00:00:00'))

  const handleHora = (horaInicial, horaFinal)=>
  {
    
  var horaI = formatHora(horaInicial);
  var horaF = formatHora(horaFinal)
 
  setHoraContext(horaI+"-"+horaF)

    function formatHora(hora) {
      var horaI = hora.toLocaleTimeString();
      if (hora.getHours() < 10)
        horaI = ('0' + horaI);
      horaI = horaI.substring(0, 5);
      return horaI;
    }
}


  const handleDateChangeInicial = (date) => {
    setHoraInicial(date);
    handleHora(date,horaFinal)
    };

     const handleDateChangeFinal = (date) => {
       setHoraFinal(date);
       handleHora(horaInicial,date)
     };
      
  useEffect(() => {  
   
  // const horas = grupo.dato.datos.hora
  const horas = getHora()
  
   if (horas!=="")
   {
     setHoraInicial(new Date(`2021-08-07T${horas.substring(0,5)}:00`))
     setHoraFinal(new Date(`2021-08-07T${horas.substring(6)}:00`))
   }
   else
   {
    setHoraInicial(new Date(`2021-08-07T00:00:00`))
    setHoraFinal(new Date(`2021-08-07T$00:00:00`)) 
   }

  }, [])
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifycontent="space-around">
        
      
       
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