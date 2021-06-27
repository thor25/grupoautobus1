
// import Cors from 'cors'
// import initMiddleware from '../../lib/init-middleware'

// // Initialize the cors middleware
// const cors = initMiddleware(
//   // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
//   Cors({
//     // Only allow requests with GET, POST and OPTIONS
//     methods: ['GET', 'POST', 'OPTIONS'],
//   })
// )


const urlBase = "http://94.198.88.152:9005/INFOTUS/API/"
var jsParadas = []
export default async function handler(req, res) {
 
 await post(req)  
     res.status(200).json(valor)
}

async function post(request)
{
  //  let url = "http://www.infobustussam.com:9005/InfoTusWS/services/InfoTus?WSDL";
  let url =urlBase+"tiempos/"
  
  jsParadas=[]       
  var valores  = request.body
  console.log("🚀 ~ file: users.js ~ line 30 ~ valores", valores)
  var paradas = valores.parada.split(',');
  console.log("🚀 ~ file: users.js ~ line 32 ~ paradas", paradas)
 
  switch(valores.params.tipo) {
    case 'orden':
          principal = ''
          break;
        
    case 'primera':
          principal= paradas[0]
          break;
  
    default:
            principal = valores.params.principal
          break;
}
//  console.log("paradas-bridge",valores.params.tipo,principal)
var idParadas ;
jsTotalLineas = []
for (var i = 0; i < paradas.length;i++)          
        idParadas = await callTussam(idParadas, paradas, i, url,parseInt(principal));
      
jsTotalLineas.sort(function (a, b) {
      if (a.orden > b.orden) {
        return 1;
      }
      if (a.orden < b.orden) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    var s1 = JSON.stringify(jsTotalLineas)     
    return s1;
}
async  function callTussam(idParadas, paradas, i, url,principal) {
    idParadas1 = paradas[i].split(':');
  
    idParadas = idParadas1[0]

    let headers = {
  
      //headers.append('Content-Type', 'text/json');
      'Authorization': 'Basic aW5mb3R1cy11c2VybW9iaWxlOmluZm90dXMtdXNlcm1vYmlsZQ==',
      "content-type": "application/json",
      "deviceid": "0b525b54-dcc5-11ea-87d0-0242ac130003",
      "cache-control": "no-cache"
      }

    // var st = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.infotusws.tussam.com/">' +
    //   '<soapenv:Header/>' +
    //   '<soapenv:Body>' +
    //   '<ser:getTiemposNodo>' +
    //   '<codigo>' + idParadas + '</codigo>' +
    //   '</ser:getTiemposNodo>' +
    //   '</soapenv:Body>' +
    //   '</soapenv:Envelope>';
   // console.log("url",url+idParadas)
     await fetch(url+idParadas, {
      method: 'get',
      headers: headers,
      //   credentials: 'infotus-usermobile:2infotus0user1mobile2'
    })      
      .then(response => response.json())
      .then(data => {
       if (data!=null)
       {

        console.log("principal:", principal)
        // console.log("lineas", data.lineasCoincidentes)
        // var lineas = data.lineasCoincidentes;
        // lineas.forEach( linea=>{
        //   console.log(linea.estimaciones[0],linea.estimaciones[1],linea.estimaciones[0].atributos)

        // })
        
        // var lineas = data.match(/<lineasCoincidentes>([^;]+)<\/lineasCoincidentes>/g)[0];
        // var lineas2 = lineas.split("<tiempoLinea>");
        // var codigo = data.match(/<codigo>([^;]+)<\/codigo>/)[1];
        // var descripcion = data.match(/<descripcion>([^;]+)<\/descripcion>/)[1];
        
        var lineas = data.lineasCoincidentes
        var codigo = data.codigo
        var descripcion = data.descripcion.texto
   //     console.log(codigo, descripcion, lineas)
        var js = {
          "id": codigo,
          "descripcion": descripcion,
          "lineas": []
        };
        var lineasTiempo=[];
        if (idParadas1.length>1)
       {
         lineasTiempo = idParadas1[1].split('-')
         console.log("lineasTiempo",lineasTiempo)
       }
        lineas.forEach(function (linea) {
          
            var label = linea.labelLinea;
            var estimacion1 = linea.estimaciones[0];
            var minutos1 = estimacion1.segundos!=undefined?parseInt(estimacion1.segundos/60):-100;
            var estimacion2 = linea.estimaciones[1];
            var minutos2 = estimacion2!=undefined?parseInt(estimacion2.segundos/60):-100;
            var color = linea.color;
            var  i = parseInt(minutos1);
            if (isNaN(i)) { i = 1000; }
            if (i<0) i = 1000;
           
            if (codigo===principal)
            {
               i= i - 2000
            }
            console.log("codigo:principal",codigo,principal,i)
            js1 = {
              "codigo":codigo,
              "descripcion":descripcion,
              "linea": label,
              "color": color,
              "tiempo1": minutos1,
              "tiempo2": minutos2,
              "orden":i
            };
          
            if (lineasTiempo.length===0)
            {
               js.lineas.push(js1);
               jsTotalLineas.push(js1)
            }
            else 
            {
            valor = lineasTiempo.includes(label) 
            console.log(valor,label)
               if (valor ){
                 js.lineas.push(js1);
                 jsTotalLineas.push(js1)
                }
              }
          
         
        }
       );
        js.lineas.sort(function (a, b) {
         var  i = parseInt(a.tiempo1);
         if (isNaN(i)) { i = 1000; }
         if (i<0) i = 1000;
         var  i1 = parseInt(b.tiempo1);
         if (isNaN(i1)) { i1 = 1000; }
         if (i1<0) i1=1000
         if (i > i1) {
           return 1;
         }
         if (i < i1) {
           return -1;
         }
         // a must be equal to b
         return 0;
       }); 
        
       // console.log("lineas", js, jsParadas) 
        jsParadas.push(js);
      }
     }).catch(function (e) {
       //  alert("error en datos de tussam")
        console.error(e);
      });
     
    return idParadas;
}

  