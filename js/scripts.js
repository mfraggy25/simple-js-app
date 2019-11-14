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
    // Adds Pokemon name to text within button
    button.innerText = pokemon.name;
    // Adds a CSS class to button using classList.add method
    button.classList.add("my-class");
    // Adds the button element to the 'li'
    $listItem.appendChild(button);
    // Adds the 'li' to 'ul' with pokemonList class in index file
    pokemonList.appendChild($listItem);
    // Calls showDetails function when button is clicked
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  // Function to show details of each Pokemon
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
      showModal(pokemon);
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

  function showModal(item) {
    var $modalContainer = document.querySelector("#modal-container");
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
    imageElement.classList.add("modal-img");
    imageElement.setAttribute = ("src", item.imageURL);

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
    // Add class to show modal
    $modalContainer.classList.add("is-visible");
  }
  // Function to close the modal
  function hideModal() {
    var $modalContainer = document.querySelector("#modal-container");
    $modalContainer.classList.remove("is-visible");
  }
  // Press escape key to close modal
  window.addEventListener("keydown", e => {
    var $modalContainer = document.querySelector("#modal-container");
    if (
      e.key === "Escape" &&
      $modalContainer.classList.contains("is-visible")
    ) {
      hideModal();
    }
  });
  var $modalContainer = document.querySelector("#modal-container");
  $modalContainer.addEventListener("click", e => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

// forEach Used To cycle through addListItem function properties
pokemonRepository.loadList().then(function() {
  // Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
