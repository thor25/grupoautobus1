
import firebase, { analytics, auth, firestore, storage } from "./firebase";


export const Firestore = firebase.firestore();
const FieldValue = firebase.firestore.FieldValue

const usersRef = firestore.collection('users')

export const ListGroup = async(id) =>
{
  console.log("List - BD",id)
  const user = usersRef.doc(id)
  const doc = await user.get();
  if (!doc.exists) {
    console.log('No such document!');
    return null;
  } else {
    console.log('Document data:', doc.data());
    return doc.data();
  }

}
export const EditGrupo = async(id,valorInicial,valorFinal) =>
  {
    console.log("Edit - BD". valorInicial,valorFinal)
    DeleteGrupo(id, valorInicial)
    AddGrupo(id,valorFinal)
  }

export const  AddGrupo =async  (id, valor) =>
{
  console.log("field", FieldValue)

const user = usersRef.doc(id)
console.log ("firestore - add : valor",  valor) 
const unionRes = await user.update({
    datos: firebase.firestore.FieldValue.arrayUnion(valor)
  });
  console.log("resultado add", unionRes)
}

export const  DeleteGrupo =async  (id, valor) =>
{
  console.log("field", FieldValue)

const user = usersRef.doc(id)
console.log ("firestore - delete", usersRef, user, id, valor) 
const unionRes = await user.update({
    datos: firebase.firestore.FieldValue.arrayRemove(valor)
  });
  console.log("resultado delete", unionRes)
}