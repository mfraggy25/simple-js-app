var pokemonRepository = (function() {
  var repository = [];
  var $modalContainer = document.querySelector("#modal-container");
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  //Function to add new Pokemon data
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("add an object");
    }
  }
  //Function to pull all Pokemon data
  function getAll() {
    return repository;
  }
  //Function to add list for each pokemon object
  function addListItem(pokemon) {
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
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
    });
  }
  //Function to load pokemon list from API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = Object.keys(details.types);
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

function showModal(item) {
  // Clear all existing modal content
  $modalContainer.innerHTML = "";

  var modal = document.createElement("div");
  modal.classList.add("modal");

  // Add the new modal content
  var closeButtonElement = document.createElement("button");
  closeButtonElement.classList.add("modal-close");
  closeButtonElement.innerText = "Close";
  closeButtonElement.addEventListener("click", hideModal);

  var nameElement = document.createElement("h1");
  nameElement.innerText = item.name;

  var imageElement = document.createElement("img");
  imageElement.src = item.imageURL;
  imageElement.classList.add("modal-img");

  var heightElement = document.createElement("p");
  heightElement.innerText = item.height;

  var typesElement = document.createElement("p");
  typesElement.innerText = item.types;

  modal.appendChild(closeButtonElement);
  modal.appendChild(nameElement);
  modal.appendChild(imageElement);
  modal.appendChild(heightElement);
  modal.appendChild(typesElement);
  $modalContainer.appendChild(modal);

  $modalContainer.classList.add("is-visible");
}

function hideModal() {
  $modalContainer.classList.remove("is-visible");
}

document.querySelector("#show-modal").addEventListener("click", () => {
  showModal("Modal title", "This is the modal content!");
});

window.addEventListener("keydown", e => {
  if (e.key === "Escape" && $modalContainer.classList.contains("is-visible")) {
    hideModal();
  }
});

$modalContainer.addEventListener("click", e => {
  // Since this is also triggered when clicking INSIDE the modal container,
  // We only want to close if the user clicks directly on the overlay
  var target = e.target;
  if (target === $modalContainer) {
    hideModal();
  }
});

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
