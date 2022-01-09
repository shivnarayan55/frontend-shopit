import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Footer from "../mainPage/Footer/Footer";
import { FooterContainer } from "../mainPage/Footer/FooterElements";

import Navbar from "../mainPage/Navbar/Navbar";
import { NavLink } from "../mainPage/Navbar/NavbarElements";
import Sidebar from "../mainPage/Sidebar/Sidebar";
import SidebarTwo from "../mainPage/Sidebar/SidebarTwo";
import {
  ProductButton,
  ProductCard,
  ProductsContainer,
  ProductWrapper,
} from "./ProductsElements";

const Address = () => {
  const history = useHistory();
  var requestBody = {
    address: "",
    orderStatus: "Packing",
    userId: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
    totalPrice: "",
  };

  const url1 =
    "http://Shopitproducts-env.eba-pqdd3ppe.ap-south-1.elasticbeanstalk.com/cart/checkout";
  const url2 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/cart/delete/";
  const url3 = "http://localhost:8081/checkout";
  const accessToken = localStorage.getItem("access token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [showData, setShowData] = useState([]);

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [Open, setOpen] = useState(false);
  const move = () => {
    setOpen(!Open);
  };

  const [price, setPrice] = useState();

  useEffect(() => {
    console.log(location.state);
    // setShowData(location.state);
    // var total = 0;
    // for (var i = 0; i < showData.length; i++) {
    //   total = total + showData[i].totalPrice;
    // }
    var total = 0;
    for (var i = 0; i < location.state.length; i++) {
      total = total + location.state[i].totalPrice;
    }
    setPrice(total);
  }, []);

  const checkoutHandler = (e) => {
    e.preventDefault();
    requestBody = {
      ...requestBody,
      totalPrice: price,
      address: addressOne + " " + addressTwo,
    };
    try {
      axios.post(url1, requestBody, config).then((response) => {
        console.log(response.data);
        setResponseData(response.data);
        axios.post(url3, requestBody).then((resp) => {
          console.log(resp);
        });
        if (response.data) {
          try {
            axios
              .delete(url2 + localStorage.getItem("userId"), config)
              .then((response) => {
                console.log(response.data);
              });
          } catch (error) {
            console.log(error);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar move={move} toggle={toggle} />

      <Sidebar isOpen={isOpen} toggle={toggle} />

      <SidebarTwo Open={Open} move={move} />
      <ProductsContainer>
        {responseData.length !== 0 ? (
          <h1 style={{ marginLeft: "400px" }}>
            Order Successfully Processed
            <p style={{ marginLeft: "150px" }}>
              Go to &nbsp;{" "}
              <a style={{ color: "#fff" }} href="/orders">
                Orders.
              </a>
            </p>
          </h1>
        ) : (
          <div style={{ marginLeft: "500px" }} class="container">
            <h1>Add Address</h1>
            <form>
              <label for="email">Address Line 1</label>
              <textarea
                onChange={(e) => {
                  e.preventDefault();
                  setAddressOne(e.target.value);
                }}
                className="roleInput"
                style={{ width: "60%", color: "#fff" }}
                type="text"
                required
              ></textarea>
              <label for="email">Address Line 2</label>
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddressTwo(e.target.value);
                }}
                className="roleInput"
                style={{ width: "60%", color: "#fff" }}
                type="text"
              ></input>

              <br></br>
              <h3>Subtotal: &nbsp; ₹ {price}</h3>
              <ProductButton onClick={checkoutHandler}>Checkout</ProductButton>
            </form>
          </div>
        )}
      </ProductsContainer>
      <Footer />
    </div>
  );
};

export default Address;
