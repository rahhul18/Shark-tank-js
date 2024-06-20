let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}

let alldata = [];

function fetchdata() {
  fetch("http://localhost:3000/pitches")
    .then((res) => res.json())
    .then((data) => {
      alldata = data;
      cardlist(data);
    })
    .catch((err) => console.log(err));
}
fetchdata();

function cardlist(data) {
  let total = `
    <div class="card-list">
    ${data
      .map((el) =>
        card(el.image, el.title, el.founder, el.category, el.price, el.id)
      )
      .join("")}
    
    </div>
    `;
  mainSection.innerHTML = total;
}

function card(image, title, founder, category, price, id) {
  let div = `
            <div class="card" data-id=${id}>
                <div class="card-img">
                  <img src=${image} alt="">
                </div>
                <div class="card-body">
                  <div class="card-title">${title}</div>
                  <div class="card-founder">Founder : ${founder}</div>
                  <div class="card-category">${category}</div>
                  <div class="card-price">${price}</div>
                  <a href="#" data-id=${id} class="card-link">Edit  </a>
                  <button data-id=${id} class="card-button">Delete</button>
                  <button data-id=${id} class="Add-cart-button">Add to card</button>
                </div>
              </div>
 `;
  return div;
}

// add pitch

pitchCreateBtn.addEventListener("click", () => {
  let singleproduct = {
    title: pitchTitleInput.value,
    price: pitchPriceInput.value,
    founder: pitchfounderInput.value,
    category: pitchCategoryInput.value,
    image: pitchImageInput.value,
  };
  // console.log(singleproduct);

  fetch("http://localhost:3000/pitches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleproduct),
  })
    .then((response) => response.json())
    .then((data) => alert("POST request successful"))
    .catch((error) => alert("Error"));
});

// Able to delete a pitch - 2 marks

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-button")) {
    DeletePitch(e.target.dataset.id);
  }
});

function DeletePitch(id) {
  fetch(`http://localhost:3000/pitches/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

// Able to edit all fields of the pitch - 2 marks

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-link")) {
    addPitch(e.target.dataset.id);
  }
});

function addPitch(id) {
  fetch(`http://localhost:3000/pitches/${id}`)
    .then((res) => res.json())
    .then((data) => {
      updatePitchIdInput.value = data.id;
      updatePitchTitleInput.value = data.title;
      updatePitchImageInput.value = data.image;
      updatePitchCategoryInput.value = data.category;
      updatePitchfounderInput.value = data.founder;
      updatePitchPriceInput.value = data.price;
    })
    .catch((err) => console.log());
}

updatePitchBtn.addEventListener("click", () => {
  let data = {
    image: updatePitchImageInput.value,
    price: updatePitchPriceInput.value,
    category: updatePitchCategoryInput.value,
    title: updatePitchTitleInput.value,
    id: updatePitchIdInput.value,
    founder: updatePitchfounderInput.value,
  };

  fetch(`http://localhost:3000/pitches/${updatePitchIdInput.value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => alert("data Update ..."))
    .catch((err) => alert("Smothing went wrong"));
});

// Add to cart

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("Add-cart-button")) {
    let id = event.target.dataset.id;

    fetch(`http://localhost:3000/pitches/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // post data in cart

        fetch("http://localhost:3000/cartpage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((result) => alert("Data added into card"))
          .catch((err) => alert("Someting went wrong"));
      })
      .catch((err) => console.log(err));
  }
});

sortAtoZBtn.addEventListener("click", () => {
  // console.log(alldata);
  let sortdata = alldata.sort((a, b) => a.price - b.price);
  cardlist(sortdata);
});

sortZtoABtn.addEventListener("click", () => {
  // console.log(alldata);
  let sortdatadec = alldata.sort((a, b) => b.price - a.price);
  cardlist(sortdatadec);
});

filterFood.addEventListener("click", () => {
  let fooddata = alldata.filter((el, i) => el.category == "Food");
  cardlist(fooddata);
});

filterElectronics.addEventListener("click", () => {
  let Electronicsdata = alldata.filter((el, i) => el.category == "Electronics");
  cardlist(Electronicsdata);
});

filterPersonalCare.addEventListener("click", () => {
  let PersonalCaredata = alldata.filter((el, i) => el.category == "PersonalCare");
  cardlist(PersonalCaredata);
});
