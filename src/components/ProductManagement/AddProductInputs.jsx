import axios from "axios";
import React, { useEffect, useState } from "react";

function AddProductsInputs() {
  var requestBody = {
    id: "300",
    productName: "",
    price: "",
    description: "",
    quantity: "",
    imageName: "",

    categoryId: "",
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const [categoryData, setCategoryData] = useState([]);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const url1 =
    "http://Shopitproducts-env.eba-pqdd3ppe.ap-south-1.elasticbeanstalk.com/viewAllCategories";
  const url2 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/products/add";

  const accessToken = localStorage.getItem("access token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  function getAllCategories() {
    try {
      axios.get(url1, config).then((response) => {
        console.log(response.data);
        setCategoryData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function postHandler(e) {
    e.preventDefault();
    requestBody = {
      ...requestBody,
      productName: product,
      price: price,
      quantity: quantity,
      description: description,
      imageName: image,

      categoryId: categoryId,
    };

    console.log(requestBody);
    try {
      axios.post(url2, requestBody, config).then((response) => {
        console.log(response.data);
        window.alert("product added");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div class="container">
      <h1>Add Product</h1>
      <form onSubmit={postHandler}>
        <label for="name">Product Name</label>
        <input
          onChange={(e) => {
            setProduct(e.target.value);
          }}
          className="roleInput"
          style={{ width: "60%" }}
          type="text"
          name="name"
          require0d
        ></input>
        <label for="email">Description</label>
        <textarea
          onChange={(e) => {
            e.preventDefault();
            setDescription(e.target.value);
          }}
          className="roleInput"
          style={{ width: "60%" }}
          type="email"
          name="name"
          required
        ></textarea>
        <label for="email">Price</label>
        <input
          onChange={(e) => {
            e.preventDefault();
            setPrice(e.target.value);
          }}
          className="roleInput"
          style={{ width: "60%" }}
          type="text"
          name="name"
          required
        ></input>
        <label for="email">Quantity</label>
        <input
          onChange={(e) => {
            e.preventDefault();
            setQuantity(e.target.value);
          }}
          className="roleInput"
          style={{ width: "60%" }}
          type="text"
          name="name"
        ></input>
        <label for="email">Image</label>
        <input
          onChange={(e) => {
            e.preventDefault();
            setImage(e.target.value);
          }}
          className="roleInput"
          style={{ width: "60%" }}
          type="text"
          name="name"
          required
        ></input>
        <label>Select A Category:</label>
        <select
          onChange={(e) => {
            categoryData.map((categories, key) => {
              if (categories.name === e.target.value) {
                setCategoryId(categories.id);
              }
            });
          }}
          required
          className="roleInput"
          style={{ width: "60%" }}
        >
          <option></option>
          {categoryData.map((category, idx) => {
            return <option>{category.name}</option>;
          })}
        </select>
        <br></br>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProductsInputs;
