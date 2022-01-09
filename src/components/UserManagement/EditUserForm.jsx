import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./UserManagement.css";

function EditUserForm() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    username: "",
    name: "",
    authority: "",
    userId: "",
    roleId: "",
  });

  const [roleName, setRoleName] = useState();

  const [role, setRole] = useState([]);

  const location = useLocation();

  useEffect(() => {
    console.log(location.state);

    roles();
  }, []);

  const url =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/access/viewAllRoles";
  const accessToken = localStorage.getItem("access token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  function roles() {
    try {
      axios.get(url, config).then((response) => {
        console.log(response.data);
        setRole(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }
  function dropdownChange(e) {
    //   setRoleName(e.target.value)
    // setUserDetails.authority(e.target.value);
    console.log(e.target.value);
  }

  const [name, setName] = useState(location.state[0].name);
  const [username, setUsername] = useState(location.state[0].username);
  const [email, setEmail] = useState(location.state[0].email);

  var requestBody = {
    email: "",
    name: "",
    username: "",
    authority: "",
    userId: location.state[0].id,
    roleId: "",
  };

  const url2 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/users/update";

  function postHandler(e) {
    e.preventDefault();

    requestBody = {
      ...requestBody,
      name: name,
      email: email,
      username: username,
    };
    console.log(requestBody);
    try {
      axios.put(url2, requestBody, config).then((response) => {
        console.log(response);
        if (response.data) {
          window.alert("User updated");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div class="container">
      <h1>Edit User Details</h1>
      <form onSubmit={postHandler}>
        <label for="name">Name</label>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="roleInput"
          style={{ width: "60%" }}
          value={name}
          type="text"
          name="name"
          required
        ></input>
        <label for="email">Email</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="roleInput"
          style={{ width: "60%" }}
          value={email}
          type="email"
          name="name"
          required
        ></input>
        <label for="email">Username</label>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="roleInput"
          style={{ width: "60%" }}
          value={username}
          type="text"
          name="name"
          required
        ></input>
        <label>Select A Role:</label>
        <select
          placeholder={location.state[0].authority}
          required
          onChange={(e) => {
            role.map((allRoles, idx) => {
              if (allRoles.roleName === e.target.value) {
                requestBody = {
                  ...requestBody,
                  authority: e.target.value,
                  roleId: allRoles.roleID,
                };
              }
            });
          }}
          className="roleInput"
          style={{ width: "60%" }}
        >
          <option></option>
          {role.map((element, index) => {
            return <option>{element.roleName}</option>;
          })}
        </select>

        <br></br>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditUserForm;
