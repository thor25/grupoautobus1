import { firebaseInit } from "../../db/firebase"
import {signIn} from "../../db/firestore.init"
export default async function handler(req, res) {
  await firebaseInit();
  var grupos = await signIn(process.env.DB_USERNAME,process.env.DB_PASSWORD)
  console.log("🚀 ~ file: hello.js ~ line 7 ~ handler ~ grupos", grupos)
  res.status(200).json(grupos)
}