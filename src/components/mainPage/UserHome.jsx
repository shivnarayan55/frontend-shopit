import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle } from "../../globalStyles";
import Hero from "./Hero/Hero";
import Sidebar from "./Sidebar/Sidebar";
import Products from "./ProductsAndCategories/Products";
import { productDataTwo } from "./ProductsAndCategories/data";
import Feature from "./Feature/Feature";
import Footer from "./Footer/Footer";
import axios from "axios";
import SidebarTwo from "./Sidebar/SidebarTwo";
import Categories from "./ProductsAndCategories/Categories";
export function UserHome() {
  //   const history = useHistory();

  //   function signoutHandler() {
  //     history.push("/");
  //     console.clear();
  //     localStorage.clear();
  //   }

  useEffect(() => {
    getAllProducts();
    getAllUsers();
  }, []);

  const [productData, setProductData] = useState([]);

  const url =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/products/viewAll";
  const url2 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/users/viewAll";
  const accessToken = localStorage.getItem("access token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  function getAllProducts() {
    try {
      axios.get(url, config).then((response) => {
        console.log(response.data);
        setProductData(response.data.slice(0, 3));
      });
    } catch (error) {
      console.log(error);
    }
  }

  function getAllUsers() {
    axios.get(url2, config).then((response) => {
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
      <GlobalStyle />

      <Hero />
      <Sidebar />
      <SidebarTwo />
      <Products heading="Top Products For You" data={productData} />

      <Feature />

      <Categories heading="Top Categories For You" data={productDataTwo} />

      <Footer />
    </div>
  );
}
