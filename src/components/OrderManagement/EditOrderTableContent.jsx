import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const EditOrderTableContent = () => {
  const location = useLocation();

  const [username, setUsername] = useState(location.state[0].username);
  const [address, setAddress] = useState(location.state[0].address);
  const [totalPrice, setTotalPrice] = useState(location.state[0].totalPrice);
  const [orderStatus, setOrderStatus] = useState(location.state[0].orderStatus);

  console.log(location.state);

  var requestBody = {
    userId: location.state[0].userId,
    id: location.state[0].id,
    username: username,
    address: address,
    totalPrice: totalPrice,
    orderStatus: orderStatus,
  };

  const url =
    "http://Shopitproducts-env.eba-pqdd3ppe.ap-south-1.elasticbeanstalk.com/cart/checkout";
  const accessToken = localStorage.getItem("access token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const buttonHandler = (e) => {
    e.preventDefault();

    try {
      axios.post(url, requestBody, config).then((response) => {
        console.log(response.data);
        window.alert("order updated");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="container">
      <h1>Edit Orders</h1>
      <form>
        <label for="name">Username</label>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          className="roleInput"
          style={{ width: "60%" }}
          type="text"
          name="name"
          required
        ></input>
        <label for="email">User Address</label>
        <textarea
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
          className="roleInput"
          style={{ width: "60%" }}
          type="email"
          name="name"
          required
        ></textarea>
        <label for="email">Total Price</label>
        <input
          onChange={(e) => {
            setTotalPrice(e.target.value);
          }}
          value={totalPrice}
          className="roleInput"
          style={{ width: "60%" }}
          type="text"
          name="name"
          required
        ></input>
        <label for="email">Update Order Status</label>
        <input
          onChange={(e) => {
            setOrderStatus(e.target.value);
          }}
          value={orderStatus}
          className="roleInput"
          style={{ width: "60%" }}
          type="text"
          name="name"
        ></input>

        <br></br>
        <button onClick={buttonHandler} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditOrderTableContent;
