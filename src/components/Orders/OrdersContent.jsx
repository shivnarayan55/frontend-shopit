import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ProductCard,
  ProductDesc,
  ProductImg,
  ProductInfo,
  ProductPrice,
  ProductsContainer,
  ProductsHeading,
  ProductTitle,
  ProductWrapper,
} from "../Cart/ProductsElements";

const OrdersContent = () => {
  useEffect(() => {
    orders();
  }, []);

  const [productData, setProductData] = useState([]);

  const [Qty, setQty] = useState();

  const [ordersData, setordersData] = useState([]);

  useEffect(() => {
    getAllOrderData();
  }, []);

  const url1 =
    "http://Shopitproducts-env.eba-pqdd3ppe.ap-south-1.elasticbeanstalk.com/cart/viewAllItemsInOrderDataByUserId/";
  const url2 =
    "http://Shopitproducts-env.eba-pqdd3ppe.ap-south-1.elasticbeanstalk.com/cart/viewAllOrder";
  const accessToken = localStorage.getItem("access token");

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const getAllOrderData = () => {
    try {
      axios
        .get(url1 + localStorage.getItem("userId"), config)
        .then((response) => {
          console.log(response.data);
          var quantity = 0;
          for (var i = 0; i < response.data.length; i++) {
            quantity = quantity + response.data[i].quantity;
          }
          setQty(quantity);
          setProductData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const orders = () => {
    try {
      axios.get(url2, config).then((response) => {
        const filteredData = response.data.filter((orders, idx) => {
          return orders.userId == localStorage.getItem("userId");
        });
        console.log(filteredData);
        setordersData(filteredData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductsContainer>
      <ProductsHeading>Orders</ProductsHeading>

      <ProductWrapper>
        {productData.map((products, idx) => {
          return (
            <div>
              <ProductCard>
                <ProductImg />

                <ProductInfo>
                  <ProductTitle>{products.productName}</ProductTitle>
                  <ProductDesc>
                    Quantity: &nbsp;{products.quantity} &nbsp;
                  </ProductDesc>
                </ProductInfo>
              </ProductCard>
            </div>
          );
        })}
        <br></br>
        <div>
          {ordersData.map((orders, key) => {
            return (
              <div style={{ marginLeft: "70px" }}>
                <h1>Order Summary:</h1>
                <h3> SubTotal: &nbsp; ₹{orders.totalPrice}</h3>

                <h3>Order Status: &nbsp;{orders.orderStatus}</h3>
                <h3>Address: &nbsp;{orders.address}</h3>
              </div>
            );
          })}
        </div>
      </ProductWrapper>
    </ProductsContainer>
  );
};

export default OrdersContent;
