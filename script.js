let currentPageUrl = 'https://rickandmortyapi.com/api/character';

window.onload = async () => {
  try {
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar cards');
  }

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextPage);

  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', loadPreviousPage);
};

async function loadCharacters(url) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // Limpa os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((character) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url(${character.image})`
      card.className = "cards"
      const characterNameBG = document.createElement("div")
      characterNameBG.className = "character-name-bg"
      const characterName = document.createElement("span")
      characterName.className = "character-name"
      characterName.innerText = `${character.name}`
      characterNameBG.appendChild(characterName)
      card.appendChild(characterNameBG)

      card.onclick = () => {
        const modal = document.getElementById("modal")
        modal.style.visibility = "visible"
        const modalContent = document.getElementById("modal-content")
        modalContent.innerHTML = ''

        const characterImage = document.createElement("div")
        characterImage.style.backgroundImage = `url(${character.image})}.jpg')`
        characterImage.className = "character-image"

        const name = document.createElement("span")
        name.className = "character-details"
        name.innerText = `Nome: ${character.name}`;

        const characterStatus = document.createElement("span")
        characterStatus.className = "character-details"
        characterStatus.innerText = `Status: ${convertStatus(character.status)}`;

        const species = document.createElement("span")
        species.className = "character-details"
        species.innerText = `Espécie: ${convertSpecies(character.species)}`;

        const gender = document.createElement("span")
        gender.className = "character-details"
        gender.innerText = `Genero: ${convertGender(character.gender)}`;

        const origin = document.createElement("span")
        origin.className = "character-details"
        origin.innerText = `origem: ${character.origin.name === "unknown" ? "desconhecida" : character.origin.name}`;

        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.appendChild(characterStatus);
        modalContent.appendChild(species);
        modalContent.appendChild(gender);
        modalContent.appendChild(origin);
      }
      const mainContent = document.getElementById('main-content');
      mainContent.appendChild(card);

    });

    // Habilita ou desabilita os botões de acordo com a presença de URLs de próxima e página anterior
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');
    nextButton.disabled = !responseJson.info.next;
    backButton.disabled = !responseJson.info.prev;

    backButton.style.visibility = responseJson.info.prev ? "visible" : "hidden";

    currentPageUrl = url;
  } catch (error) {
    throw new Error('Erro ao carregar personagens');
  }
}

function hideModal() {
  const modal = document.getElementById("modal")
  modal.style.visibility = "hidden"
}

function convertEyeColor(eyeColor) {
  const cores = {
    blue: "azul",
    brown: "castanho",
    green: "verde",
    yellow: "amarelo",
    black: "preto",
    pink: "rosa",
    red: "vermelho",
    orange: "laranja",
    hazel: "avela",
    unknown: "desconhecida"
  };

  return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertStatus(status) {
  const characterStatus = {
    alive: "vivo",
    dead: "morto",
    unknown: "desconhecida"
  };

  return characterStatus[status.toLowerCase()] || status;
}

function convertSpecies(specie) {
  const convertSpecies = {
    human: "humano",
    alien: "alienigena",
    humanoide: "humanoide",
    animal: "animal",
    "mytological creature": "criatura mitologica",
    desease: "doença",
    robot: "robo",
    unknown: "desconhecida"
  };

  return convertSpecies[specie.toLowerCase()] || specie;
}

function convertGender(gender) {
  const convertGender = {
    male: "macho",
    female: "femea",
    unknown: "desconhecida"
  };

  return convertGender[gender.toLowerCase()] || gender;
}


async function loadNextPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.info.next);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar a próxima página');
  }
}

async function loadPreviousPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.info.previous);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar a página anterior');
  }
}