var pokemonRepository = (function() {
  var repository = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Ivysaur", height: 0.9, types: ["grass", "poison"] },
    { name: "Venusaur", height: 1.8, types: ["grass", "poison"] },
    { name: "Charmander", height: 0.6, types: ["fire"] },
    { name: "Charmeleon", height: 0.9, types: ["fire"] },
    { name: "Charizard", height: 1.5, types: ["fire", "flying"] },
    { name: "Squirtle", height: 0.3, types: ["water"] },
    { name: "Wartortle", height: 0.9, types: ["water"] }
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon = {}) {
    var pokemonList = document.querySelector(".pokemon-list");
    var $listItem = document.createElement("li");
    var button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("my-class");
    $listItem.appendChild(button);
    pokemonList.appendChild($listItem);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: " ", height: "", types: [] });
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(i) {
  var size;
  if (i.height > 1) {
    size = "Wow, that's big!";
  } else if (i.height < 1) {
    size = "not big";
  }

  var result;
  i.types.forEach(function(typeItem) {
    if (typeItem == "grass") {
      result = '<span style="color:green;"> ';
    } else if (typeItem == "fire") {
      result = '<span style="color:red;"> ';
    } else if (typeItem == "poison") {
      result = '<span style="color:purple;"> ';
    } else if (typeItem == "flying") {
      result = '<span style="color:brown;"> ';
    } else if (typeItem == "water") {
      result = '<span style="color:blue;"> ';
    }
  });

  pokemonRepository.addListItem(i);
});
