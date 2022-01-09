import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./components/mainPage/Home";
import { UserHome } from "./components/mainPage/UserHome";
import { AdminDashboard } from "./components/adminDashboard/adminDashboard";
import ProtectedRoute from "./components/accountBox/protectedRoute";
import AccessManagement from "./components/AccessManagement/AccessManagement";
import UserManagement from "./components/UserManagement/UserManagement";
import EditUser from "./components/UserManagement/EditUser";
import Permission from "./components/AccessManagement/Permissions";
import RoleManagement from "./components/RoleManagement/RoleManagement";
import ProductManagement from "./components/ProductManagement/ProductManagement";
import AddProduct from "./components/ProductManagement/AddProduct";
import EditProductForm from "./components/ProductManagement/EditProductForm";
import ProtectedRoute2 from "./components/mainPage/ProtectedRoute2";
import Cart from "./components/Cart/Cart";
import Address from "./components/Cart/Address";
import OrderManagement from "./components/OrderManagement/OrderManagement";
import Orders from "./components/Orders/Orders";
import EditOrderTable from "./components/OrderManagement/EditOrderTable";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
`;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/accessManagement">
          <AccessManagement />
        </ProtectedRoute>
        <ProtectedRoute2 path="/address">
          <Address />
        </ProtectedRoute2>
        <ProtectedRoute2 path="/orders">
          <Orders />
        </ProtectedRoute2>
        <ProtectedRoute path="/roleManagement">
          <RoleManagement />
        </ProtectedRoute>
        <ProtectedRoute path="/editOrder">
          <EditOrderTable />
        </ProtectedRoute>
        <ProtectedRoute path="/orderManagement">
          <OrderManagement />
        </ProtectedRoute>
        <ProtectedRoute path="/usermanagement">
          <UserManagement />
        </ProtectedRoute>
        <ProtectedRoute path="/editUser">
          <EditUser />
        </ProtectedRoute>
        <ProtectedRoute path="/permissions">
          <Permission />
        </ProtectedRoute>

        <ProtectedRoute2 path="/home">
          <UserHome />
        </ProtectedRoute2>
        <ProtectedRoute2 path="/cart">
          <Cart />
        </ProtectedRoute2>
        <ProtectedRoute path="/adminDashboard">
          <AdminDashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/productManagement">
          <ProductManagement />
        </ProtectedRoute>
        <ProtectedRoute path="/addProduct">
          <AddProduct />
        </ProtectedRoute>
        <ProtectedRoute path="/editProduct">
          <EditProductForm />
        </ProtectedRoute>
        <AppContainer>
          <Route path="/signIn" exact component={AccountBox} />
        </AppContainer>
      </BrowserRouter>
    </div>
  );
}

export default App;
