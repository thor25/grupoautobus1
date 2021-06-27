export default async function handler(req, res) {
    await firebaseInit();
  
    res.status(200).json({ datos: grupos })
  }

 