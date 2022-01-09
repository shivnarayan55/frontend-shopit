import React, { useEffect, useState } from "react";
import "./adminDashboard.css";
import axios from "axios";

function DashboardContent() {
  useEffect(() => {
    getAllProducts();
    getAllUsers();
    getAllOrder();
  }, []);

  const [userLength, setUserLength] = useState();
  const [productLength, setProductLength] = useState();
  const [orderLength, setOrderLength] = useState();
  const [totalRevenue, setTotalRevenue] = useState();

  const url1 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/products/viewAll";
  const url2 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/users/viewAll";
  const url3 =
    "http://Shopitproducts-env.eba-pqdd3ppe.ap-south-1.elasticbeanstalk.com/cart/viewAllOrder";
  const accessToken = localStorage.getItem("access token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  function getAllProducts() {
    axios.get(url1, config).then((response) => {
      console.log(response.data);
      setProductLength(response.data.length);
    });
  }

  function getAllOrder() {
    try {
      axios.get(url3, config).then((response) => {
        console.log(response.data);
        setOrderLength(response.data.length);
        var total = 0;
        for (var i = 0; i < response.data.length; i++) {
          total = total + response.data[i].totalPrice;
        }
        setTotalRevenue(total);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function getAllUsers() {
    axios.get(url2, config).then((response) => {
      // console.log(response.data);
      setUserLength(response.data.length);
      response.data.map((users, idx) => {
        if (localStorage.getItem("email") === users.email) {
          localStorage.setItem("name", users.name);
          localStorage.setItem("userId", users.id);
          localStorage.setItem("username", users.username);
        }
      });
    });
  }

  return (
    <div>
      <div>
        <h1>WELCOME TO THE ADMIN DASHBOARD</h1>
      </div>
      <br></br>
      <br></br>

      <div class="float-containerr">
        <div class="float-childd">
          <div class="green">Registered Users: &nbsp; &nbsp; {userLength}</div>
        </div>

        <div class="float-childd">
          <div class="green">Total Orders: &nbsp; &nbsp; {orderLength}</div>
        </div>
      </div>

      <div style={{ marginTop: "100px" }} class="float-container">
        <div class="float-childd">
          <div class="green">Total Products: &nbsp; &nbsp; {productLength}</div>
        </div>

        <div class="float-childd">
          <div class="green">Total Revenue: &nbsp; &nbsp; {totalRevenue} </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardContent;
