const myHeaders = new Headers({
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiZDRiMjRiY2RlMTAwMTc2MTZhOWQiLCJpYXQiOjE2MDUwOTY2MjYsImV4cCI6MTYwNjMwNjIyNn0.wnvHZoGWTVKKmnMosaLbRybRZBimbBtCTwikNc7HA_0",
});

const addToShelf = (p) => {
  // console.log(p);
  let card = document.createElement("div");
  card.classList.add("card", "mx-auto", "my-5");
  card.style.width = "300px";
  card.setAttribute("id", p._id);
  card.innerHTML = `
    <img src="${p.imageUrl}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title d-flex justify-content-between"><span>${p.name}</span><span>${p.brand}</span></h5>
      <p class="card-text">${p.description}</p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <span>Price: $${p.price}</span>
      <a href="#" class="btn btn-warning">Buy</a>
    </div>`;
  return card;
};
const search = (payload, criteria = "name") => {
  let input = document.querySelector(".form-control");
  let result = [];
  let cards = [...document.getElementsByClassName("card")];
  input.addEventListener("input", function (e) {
    if (input.value.length > 0) {
      // console.log("searching", input.value);
      // console.log(payload);
      result = payload.filter((obj) =>
        obj[criteria]
          .valueOf()
          .toLowerCase()
          .includes(input.value.toLowerCase())
      );
      for (let card of cards) {
        card.classList.remove("searchMatched");
      }
      console.log(
        result,
        cards.map((e) => e.className)
      );
      for (let card of cards) {
        for (let filtered of result) {
          if (filtered["_id"] === card["id"]) {
            card.classList.add("searchMatched");
          }
        }
        if (card.className.match("searchMatched")) {
          card.classList.remove("d-none");
        } else {
          card.classList.add("d-none");
        }
      }
    } else {
      for (let card of cards) {
        card.classList.remove("d-none"); // from searching back to whole index
      }
    }
  });
};

window.onload = async () => {
  const url = "https://striveschool-api.herokuapp.com/api/product/";
  let shelf = document.querySelector("#shelf");

  try {
    let response = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });

    let payload = await response.json();
    if (payload.length > 0) {
      payload.forEach((p) => shelf.appendChild(addToShelf(p)));
      search(payload);
    } else {
      shelf.innerHTML = "<h2>Sorry it's out of stock at the moment</h2>";
    }
  } catch (error) {
    console.log(error);
  }
};
