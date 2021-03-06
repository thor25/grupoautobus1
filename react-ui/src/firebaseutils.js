
import firebase, { analytics, auth, firestore, storage } from "./firebase";


export const Firestore = firebase.firestore();
const FieldValue = firebase.firestore.FieldValue

const usersRef = firestore.collection('users')
export const  AddGrupo =async  (id, valor) =>
{
  console.log("field", FieldValue)

const user = usersRef.doc('CyeUsqDYiqZqc3Rex83NseHsJli2')
console.log ("firestore - user", usersRef, user, id, valor) 
console.log(FieldValue)
const unionRes = await user.update({
    datos: firebase.firestore.FieldValue.arrayUnion(valor)
  });
  console.log(unionRes)
}