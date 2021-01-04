import React, {useState,useEffect} from "react"
import firebase, { firestore } from "../../firebase"

export default function Paradas () {

  const [paradas, setparadas] = useState([])
  const [linea, setlinea] = useState('01')
  useEffect(() => {

    const paradasRef =   firestore.collection("paradas")
    let parada = paradasRef.where("LINEA", "==", "01").get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
  
      // snapshot.forEach(doc => {
      //   console.log(doc.id, '=>', doc.data());
      // });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  

      console.log('datos')
  }, [])
  
    return (
      <>
      Hola
      </>
    )
}