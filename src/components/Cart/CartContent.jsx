import React, { useEffect, useState } from "react";
import { SubmitButton } from "../accountBox/common";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  ProductButton,
  ProductCard,
  ProductDesc,
  ProductImg,
  ProductInfo,
  ProductPrice,
  ProductsContainer,
  ProductsHeading,
  ProductTitle,
  ProductWrapper,
} from "./ProductsElements";
import axios from "axios";
import { NavLink } from "../mainPage/Navbar/NavbarElements";
import { useHistory } from "react-router-dom";

const CartContent = ({ data }) => {
  const history = useHistory();
  const url1 =
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
    username: localStorage.getItem("username"),
    userId: localStorage.getItem("userId"),

    quantity: "",
    unitPrice: "",
    totalPrice: "",
  };

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    getAllItemsInCart();
  }, [cart]);

  const url2 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/cart/viewAllItemsInCart";

  const getAllItemsInCart = () => {
    axios.get(url2, config).then((response) => {
      const cartData = response.data.filter((cats, idx) => {
        return cats.username === localStorage.getItem("username");
      });
      var total = 0;
      for (var i = 0; i < cartData.length; i++) {
        total = total + cartData[i].totalPrice;
        setTotal(total);
      }

      setCart(cartData);
    });
  };

  const editHandler = (request) => {
    try {
      axios.post(url1, request, config).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const url3 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/cart/deleteByProductId/";
  const deleteHandler = (productId) => {
    try {
      axios.delete(url3 + productId, config).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <ProductsContainer>
        <ProductsHeading>Cart Items</ProductsHeading>

        <ProductWrapper>
          {cart.map((products, index) => {
            return (
              <ProductCard>
                <ProductImg />

                <ProductInfo>
                  <ProductTitle>{products.product.productName}</ProductTitle>
                  <ProductDesc>{products.product.description}</ProductDesc>
                  <label>Qty</label>
                  <select
                    placeholder="10"
                    onChange={(e) => {
                      requestBody = {
                        ...requestBody,
                        id: products.id,
                        unitPrice: products.unitPrice,
                        quantity: e.target.value,
                        totalPrice: products.totalPrice,
                        product: {
                          productName: products.product.productName,
                          quantity: products.product.quantity,
                          price: products.product.price,
                          categoryId: products.product.categoryId,
                          description: products.product.description,
                          imageName: products.product.imageName,
                          id: products.product.id,
                        },
                      };
                      editHandler(requestBody);
                    }}
                    style={{ backgroundColor: "#fff" }}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                  <ProductPrice>
                    Price :&nbsp; ₹{products.totalPrice}
                  </ProductPrice>
                  <p>
                    {" "}
                    delete{" "}
                    <FaRegTrashAlt
                      onClick={(e) => {
                        e.preventDefault();

                        deleteHandler(products.product.id);
                      }}
                    />
                  </p>
                </ProductInfo>
              </ProductCard>
            );
          })}
        </ProductWrapper>
        {cart.length !== 0 ? (
          <ProductInfo>
            <ProductPrice>
              Subtotal:({cart.length} items): &nbsp; ₹{total}
            </ProductPrice>
            <ProductButton
              type="button"
              onClick={(e) => {
                history.push({
                  pathname: "/address",

                  state: [...cart],
                });
              }}
            >
              Proceed
            </ProductButton>
          </ProductInfo>
        ) : (
          <ProductsHeading>Your Cart Is Empty....</ProductsHeading>
        )}
      </ProductsContainer>
    </form>
  );
};

export default CartContent;
