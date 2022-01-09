import React, { useEffect } from "react";
import axios from "axios";
import {
  ProductsContainer,
  ProductWrapper,
  ProductsHeading,
  ProductTitle,
  ProductCard,
  ProductImg,
  ProductInfo,
  ProductDesc,
  ProductPrice,
  ProductButton,
} from "./ProductsElements";
import { useHistory } from "react-router-dom";

const rs = "₹";

const Products = ({ heading, data }) => {
  const history = useHistory();

  const url =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/cart/save";
  const accessToken = localStorage.getItem("access token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  var requestBody = {
    id: "",
    product: {
      id: "",
      productName: "",
      price: "",
      description: "",
      imageName: "",
      quantity: "",
      categoryId: "",
    },
    username: "",
    userId: "",
    quantity: "",
    unitPrice: "",
  };

  const postHandler = (e) => {
    e.preventDefault();

    try {
      axios.post(url, requestBody, config).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onClick={postHandler}>
      <ProductsContainer>
        <ProductsHeading>{heading}</ProductsHeading>
        <ProductWrapper>
          {data.map((products, index) => {
            return (
              <ProductCard key={index}>
                <ProductImg />
                <ProductInfo>
                  <ProductTitle>{products.productName}</ProductTitle>
                  {/* <ProductDesc>
                  Premium quality, long battery life, and an expert pairing of
                  AMD and Nvidia components
                </ProductDesc> */}
                  <ProductPrice>
                    {rs}
                    {products.price}
                  </ProductPrice>
                  <ProductButton
                    onClick={(e) => {
                      e.preventDefault();
                      requestBody = {
                        ...requestBody,
                        product: {
                          id: products.id,
                          productName: products.productName,
                          price: products.price,
                          description: products.description,
                          imageName: products.imageName,
                          quantity: products.quantity,
                          categoryId: products.categoryId,
                        },
                        username: localStorage.getItem("username"),
                        userId: localStorage.getItem("userId"),
                        quantity: "1",
                        unitPrice: products.price,
                        id: "300",
                      };

                      alert("Item Added To The Cart");
                    }}
                  >
                    Add To Cart
                  </ProductButton>
                </ProductInfo>
              </ProductCard>
            );
          })}
        </ProductWrapper>
      </ProductsContainer>
    </form>
  );
};

export default Products;
