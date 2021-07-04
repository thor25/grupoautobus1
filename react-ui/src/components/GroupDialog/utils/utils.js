import { firestore } from "../../../firebase"
export const url = "http://localhost:5000/api"
const lineasRef  =  firestore.collection("lineas") 
const usersRef = firestore.collection('users')
export const  getLineasTussam =  async () =>
{
        
          try {
             console.log("getlineastussam")

            const res = await fetch(`${url}/lineas`);
            const json = await res.json();
            console.log("getlineastussam", json)
            return json

       ;
          } catch (err) {
           console.log(err)
            

          }
       } 
       
export async function   getParadasLinea  (linea) 
{
  try {
    console.log("getParadasLinea", linea)

   const res = await fetch(`${url}/nodoslinea?linea=${linea}`);
   const json = await res.json();
   console.log("getParadasLinea", json)
   return json

;
 } catch (err) {
  console.log(err)
   

 }
}

export const  getLineas = async()=>
{
    return Promise.all ( 
    await lineasRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
      }
      var lineas = []
   
      snapshot.forEach(doc => {
     //   console.log(doc.id, '=>', doc.data());
       // jsonParada.todo.push(doc.data().LINEA)
        let nombre = doc.data()['valor']
        let key = nombre.substring(0,nombre.indexOf('.-'))
        let dato = {
            nombre:nombre,
            key:key
         }
        lineas.push(dato)});
 
       return lineas
      
    })
    .catch(err => {
      console.log('Error getting documents', err);
    })
    
  
    )
}

const paradasRef =   firestore.collection("paradas") 
export const getData = async(array) => {
 return Promise.all( array.map(async (dato)=>{
   var jsonParada = {numero:dato, lineas:[], todo:[]}

   var indice = dato.indexOf(':')
   if (indice>-1)
   {
     jsonParada.numero=dato.substring(0,indice)
     jsonParada.lineas = dato.substring(indice+1).split('-')
   }
   
   let todo =await  paradasRef.where("NODO", "==", parseInt(jsonParada.numero)).get()
   .then(snapshot => {
     if (snapshot.empty) {
       console.log('No matching documents.');
       return [];
     }
  
     var lineas = []
   
     snapshot.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data());
      // jsonParada.todo.push(doc.data().LINEA)
       lineas.push({
         nombre:doc.data()['NOMBRE PARADA'],
         linea: doc.data().LINEA})
      });

      return lineas
     
   })
   .catch(err => {
     console.log('Error getting documents', err);
   });
   jsonParada = 
   {
     numero : jsonParada.numero,
     lineas : jsonParada.lineas,
     todo : todo
   }

  return jsonParada
 }))
}

export const  getParadas = async(linea)=>
{
    return Promise.all ( 
    await paradasRef.where("LINEA", "==", linea).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
      }
      var lineas = []
   
      snapshot.forEach(doc => {
     //   console.log(doc.id, '=>', doc.data());
       // jsonParada.todo.push(doc.data().LINEA)
        let nombre = doc.data()['NOMBRE PARADA']
        let key = doc.data()['NODO']
        let destino = doc.data()['DESTINO SECCIÓN']
        let dato = {
            nombre:nombre,
            key:key,
            destino:destino
         }
        lineas.push(dato)});
 
       return lineas
      
    })
    .catch(err => {
      console.log('Error getting documents', err);
    })
    
  
    )
}
// export const  getDatosUser = async(user)=>
// {
  

//     return Promise.all ( 
//     await usersRef.where("LINEA", "==", linea).get()
//     .then(snapshot => {
//       if (snapshot.empty) {
//         console.log('No matching documents.');
//         return [];
//       }
//       var lineas = []
   
//       snapshot.forEach(doc => {
//      //   console.log(doc.id, '=>', doc.data());
//        // jsonParada.todo.push(doc.data().LINEA)
//         let nombre = doc.data()['NOMBRE PARADA']
//         let key = doc.data()['NODO']
//         let destino = doc.data()['DESTINO SECCIÓN']
//         let dato = {
//             nombre:nombre,
//             key:key,
//             destino:destino
//          }
//         lineas.push(dato)});
 
//        return lineas
      
//     })
//     .catch(err => {
//       console.log('Error getting documents', err);
//     })
    
  
//     )
// }

