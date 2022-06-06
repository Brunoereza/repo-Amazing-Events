var arreglo = data.eventos
console.log(arreglo)


function getData(){
    var id= 1 //creamos una variable para que las cartas tambien tengan id
    data.eventos.map(evento=>evento.id=id++)
    var id=location.search.split("?id=").filter(Number)
    var selectId= Number(id[0])
    var varE=data.eventos.find((text)=> {
        return text.id == selectId
    })
    var templateDetails= `<div class=" d-flex justify-content-center align-items-center p-4 card mb-3" style="max-width: 800px; height: 350px;">
        <div class="row align-items-center justify-content-center" style="width:100% ; height:100% ;" >
          <div class="col-md-4" style="width:350px ; height:200px ;" >
            <img src=${varE.image} class="img-fluid rounded-start" alt="..." style=" width: 350px; height: 200px; " >
          </div>
          <div class="col-md-8" style="width:50% ; height:80% ;" >
            <div class="card-body">
            <h5 class="card-title">${varE.name}</h5>
            <ul>
              <li>${varE.date}</li>
              <li>${varE.description}</li>
              <li>${varE.category}</li>
              <li>${varE.place}</li>
              <li>${varE.capacity}</li>
              <li>${varE.assistance}</li>
              <li>$${varE.price}</li>
            </ul>      

            </div>
          </div>
        </div>
      </div>`
    document.querySelector('#mainDitails').innerHTML = templateDetails
}
getData()

