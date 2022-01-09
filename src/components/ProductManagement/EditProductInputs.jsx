import axios from "axios";
import { visualElement } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function EditProductInputs() {
  const location = useLocation();

  const [product, setProduct] = useState(location.state[0].productName);
  const [price, setPrice] = useState(location.state[0].price);
  const [description, setDescription] = useState(location.state[0].description);
  const [image, setImage] = useState(location.state[0].imageName);
  const [quantity, setQuantity] = useState(location.state[0].quantity);

  //   const [categoryName, setCategoryName] = useState("");
  //   const [categoryId, setCategoryId] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

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
  var requestBody = {
    id: location.state[0].id,
    productName: product,
    price: price,
    imageName: image,
    description: description,
    quantity: quantity,
    categoryId: "",
  };
  function postHandler(event) {
    event.preventDefault();
    try {
      axios.post(url2, requestBody, config).then((response) => {
        console.log(response.data);
        window.alert("product updated");
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div class="container">
      <h1>Edit Product</h1>
      <form onSubmit={postHandler}>
        <label for="name">Product Name</label>
        <input
          onChange={(e) => {
            setProduct(e.target.value);
          }}
          value={product}
          className="roleInput"
          style={{ width: "60%" }}
          type="text"
          name="name"
          required
        ></input>
        <label for="email">Description</label>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          className="roleInput"
          style={{ width: "60%" }}
          type="email"
          name="name"
          required
        ></textarea>
        <label for="email">Price</label>
        <input
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
          className="roleInput"
          style={{ width: "60%" }}
          type="text"
          name="name"
          required
        ></input>
        <label for="email">Quantity</label>
        <input
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          value={quantity}
          className="roleInput"
          style={{ width: "60%" }}
          type="text"
          name="name"
        ></input>
        <label for="email">Image</label>
        <input
          onChange={(e) => {
            setImage(e.target.value);
          }}
          value={image}
          className="roleInput"
          style={{ width: "60%" }}
          type="text"
          name="name"
          required
        ></input>
        <label>Select A Category:</label>
        <select
          onChange={(e) => {
            e.preventDefault();
            categoryData.map((cat, index) => {
              if (cat.name === e.target.value) {
                requestBody = {
                  ...requestBody,
                  categoryId: cat.id,
                };
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

export default EditProductInputs;
