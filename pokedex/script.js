// Obtenemos los elementos del DOM por sus IDs
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('btn-search');
const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonNumber = document.getElementById('pokemon-number');
const pokemonHeight = document.getElementById('pokemon-height');
const pokemonWeight = document.getElementById('pokemon-weight');
const pokemonType = document.getElementById('pokemon-type')
const switchButton = document.getElementById('btn-switch');
const pokemonStats = document.getElementById('pokemon-stats')


let isDefaultSprite = true;

// Variable para almacenar la URL original de la imagen
let originalImageUrl;


searchButton.addEventListener('click', () => {
  const pokemonId = searchInput.value.toLowerCase();
  // Llamamos a la función fetchPokemonData para obtener los datos del Pokémon
  fetchPokemonData(pokemonId);
});

// Asignamos un evento de clic al botón de cambio
switchButton.addEventListener('click', () => {
    // Verificamos si la bandera es true o false
    if (isDefaultSprite) {
      // Si es true, cambiamos la imagen del Pokémon a sprites.front_shiny
      pokemonImage.src = pokemonImage.src.replace('/pokemon/', '/pokemon/shiny/');
      isDefaultSprite = false;
    } else {
      // Si es false, cambiamos la imagen del Pokémon a sprites.front_default
      pokemonImage.src = pokemonImage.src.replace('/pokemon/shiny/', '/pokemon/');
      isDefaultSprite = true;
    }
  });


function fetchPokemonData(pokemonId) {
  // Realizamos una petición fetch a la API de Pokémon
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('No se pudo obtener la información del Pokémon.');
      }
    })
    .then(data => {
      pokemonName.textContent = data.name.toUpperCase();
      pokemonImage.src = data.sprites.front_default;
      // Almacenamos la URL original de la imagen en la variable originalImageUrl
      originalImageUrl = data.sprites.front_default;
      // Obtenemos los tipos de Pokémon y los concatenamos en un string separado por comas
      const types = data.types.map(type => type.type.name).join(', ');
      pokemonType.textContent = `Tipo: ${types}`;
      pokemonNumber.textContent = `Número: ${data.id}`;
      pokemonHeight.textContent = `Altura: ${data.height / 10} m`;
      pokemonWeight.textContent = `Peso: ${data.weight / 10} kg`;

      // Actualizamos los stats del Pokémon
      pokemonStats.innerHTML = 'Estadísticas: <br>';
        data.stats.forEach(stat => {
            let nombreStat;
            switch (stat.stat.name) {
            case 'hp':
                nombreStat = 'PS';
                break;
            case 'attack':
                nombreStat = 'Ataque';
                break;
            case 'defense':
                nombreStat = 'Defensa';
                break;
            case 'special-attack':
                nombreStat = 'Ataque Especial';
                break;
            case 'special-defense':
                nombreStat = 'Defensa Especial';
                break;
            case 'speed':
                nombreStat = 'Velocidad';
                break;
            default:
            nombreStat = stat.stat.name;
  }
    pokemonStats.innerHTML += `${nombreStat}: ${stat.base_stat}<br>`; // Mostramos cada stat con su nombre y valor base en español
});
      
    })

    .catch(error => {
        // Si ocurre algún error durante la petición, mostrar un mensaje de error
          showError('Ha ocurrido un error al buscar el Pokémon');
          console.error(error);
    });
}
