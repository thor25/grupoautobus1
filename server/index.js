const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;


 

const urlBase = "http://94.198.88.152:9005/INFOTUS/API/"

const headers = {
  
  //headers.append('Content-Type', 'text/json');
  'Authorization': 'Basic aW5mb3R1cy11c2VybW9iaWxlOmluZm90dXMtdXNlcm1vYmlsZQ==',
  "content-type": "application/json",
  "deviceid": "0b525b54-dcc5-11ea-87d0-0242ac130003",
  "cache-control": "no-cache"
  }

const bodyParser = require('body-parser');

var async  = require('express-async-await')
var fetch = require('node-fetch')
var {LocalStorage} = require('node-localstorage')

var  { firebaseInit } = require('../server/db/firestore.init')
localStorage = new LocalStorage('./paradas')
var paradas = []
var datosPrueba = [
{
id : "1",
nombreGeneral:"mañana",
nombreSubGrupo1: "Salida de casa",
paradasSubGrupo1:"253,786:C3,47", 
nombreSubGrupo2: "Llegada Prado",
paradasSubGrupo2:"987,916,3007,908,918",
nombreSubGrupo3: "Trinidad",
paradasSubGrupo3:"21,786:C3"
},

{
 id : "2",
 nombreGeneral:"Salida",
 nombreSubGrupo1: "San Bernardo",
 paradasSubGrupo1:"472,68:01,984:C1-LE,3009,917", 
 nombreSubGrupo2: "Bazar",
 paradasSubGrupo2:"917,23,71",
 nombreSubGrupo3: "",
 paradasSubGrupo3:""
 },
 {
  id : "3",
  nombreGeneral:"Trinidad",
  nombreSubGrupo1: "Trinidad",
  paradasSubGrupo1:"21,786", 
  nombreSubGrupo2: "",
  paradasSubGrupo2:"",
  nombreSubGrupo3: "",
  paradasSubGrupo3:""
  }
] 
var tiempo =[
  {"codigo":"47","descripcion":"Madreselva","linea":"01","color":"#f54129","tiempo1":"4","tiempo2":"20","orden":-1996},
  {"codigo":"47","descripcion":"Madreselva","linea":"11","color":"#000d6f","tiempo1":"5","tiempo2":"25","orden":-1995},
  {"codigo":"47","descripcion":"Madreselva","linea":"12","color":"#000d6f","tiempo1":"9","tiempo2":"21","orden":-1991},
  {"codigo":"47","descripcion":"Madreselva","linea":"16","color":"#000d6f","tiempo1":"-30","tiempo2":"-99","orden":-1000},
  {"codigo":"253","descripcion":"Trabaj. Inmigrantes (Los Romeros)","linea":"01","color":"#f54129","tiempo1":"3","tiempo2":"19","orden":3}
]
// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  var borrar = true
  async function GestorLlamadasParadas(request)
  {
    if (1!==1)
    { 
     var datos0 = []
     datos0.push(datosPrueba[0])
     datos0.push(datosPrueba[1]) 
     datos0.push(datosPrueba[2])            
     setItem("datos",JSON.stringify(datos0))   
     console.log("Rellena datos") 
    borrar = false;
   }
     console.log("GestorLlamadas")
    var tipo = request.method;
    var postData;   
    var ids = request.url.split('/');
    var s = getItem("datos")
    
    //// var  datos0 = await store.get('datos')
    const datos = JSON.parse(s );    
    switch(tipo)
    {
        case 'GET':
          // console.log("get-bridge")
          break;
        case 'PUT':
        case 'POST':
          console.log("post-bridge")
          //var postData = JSON.parse(request.body) ; 
          var postData = request.body
          if (ids.length>2)
            {
            // console.log("post-put-bridge")
              for (var i=0; i < datos.length; i++)
              {
                  if (datos[i].id === ids[2])
                  {
                      datos[i]=postData;             
                      break;
                  }
            }
            
          }
          else
          {
            console.log("post-post-bridge")
            const {datos} = postData
            console.log(postData,"datos", datos)
            
            //  const { id, nombreGeneral, nombreSubGrupo1, paradasSubGrupo1,nombreSubGrupo2, paradasSubGrupo2,nombreSubGrupo3, paradasSubGrupo3 } = postData;
            //  const cliente = {id, nombreGeneral, nombreSubGrupo1, paradasSubGrupo1,nombreSubGrupo2, paradasSubGrupo2, nombreSubGrupo3, paradasSubGrupo3 }
   
            // var datos0 = datos[datos.length-1]
            // var id0 = parseInt( datos0.id,10)+1;
            // var s = id0.toString();
            // cliente.id = s;
            // datos.push(cliente)        
          }
           setItem("datos",JSON.stringify(postData))
          break;
        case 'DELETE':
          // console.log("del-bridge");
          for (var i=0; i < datos.length; i++)
          if (datos[i].id === ids[2])
          {
            datos.splice(i,1)       
            break;
          }
          setItem("datos",JSON.stringify(datos))
          break;
    };
   // console.log(datos)
    return JSON.stringify(datos);
    
  }
  // async function getDatosParadas(node)
  // {
  //   console.log('get datos', node)
  //   let url ="http://94.198.88.152:9005/INFOTUS/API/tiempos/" 
    
  //     await fetch(url+node, {
  //       method: 'get',
  //       headers: headers,
  //     })      
  //       .then(response => response.json())
  //       .then(data => {
  //        if (data!=null)
  //        {
  //       console.log (data)
  //        }
  //       }
  //       )
  //     }
  

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

  async function post(request)
  {
    //  let url = "http://www.infobustussam.com:9005/InfoTusWS/services/InfoTus?WSDL";
    let url =urlBase+"tiempos/"
    
    jsParadas=[]       
    var valores  = request.body
    var paradas = valores.parada.split(',');
   
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

  const setItem =  (key,value) => {
 
    try {
      
       localStorage.setItem(key, value)
    } catch(e) {
      console.error(e)
      // save error
    }
  
    // console.log('Done.Set ITem')
  }

const getItem =  (key) => {
  let valor;
    try {
      valor =  localStorage.getItem(key)
    } catch(e) {
      console.error(e)
      // read error
    }
  
    // console.log('Done.GetItem')
    return valor;
  }
 
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hola desde el servidor personalizado!"}');
  });

  app.get('/users', function (req, res) {
    console.log("get-users")
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hola. Se ha accedido a users"}');
   
});

  app.get('/times', function (req, res) {
    // CallTussam(); Se incorpora al final . Funciona fetch
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hola. Se ha accedido a times!"}');
  });
  app.get('/nodoslinea', async function (req,res)
  {
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
    res.set('Content-Type', 'application/json');
    res.send(valor);
  })

  app.get('/lineas', async function  (req, res) {
    // CallTussam(); Se incorpora al final . Funciona fetch
    var valor  = [];
    await fetch(urlBase+"lineas/todas", {
      method: 'get',
      headers: headers,
      //   credentials: 'infotus-usermobile:2infotus0user1mobile2'
    })      
      .then(response => response.json())
      .then(data => {
       if (data!=null)
       {
       //  console.log(data)
         //var valores = data.lineasDisponibles;
         data.forEach(dato=>{
           valor.push({'key':dato.linea,'nombre':dato.labelLinea + ".-"  + dato.descripcion.texto})
         })     
       }
      }
      ).catch(function (e) {
        //  alert("error en datos de tussam")
         console.error(e);
       });
    console.log("valor",valor)
    res.set('Content-Type', 'application/json');
    res.send(valor);
  });

  app.get('/paradas', async (req, res) =>{
    // CallTussam(); Se incorpora al final . Funciona fetch
    console.log("paradas-get")   

    dp = await GestorLlamadasParadas(req)      
    res.set('Content-Type', 'application/json');
    res.send(dp)   
    // res.send('{"message":"Hola. Se ha accedido a times!"}');
  });
  app.post('/paradas', async (req, res) =>{
    // CallTussam(); Se incorpora al final . Funciona fetch
    console.log("post-paradas")   

    dp = await GestorLlamadasParadas(req)      
    res.set('Content-Type', 'application/json');
    res.send(dp)   
    // res.send('{"message":"Hola. Se ha accedido a times!"}');
  });

  app.post('/users', async (req, res) =>
  {
    console.log("users-post")
    var id = req.body.params
    // if (isDev===true)
    // {
    //   var valor=JSON.stringify(tiempo)
     
    // }
    // else
     var  valor =await  post(req)
    
    // console.log(valor)
    res.set('Content-Type', 'application/json');
   
    res.send(JSON.parse(valor));
  }  );

  app.post('/times', function (req, res)
  {
    // req.body para acceder a los datos
    res.set('Content-Type', 'application/json');
    res.send('{"message":'+
     `"Hola. Se ha accedido a times mediante post! valores:id:${req.body.id}, nombre: ${req.body.nombre}"}`);
  }  );
  app.get("/service-worker.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../react-ui/build", "service-worker.js"));
  });
  
  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {   
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });
  
  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
Home.getInitialProps = async function(router) {
  console.log(router.query.name);
  const queryText = router.query.name;
  const db = await firebaseInit();
  let data = [];
  const querySnapshot = await db
    .firestore()
    .collection("user")
    .where("name", "==", queryText)
    .get();
  querySnapshot.forEach(doc => {
    data.push(doc.data());
  });
  return { user: data.length ? data[0] : {} };
};