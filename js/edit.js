const myHeaders = new Headers({
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiZDRiMjRiY2RlMTAwMTc2MTZhOWQiLCJpYXQiOjE2MDUwOTY2MjYsImV4cCI6MTYwNjMwNjIyNn0.wnvHZoGWTVKKmnMosaLbRybRZBimbBtCTwikNc7HA_0",
  "Content-Type": "application/json",
});

const url = "https://striveschool-api.herokuapp.com/api/product/";

const handleSubmit = (e) => {
  e.preventDefault(); // preventing the default browser event handling
  submitProduct();
};

const isPositiveNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
};

const submitProduct = async () => {
  let spinner = document.querySelector("#loadingSpinner");
  spinner.classList.toggle("d-none"); // showing the spinner
  document.querySelector("#submitBtn span:last-of-type").innerText =
    "Submitting...";

  // input validation
  // let inputs = [...document.querySelectorAll("input")];
  // // inputs.flat(inputs.push([...document.querySelectorAll("textarea")]));
  // if (inputs[3] < 0) {
  //   throw Error("incorrect price");
  // }
  // if (Boolean(inputs.filter((e) => e.value === "").length === 0)) {
  //   console.log("data all set");
  // } else {
  //   throw Error("empty field exists");
  // } //replaced with required tag
  let urlParmas = new URLSearchParams(document.location.search);
  let id = urlParmas.get("id");

  let productInfo = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,
  };

  try {
    let response;
    if (id) {
      response = await fetch(url + id, {
        method: "PUT",
        body: JSON.stringify(productInfo),
        headers: myHeaders,
      });
    } else {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(productInfo),
        headers: myHeaders,
      });
    }
    if (response.ok) {
      spinner.classList.toggle("d-none");
      document.querySelector("#submitBtn span:last-of-type").innerText =
        "Success!";
      alert(
        `Product ${
          id ? "updated" : "created"
        } successfully, redirecting back to homepage...`
      );
      location.assign("index.html");
    } else {
      spinner.classList.toggle("d-none");
      document.querySelector("#submitBtn span:last-of-type").innerText =
        "Submit Product";
      alert("Something went wrong!");
    }
  } catch (error) {
    let danger = document.createElement("div");
    danger.classList.add("alert", "alert-danger");
    danger.innerText = error;
    document.getElementsByTagName("h1").appendChild(danger);
  }
};

window.onload = async () => {
  let urlParmas = new URLSearchParams(document.location.search);
  let id = urlParmas.get("id");
  if (id) {
    try {
      let response = await fetch(url + id, {
        method: "GET",
        headers: myHeaders,
      });
      let payload = await response.json();
      if (response.ok) {
        document.querySelector(".text-center.mt-5").innerText = "Edit Product";
        document.querySelector("#submitBtn span:last-of-type").innerText =
          "Edit Product";
        document.querySelector("#name").value = payload.name;
        document.querySelector("#description").value = payload.description;
        document.querySelector("#brand").value = payload.brand;
        document.querySelector("#imageUrl").value = payload.imageUrl;
        document.querySelector("#price").value = payload.price;
      } else {
        throw Error("ID does not match");
      }
    } catch {
      let danger = document.createElement("div");
      danger.classList.add("alert", "alert-danger");
      danger.innerText = error;
      document.getElementsByTagName("h1").appendChild(danger);
    }
  }
};
