
let formulario=document.querySelector(".formulario");
let nombre=document.querySelector(".nombre");
let apellido=document.querySelector(".apellido");
let producto=document.querySelector(".producto");
let precio=document.querySelector(".precio");
let descuento=document.querySelector(".descuento");
let grupo_tarea=document.querySelector(".grupo-tarea");
let salida=document.querySelector(".salida");

let objeto={};
let arreglo=[];
let contarId=0;

function recogerDatos(){
   let Nombre=nombre.value;
       Nombre=Nombre.toUpperCase()
   let Apellido=apellido.value;
       Apellido=Apellido.toUpperCase()
   let Producto=producto.value;
       Producto=Producto.toUpperCase()
   let Precio=precio.value;
   let Descuento=descuento.value;
       Precio=parseInt(Precio)
       Descuento=parseInt(Descuento)
   let preD=Descuento*Precio/100;
   let preF=Precio-preD;
//    let descuentoAp=
   crearObjeto(Nombre,Apellido,Producto,Precio,Descuento,preF,preD)

}
function crearObjeto(nom,apel,prod,prec,desc,preF,ahor){
    contarId++
    objeto={
        id:contarId,
        nombre:nom,
        apellido:apel,
        producto:prod,
        precio:prec,
        descuento:desc,
        precioFinal:preF,
        ahorro:ahor
    }
    arreglo.push(objeto)
    // console.log(arreglo)
}
function grabarDB(){
    localStorage.setItem("tienda",JSON.stringify(arreglo))
    localStorage.setItem("contarId",contarId)
}
function crearhtml(){
        salida.innerHTML=""
    let arregloDB=JSON.parse(localStorage.getItem("tienda")).reverse()
    for(let a of arregloDB){
        salida.innerHTML+=`
        <div class="grupo-tarea" id="${a.id}">
        <h1>SuperMercado Eva</h1>
        <span>Factura No: ${a.id}</span>
        <p>VENDEDOR (a): <strong>${a.nombre} ${a.apellido}</strong>.</p>
        <p class="ver_tarea">NOMBRE DEL PRODÚCTO: <strong>${a.producto}</strong>.</p>
        <p class="estado">PRECIO ORIGINAL DEL PRODÚCTO: <strong>$ ${a.precio}</strong>.</p>
        <p>PRECIO FINAL DEL PRODÚCTO: <strong> $ ${a.precioFinal}</strong>.</p>
        <p>DESCUENTO APLICADO: <strong> ${a.descuento}%</strong>.</p>
        <p>USTED AHORRÓ: <strong>$ ${a.ahorro}</strong></p>
        <h4>Gracias por su compra, fue un placer atenderle le esperamos de nuevo..</h4>
        <button class="btn">Eliminar</button>
        </div>
        `;
    }
    if(arregloDB!=null){
        arreglo=arregloDB
    }
    if(arregloDB.length==0){
        contarId=0
    }

}
function mantenerId(){
    let Id=JSON.parse(localStorage.getItem("contarId"))
    if(Id!=null)
    contarId=Id;
    // localStorage.setItem("contarId",contarId)

}
function eliminar(miId){
    let arregloDB=JSON.parse(localStorage.getItem("tienda"))
    let nuevoArreglo=[]
    if(arregloDB!=null){
        for(let a of arregloDB){
            if(a.id!=miId){
                nuevoArreglo.push(a)
            }
        }
    }
    arreglo=nuevoArreglo
    localStorage.setItem("tienda",JSON.stringify(arreglo))
    crearhtml()
}
function mostrarMensaje(){
    document.querySelector(".mensajeOperacion").classList.toggle("verMensaje")
    setTimeout(()=>{
        document.querySelector(".mensajeOperacion").classList.remove("verMensaje")
    },4000)
}
function operarApp(){
    let nombreL= document.querySelector(".lNombre").style.color=="white";
    let apellidoL= document.querySelector(".lApellido").style.color=="white";
    let productoL= document.querySelector(".lProducto").style.color=="white";
    let precioL= document.querySelector(".lPrecio").style.color=="white";
    let descuentoL= document.querySelector(".lDescuento").style.color=="white";

    if(nombre.value!=""&&apellido.value!=""&&precio.value!=""&&producto.value!=""&&descuento.value!=""){
        if(nombreL&&apellidoL&&productoL&&precioL&&descuentoL){
            if(descuento.value>100){
                descuento.value=100
            }
        recogerDatos()
        grabarDB()
        crearhtml()
        exito()
    formulario.reset()

        }else{
    document.querySelector(".mensajeOpe").classList.remove("operacionExitosa")

           document.querySelector(".mensajeOpe").innerHTML="Error, posibles caracteres no permitidos o formulario incompleto." 
         mostrarMensaje()
        }  
    }else{
    document.querySelector(".mensajeOpe").classList.remove("operacionExitosa")

    document.querySelector(".mensajeOpe").innerHTML="Por favor no sea imbécil y complete el formulario." 
         mostrarMensaje()
    }
}
function exito(){
    document.querySelector(".mensajeOpe").classList.add("operacionExitosa")
    document.querySelector(".mensajeOpe").innerHTML="Operacion exitosa." 
    mostrarMensaje()
}

formulario.addEventListener("submit",e=>{
    e.preventDefault()
   operarApp()
})
salida.addEventListener("click",ee=>{
    // console.log(ee.path)

    ee.preventDefault()
    if(ee.target.className==="btn")
    // console.log(ee.path[1].id)
    eliminar(ee.path[1].id)
    crearhtml()
})
// *********************
function verificarNombre(){
let nombre=document.querySelector(".nombre").value;
    nombre=nombre.toLowerCase();
    let contar=0;
let permitir="qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM";
for(let n=0;n<nombre.length;n++){
    for(let p=0;p<permitir.length;p++){
        if(nombre[n]==permitir[p]){
            contar++
        }
    }
}
if(nombre.length==contar){
    document.querySelector(".lNombre").style.color="white";
}else{
    document.querySelector(".lNombre").style.color="red";
}
}

function verificarApellido(){
let apellido=document.querySelector(".apellido").value;
    apellido=apellido.toLowerCase();
    let contar=0;
let permitir="qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM";
for(let n=0;n<apellido.length;n++){
    for(let p=0;p<permitir.length;p++){
        if(apellido[n]==permitir[p]){
            contar++
        }
    }
}
if(apellido.length==contar){
    document.querySelector(".lApellido").style.color="white";
}else{
    document.querySelector(".lApellido").style.color="red";
}
}

function verificarProducto(){
let producto=document.querySelector(".producto").value;
    producto=producto.toLowerCase();
    let contar=0;
let permitir="qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM ";
for(let n=0;n<producto.length;n++){
    for(let p=0;p<permitir.length;p++){
        if(producto[n]==permitir[p]){
            contar++
        }
    }
}
if(producto.length==contar){
    document.querySelector(".lProducto").style.color="white";
}else{
    document.querySelector(".lProducto").style.color="red";
}
}
function verificarPrecio(){
let precio=document.querySelector(".precio").value;
    precio=precio.toLowerCase();
    let contar=0;
let permitir="0123456789";
for(let n=0;n<precio.length;n++){
    for(let p=0;p<permitir.length;p++){
        if(precio[n]==permitir[p]){
            contar++
        }
    }
}
if(precio.length==contar){
    document.querySelector(".lPrecio").style.color="white";
}else{
    document.querySelector(".lPrecio").style.color="red";
}
}
function verificarDescuento(){
let descuento=document.querySelector(".descuento").value;
    descuento=descuento.toLowerCase();
    let contar=0;
let permitir="0123456789";
for(let n=0;n<descuento.length;n++){
    for(let p=0;p<permitir.length;p++){
        if(descuento[n]==permitir[p]){
            contar++
        }
    }
}
if(descuento.length==contar){
    document.querySelector(".lDescuento").style.color="white";
}else{
    document.querySelector(".lDescuento").style.color="red";
}
}

document.addEventListener("keyup",function(){
    verificarNombre()
    verificarApellido()
    verificarProducto()
    verificarPrecio()
    verificarDescuento()
})



document.querySelector(".facturas").addEventListener("click",()=>{
    mostrarTexto()
    document.querySelector(".cajaSalida").classList.toggle("cerrarfacturas")
})
document.querySelector(".fa-circle-xmark").addEventListener("click",()=>{
    document.querySelector(".cajaSalida").classList.toggle("cerrarfacturas")
})
document.querySelector(".salida").addEventListener("click",(b)=>{
  if(b.target.className==="btn"){
     mostrarTexto()
      console.log("hola btn")
  }
})
function mostrarTexto(){
    let parrafo="No hay nada facturado.."
    if(document.querySelector(".salida").innerHTML==""){
        document.querySelector(".salida").innerHTML=`<p class="parra">${parrafo}</p>` 
    }
}
crearhtml()
mantenerId()