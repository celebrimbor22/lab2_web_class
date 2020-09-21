$("ul").on("click",".remove-pokemon",remove_item_f);
let total1=0;
let list_item = document.getElementById("list_pokemon");

let get_element_li  = (name, price, image) => {
  return `<li class="added-pokemon">name: ${name} weight: <div class="weight">
   ${price}</div><img src=${image} alt="pokemon"> <button class="remove-pokemon">remove</button></li>`
}

let catchable_handle_for_the_error_of_the_pokemon_request = (err) => {
  //handle here the pokemon error from the request
  alert('ERROR!!! pokemon not found ');
}

function remove_item_f(e){
  //e.preventDefault();
  $(this).parent().remove();
  sum();
}

let get_pokemon_data = (nameP) => {
  return new Promise((resolve, reject) => {
    // add the logic of the request here
    let responde  = new XMLHttpRequest();
    responde.open("GET", `https://pokeapi.co/api/v2/pokemon/${nameP}`, true);

    responde.onreadystatechange = (req_event) =>{
      if(responde.readyState == 4){
        if(responde.status == 200){
            return resolve(responde.response);
        }else{
          return reject(responde.reject);
        }
      }
    };
      responde.send(null);
  });
};

function get_pokemon(nameP){
  let promise = (result) =>{
    //recojemos lo que se pide
    result = JSON.parse(result);
    let weight = result.weight;
    let imga = result.sprites.front_default;
    datos = get_element_li(nameP,weight,imga);
    let acumulado = list_item.innerHTML;
    list_item.innerHTML = acumulado + datos;
    //total1 = total1 + parseFloat(weight);
    sum();
    return result
    //regresa la promesa
  };
  get_pokemon_data(nameP).then(promise).catch((err) =>{
    catchable_handle_for_the_error_of_the_pokemon_request(false);
    return err;
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById('add-item').addEventListener("click", (event) => {
    nameOfPok = document.getElementById('pokemon-name').value.trim().toLowerCase();
    get_pokemon(nameOfPok, get_pokemon_data);
  });
});

function sum(){
  $(".weight").each(function(){
    total1 += parseFloat($(this).text());
  })
  $("#total").replaceWith('<div id="total" >Total: '+total1+'</div>');
  total1 =0;
}


