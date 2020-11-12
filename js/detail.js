const myHeaders = new Headers({
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiZDRiMjRiY2RlMTAwMTc2MTZhOWQiLCJpYXQiOjE2MDUwOTY2MjYsImV4cCI6MTYwNjMwNjIyNn0.wnvHZoGWTVKKmnMosaLbRybRZBimbBtCTwikNc7HA_0",
  "Content-Type": "application/json",
});
let id;
const url = "https://striveschool-api.herokuapp.com/api/product/";
const detailsInfo = (product) => {
  return `<h4>${product.name}</h4>
      	  <h5>Brand: ${product.brand}</h5>
      	  <hr>
      	  <h6>${product.description}</h6>
      	  <p class="d-flex mt-auto align-self-end">Updated at ${product.updatedAt}</p>
      	  `;
};

window.onload = async () => {
  let urlParams = new URLSearchParams(window.location.search); // creating a new instance of the URLSearchParams object
  id = urlParams.get("id"); // saving the id retrieved from the url address bar
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });
    let products = await response.json();
    let product = products.filter((p) => p["_id"] === id)[0];

    if (product) {
      document.getElementById("details").classList.toggle("d-none");
      document.getElementById("productImg").src = product.imageUrl;
      document.getElementById("details-info").innerHTML += detailsInfo(product);
    } else {
      throw Error("ID does not match or payload is empty");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong, see console log for details");
  }
};

const handleDelete = async () => {
  try {
    const response = await fetch(url + id, {
      method: "DELETE",
      headers: myHeaders,
    });
    if (response.ok) {
      //modal confirm
      alert("Product deleted successfully");
      location.assign("index.html");
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleEdit = () => {
  location.href = "edit.html?id=" + id;
};
