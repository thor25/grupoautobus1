import React, {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  export default function SeleccionParada()
  {
   const [paradas, setParadas] = useState("Salida de casa")
  
   const handleChange = (event) => {
    setParadas(event.target.value);
  };
   return (
      <>
        <InputLabel id="demo-simple-select-label">Paradas del grupo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value = {paradas}
          onChange={handleChange}
        >
          <MenuItem value={10}>Salida de casa</MenuItem>
          <MenuItem value={20}>Llegada Prado</MenuItem>
          <MenuItem value={30}>Trinidad</MenuItem>
        </Select>
      </>
      )
  }