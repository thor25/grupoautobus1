import React, {useState}  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextoParadas from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

export default function InputAdornments(props) {
  const {setParadas,txtParadas} = props
  console.log("txt",props)
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [paradas, setparadas] = React.useState('253,47')
  const [error, setError] = useState(false)


  React.useEffect(() => {
    function fijarParadas()
    {
      console.log("useEffect")
      setparadas(txtParadas)
    }
    fijarParadas()
  }, [txtParadas])
  
  const handleChange = () => (event) => {
   //  setValues({ ...values, [prop]: event.target.value });
   console.log(event.target.value)
   setError(true)
   setparadas(event.target.value)
};

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickSendText = () => 
  {
     console.log(values.weight) 
     setError(false)
     setParadas(paradas)
  }

  

  return (
    <div className={classes.root}>
      <div>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Paradas</InputLabel>
          <Input
            id="filled-adornment-password"
            error={error}
            value={paradas}
            onChange={handleChange()}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="send text"
                  onClick={handleClickSendText}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                <SendIcon/>
                </IconButton>
              </InputAdornment>
              
            }
           
          />
        <FormHelperText id="standard-weight-helper-text">
        {error === true ? 'Pendiente de enviar' : ''}
        </FormHelperText>

        </FormControl>
      </div>
    </div>
  );
}
