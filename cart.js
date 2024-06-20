// use this for single product
{
  /* <img src=${image} alt="${name}">
       <div class="card-body">
        <h3 class="product-title">${title}</h3>
        <p class="product-description">${description}</p>
        <p class="product-price">${price}</p>
        <button>+</button>
        <p >Quantity ${quantity}</p>
        <button>-</button>
      </div> */
}

function Fetchcartdata() {
  fetch("http://localhost:3000/cartpage")
    .then((res) => res.json())
    .then((data) => cardlist(data))
    .catch((err) => console.log(err));
}
Fetchcartdata();

function cardlist(data) {
  let totalcard = data
    .map((el) =>
      singlecard(
        el.id,
        el.image,
        el.price,
        el.category,
        el.title,
        el.founder,
        el.description
      )
    )
    .join("");

  document.getElementById("product-container").innerHTML = totalcard;
}

function singlecard(id, image, price, category, title, founder, description) {
  let div = `
        <div class="card-list">
        <div class=card-img>
        <img src=${image} alt="${name}">
        </div>
       <div class="card-body">
        <h3 class="product-title">${title}</h3>
        <p class="product-description">${description}</p>
        <p class="product-price">${price}</p>
        <button data-id=${id}>+</button>
        <button data-id=${id}>-</button>
        <span id=product-qty>Qty:</span>
        <button data-id=${id} class= delete-btn>Remvoe cart</button>
      </div> 
        </div>
        
        `;
  return div;
}

// -------------Remove cart---------------------//

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    Delete(e.target.dataset.id);
  }
});

function Delete(id) {
  fetch(`http://localhost:3000/cartpage/${id}`, {
    method: "DELETE",
  })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

// -------------Remove cart endd---------------//


     


