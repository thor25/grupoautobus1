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
  const {grupo} = props
  const [horaInicial,setHoraInicial] = useState(new Date('2021-07-08T00:00:00'))
  const [horaFinal,setHoraFinal] = useState(new Date('2021-07-08T00:00:00'))

  const handleHora = (horaInicial, horaFinal)=>
  {
 
  console.log("🚀 ~ file: HoraParadas.js ~ line 21 ~ HoraParadas ~ horaFinal", horaFinal)
  console.log("🚀 ~ file: HoraParadas.js ~ line 21 ~ HoraParadas ~ horaInicial", horaInicial)
   var horaI = horaInicial.getHours()<10?
   `0${horaInicial.getHours()}:${horaInicial.getMinutes()}`:
   `${horaInicial.getHours()}:${horaInicial.getMinutes()}`
  var horaI=  new Date(horaInicial).toLocaleTimeString().substring(0,5)
  if (horaInicial.getHours()<10) horaI = ('0'+horaI).substring(0,5)
   console.log("🚀 ~ file: HoraParadas.js ~ line 24 ~ HoraParadas ~ horaI",horaInicial, horaI)
 // var horaF = `${horaFinal.getHours()}:${horaFinal.getMinutes()}` 
 var horaF=  new Date(horaFinal).toLocaleTimeString().substring(0,5)
 if (horaFinal.getHours()<10) horaF = ('0'+horaF).substring(0,5)

 console.log("🚀 ~ file: HoraParadas.js ~ line 26 ~ HoraParadas ~ horaF",horaFinal, horaF)
  setHoraContext(horaI+"-"+horaF)
}


  const handleDateChangeInicial = (date) => {
    setHoraInicial(date);
    console.log("🚀 ~ file: HoraParadas.js ~ line 33 ~ handleDateChangeInicial ~ date", date)
    handleHora(date,horaFinal)
    };

     const handleDateChangeFinal = (date) => {
       setHoraFinal(date);
       console.log("🚀 ~ file: HoraParadas.js ~ line 39 ~ handleDateChangeFinal ~ date", date)  
       handleHora(horaInicial,date)
     };
      
  useEffect(() => {  
   
  // const horas = grupo.dato.datos.hora
  const horas = getHora()
  
   if (horas!=="")
   {
    console.log("🚀 ~ file: HoraParadas.js ~ line 51 ~ useEffect ~ horas", horas)
     setHoraInicial(new Date(`2021-08-07T${horas.substring(0,5)}:00`))
     setHoraFinal(new Date(`2021-08-07T${horas.substring(6)}:00`))
   }
   else
   {
    setHoraInicial(new Date(`2021-08-07T00:00:00`))
    setHoraFinal(new Date(`2021-08-07T$00:00:00`)) 
   }
  console.log("🚀 ~ file: HoraParadas.js ~ line 21 ~ HoraParadas ~ horaInicial", horaInicial)
  console.log("🚀 ~ file: HoraParadas.js ~ line 23 ~ HoraParadas ~ horaFinal", horaFinal)

   
  
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