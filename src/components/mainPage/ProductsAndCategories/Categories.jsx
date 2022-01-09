import React from "react";
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

const Categories = ({ heading, data }) => {
  return (
    <form>
      <ProductsContainer>
        <ProductsHeading>{heading}</ProductsHeading>
        <ProductWrapper>
          {data.map((products, index) => {
            return (
              <ProductCard key={index}>
                <ProductImg src={products.img} />
                <ProductInfo>
                  <ProductTitle>{products.name}</ProductTitle>

                  <ProductButton>View</ProductButton>
                </ProductInfo>
              </ProductCard>
            );
          })}
        </ProductWrapper>
      </ProductsContainer>
    </form>
  );
};

export default Categories;
