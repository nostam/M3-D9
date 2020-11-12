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
  document.getElementById("submitBtn").innerText = "Submitting...";

  // input validation
  let inputs = [...document.querySelectorAll("input")];
  // inputs.flat(inputs.push([...document.querySelectorAll("textarea")]));
  if (isPositiveNumber(inputs[3])) {
    console.log("price is correct");
  } else {
    throw Error("incorrect price");
  }
  // if (Boolean(inputs.filter((e) => e.value === "").length === 0)) {
  //   console.log("data all set");
  // } else {
  //   throw Error("empty field exists");
  // } //replaced with required tag

  let newProduct = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,
  };

  try {
    let response;

    response = await fetch(url, {
      // our POST request is made with the fetch method as well!
      method: "POST", // declaring the CRUD method
      body: JSON.stringify(newProduct), // we need to stringify the JS object in order to send it
      headers: myHeaders,
    });

    if (response.ok) {
      spinner.classList.toggle("d-none");
      document.getElementById("submitBtn").innerText = "Success!";
      alert("Product created successfully, redirecting back to homepage...");
      location.assign("index.html");
    } else {
      spinner.classList.toggle("d-none");
      document.getElementById("submitBtn").innerText = "Submit Product";
      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }
};
