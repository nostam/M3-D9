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

const submitProduct = async () => {
  let inputs = [...document.querySelectorAll("input")];
  inputs.flat(inputs.push([...document.querySelectorAll("textarea")]));
  inputs.forEach((e) =>
    isNaN(e.value) ? alert("Fields are empty") : console.log("data is all set")
  );
  let newProduct = {
    // gathering the data from the form, field by field
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,
  };

  try {
    let response = await fetch(url, {
      // our POST request is made with the fetch method as well!
      method: "POST", // declaring the CRUD method
      body: JSON.stringify(newProduct), // we need to stringify the JS object in order to send it
      headers: myHeaders,
    });

    if (response.ok) {
      alert("Product created successfully, redirecting back to homepage...");
      location.assign("index.html");
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }
};
