const urlBase = "http://94.198.88.152:9005/INFOTUS/API/"

const headers = {
  
    //headers.append('Content-Type', 'text/json');
    'Authorization': 'Basic aW5mb3R1cy11c2VybW9iaWxlOmluZm90dXMtdXNlcm1vYmlsZQ==',
    "content-type": "application/json",
    "deviceid": "0b525b54-dcc5-11ea-87d0-0242ac130003",
    "cache-control": "no-cache"
    }
  
export default async function handler(req, res) {
    console.log(req.query)
    var linea = req.query.linea
    var sentido = 1
    var url = `${urlBase}nodosLinea/${linea}?sentido=${sentido}`
    var valor  = {"linea":linea,"sentido":[]};

    console.log(url)
    await fetch( `${urlBase}nodosLinea/${linea}?sentido=${sentido}`, {
      method: 'get',
      headers: headers,
      //   credentials: 'infotus-usermobile:2infotus0user1mobile2'
    })      
      .then(response => response.json())
      .then(data => {
       if (data!=null)
       {
         valor.sentido.push({"paradas":[]})
        //console.log(data)
         data.forEach(dato=>{
           valor.sentido[0].paradas.push({'codigo':dato.codigo,'descripcion':dato.descripcion.texto})
         })
          
       }
      }
      ).catch(function (e) {
        //  alert("error en datos de tussam")
         console.error(e);
       });
       sentido = 2
       console.log( `${urlBase}nodosLinea/${linea}?sentido=${sentido}`)
       await fetch( `${urlBase}nodosLinea/${linea}?sentido=${sentido}`, {
         method: 'get',
         headers: headers,
         //   credentials: 'infotus-usermobile:2infotus0user1mobile2'
       })      
         .then(response => response.json())
         .then(data => {
          if (data!=null)
          {
            if (data!=null)
       {
         valor.sentido.push({"paradas":[]})
        //console.log(data)
         data.forEach(dato=>{
           valor.sentido[1].paradas.push({'codigo':dato.codigo,'descripcion':dato.descripcion.texto})
         })
          
       }
             
          }
         }
         ).catch(function (e) {
           //  alert("error en datos de tussam")
            console.error(e);
          });
    console.log("valor",valor)
    res.status(200).json({ datos: valor })

  }