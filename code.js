/*this is one template function that can be passed to add_item_to_list_with_template
  and add the remove event of the button
  or you can create another template function wich create a dom element like
  Document.createElement() and add the event to that element
  https://developer.mozilla.org/es/docs/Web/API/Document/createElement
*/
$("ul").on("click",".remove-pokemon",remove_item_f);

let get_element_li  = (name, price) => {
  return `<li class="added-pokemon">name: ${name} <div class="weight">weight:
   ${price} </div> <button class="remove-pokemon">remove</button></li>`
}

// let add_item_to_list_with_template = (template_function) => {
//   return (event) => {

//   }
// }
/*
 for removing elements could be this way
  let element_to_delete = document.querySelector("selector").lastElementChild;
  element_to_delete.parentNode.removeChild(element_to_delete);
  or we could use ChildNode.remove()
  https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
*/
// let remove_element_event = (event) => {
//   // check which dom element triggered the event of remove, that is in event
//   let remove_item  = (node_to_remove) => {
//     // add the remove logic here
//   }
// }

// let thenable_handle_for_the_result_of_the_pokemon_request = (result) => {
//   //handle here the pokemon from the

// }

let catchable_handle_for_the_error_of_the_pokemon_request = (err) => {
  //handle here the pokemon error from the request
  alert('ERROR!!! pokemon not found ');
}

function remove_item_f(e){
  //e.preventDefault();

  $(this).parent().remove();
  //sum();
}

/*
  for this it can be solved by adding a custom XMLHttpRequest but i don't recomend it, try to
  use other libs that basically solve this, an alternative you can use axios
  https://www.npmjs.com/package/axios
*/
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
    console.log('found pokemon');
    let weight = result.weight;
    let img = result.sprites.front_default;
    console.log(weight);
    let datos = get_element_li(nameP,weight);
    console.log(datos);
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
