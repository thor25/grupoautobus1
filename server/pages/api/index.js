
const urlBase = "http://94.198.88.152:9005/INFOTUS/API/"

const headers = {
  
  //headers.append('Content-Type', 'text/json');
  'Authorization': 'Basic aW5mb3R1cy11c2VybW9iaWxlOmluZm90dXMtdXNlcm1vYmlsZQ==',
  "content-type": "application/json",
  "deviceid": "0b525b54-dcc5-11ea-87d0-0242ac130003",
  "cache-control": "no-cache"
  }



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
  
  

 
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hola desde el servidor personalizado!"}');
  });

  

 
  
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
   await prueba()

   // dp = await GestorLlamadasParadas(req)      
  //  res.set('Content-Type', 'application/json');
  //  res.send(dp)   
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

 
 
  
 



 async function prueba() {
 console.log("prueba")
 var db = firebaseInit();
 const username = process.env.NEXT_PUBLIC_DB_USERNAME
 console.log(process.env)
 console.log("🚀 ~ file: index.js ~ line 562 ~ prueba ~ username", username)
 const password = process.env.DB_PASSWORD
 console.log("🚀 ~ file: index.js ~ line 564 ~ prueba ~ process.env.DB_USERNAME", process.env.DB_USERNAME)
 await authentication
 .signIn(process.env.DB_USERNAME, process.env.DB_PASSWORD)
 .then((user) => {
 console.log("🚀 ~ file: index.js ~ line 563 ~ .then ~ user", user)
 }).catch((reason) => {
   const code = reason.code;
   console.log("🚀 ~ file: index.js ~ line 570 ~ prueba ~ code", code)
   const message = reason.message;
   console.log("🚀 ~ file: index.js ~ line 570 ~ prueba ~ message", message)
})
 .finally(() => {
  console.log('finally')
})

 
}
