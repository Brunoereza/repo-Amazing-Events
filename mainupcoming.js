var impresion = document.querySelector("#mainCards")
var data = localStorage.getItem('data')
data = JSON.parse(data)
var arreglo = data.events
var fechaActual= data.currentDate
var upcomingEvents= data.events.filter(upcoming=> fechaActual<upcoming.date)
console.log(fechaActual)
console.log(upcomingEvents)
//Creacion de checkbox
//Cree la variable "category", traje el data y el array y con la funcion de orden superior traje un nuevo array con los elementos que le pedi(14 categorias, las cuales estaban repetidas)
var category= upcomingEvents.map(evento =>evento.category)
console.log(category)
var categorySinRepetir= new Set(category) //Cree una nueva variable para guardar las categorias unicas de mi anterior variable utilizando el "new Set" para eliminar las repetidas
console.log(categorySinRepetir)
var categoryDefinitiva = [...categorySinRepetir]// Cree mi variable definitiva y la converti en un array(porque al utilizar el new Set en la variable anterior, este la convirtio en un objeto) con los tres puntos llamas el contenido de la anterior variable
console.log(categoryDefinitiva)

//creacion de la funcion
function displayCategory(){ //declare la funcion y le di un nombre
    var templateHtml = "" //declare una variable sin valor, para luedo desarrollar lo que va ir conteniendo esa variable
    categoryDefinitiva.forEach(category=> {//Llame la variable categoryDefinitiva y le aplique un forEach(este mismo recorre el array hatsa que vos le indiques que tiene que devolver algo)
        templateHtml += ` 
        <div class="form-check">
        <input class="form-check-input checkBoxHome" type="checkbox" value="${category}">
        <label class="form-check-label">
          ${category} 
        </label>
      </div>
        `//Llame a la variable templateHtml
    }) //Con el category que esta dentro de esta funcion llame al elemento que necesitaba traer del array
    document.querySelector(`#checkBox`).innerHTML=templateHtml//Con document.querySelector llame al id checkBox que contiene al templateHtml para despues imprimirlo con innerHTML en el html  
    var id=1
    arreglo.map(evento=> evento.id = id++)
    console.log(arreglo)
} 
displayCategory() //Llamo la funcion

var escuchadorCheck = [] //Creo la variable y le di un valor de un array sin contenido para despues guardar los datos en ese array 
var check = document.querySelectorAll(".checkBoxHome") //Cree una nueva variable con la que llame a la class "checkBoxHome"(representa al input)
check.forEach(elemento => elemento.addEventListener("click",(e)=>{ //e=parametro 
    
    if(e.target.checked){//Con el if busque que al utilizar el parametro e("click") salte la palabra true en la consola
        escuchadorCheck.push(e.target.value)//Con el metodo "push" empujo el value obtenido del true (a traves del "click") dentro del array escuchadorCheck
       
    } else{
        escuchadorCheck= escuchadorCheck.filter(noCheckeado=> noCheckeado !== e.target.value)//Llamo a la variable escuchadorCheck para aplicarle el metodo filter este se encarga de filtrar los input que no estan checkeados         
    }

    //Llamo a la variable "check" le aplico el forEach para recorrer el array de cada elemento que cumpla el evento ("click") 
    //Aca va funcion de filtrado 
    filtroCombinado()  
}))

var searchEscuchador = "" //Creo la variable searchEscuchador sin ningun valor para inicializar de 0
var search = document.getElementById("search") //creo una nueva variable denominada "search" para llamar al id con document.getElementById
search.addEventListener("keyup", (e)=>{//Llamo a la variable search para aplicarle el escuchador keyup(se dispara cuando soltas una tecla del keyboard)
    searchEscuchador = e.target.value//Llamo a la variable searchEscuchador para aplicarle el value con el parametro (e) del keyup
//Aca va funcion de filtrado
filtroCombinado()
})

function filtroCombinado(){//Creo la funcion para filtrar el checkbox y el search juntos, esta no necesita de parametros porque va trabjar con parametro ya establecidos
    var contenedorFiltro = []
    //Quiero que el if filtre de manera combinada el seacrhe y los checkbox los arrays pasados
    if(escuchadorCheck.length>0 && searchEscuchador !== ""){
        escuchadorCheck.map(checking=>{contenedorFiltro.push(...upcomingEvents.filter(searching=>searching.name.toLowerCase().startsWith(searchEscuchador.toLowerCase().trim())
        && searching.category == checking))})
    }else if(escuchadorCheck.length>0 && searchEscuchador===""){
        escuchadorCheck.map(checking=>{contenedorFiltro.push(...upcomingEvents.filter(searching=>searching.category===checking))})
    }else if(searchEscuchador !=="" && escuchadorCheck.length===0){
        contenedorFiltro.push(...upcomingEvents.filter(searching=>searching.name.toLowerCase().startsWith(searchEscuchador.toLowerCase().trim())))
    }else{
        contenedorFiltro.push(...upcomingEvents)
    }
    displayCardEvents(contenedorFiltro, impresion)
    console.log(contenedorFiltro)
}
filtroCombinado()

function displayCardEvents(array, template){
    template.innerHTML = "";
    
        for (var i = 0; i < array.length; i++) {
            
            template.innerHTML += `    
            <div class="card" style="width: 18rem;">
            <img class="imgcard" src="${array[i].image}">
            <div class="card-body">
            </div>
            <div class="dataCard">
            <h2>${array[i].name}</h2>
                <p>Description:${array[i].description}</p>
                <p>Price:$${array[i].price}</p>     
                <a href="./cards.html?id=${array[i].id}" class="btn btn-primary">Ver Más</a>
            </div>
            </div>
            `   
        }
        
    }
    