import React  from "react"
import {Fab} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import "./BotonRedondo.css"

export default function BotonRedondo (props)
{  
  
  const {funcion} = props;
  return (
      
    <div className="boton">
        <Fab className="boton__open-modal"
         color="primary"
         aria-label="add"
         onClick = {
           ()=>{
            funcion(0)
             }
           
           }
        >
             <AddIcon/>
         </Fab>
    </div>
    )
}

