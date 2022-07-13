const petContainer = document.getElementById("petsContainer");

async function mostrarMascotas() {
  try {
    await fetch("https://api.thedogapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => crearMascotas(data));
  } catch (error) {
    console.log("Ha ocurrido un error");
  }
}
mostrarMascotas();

function crearMascotas(data) {
  data.forEach((element) => {
    const card = document.createElement("div");
    card.className = "cardPets";
    card.innerHTML = `
            <img src="${element.image["url"]}" alt"picture"
            <div>
                <h6>${element.name}</h6>
                <p>${element.breed_group}</p>
            </div>`;
    petContainer.appendChild(card);
  });
}
