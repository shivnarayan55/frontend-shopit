import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PermissionsList() {
  const location = useLocation();

  useEffect(() => {
    fetchRoleData();
    fetchResources();
    console.log(location.state);
  }, []);

  const url4 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/access/getPermissionsByRoleName/";
  const url5 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/access/viewAllRolePermissions";

  const accessToken = localStorage.getItem("access token");

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const [nameOfRole, setNameOfRole] = useState(location.state[0]);
  const [roleName, setRoleName] = useState("");
  const [permissionData, setPermissionData] = useState();
  const [resources, setResources] = useState();
  const [permissions, setPermissions] = useState({
    resourceId: "",
    canAdd: false,
    canDelete: false,
    canEdit: false,
    canView: false,
    roleId: "",
  });

  const [currentRole, setCurrentRole] = useState();

  const [returnedTarget, setReturnedTarget] = useState();

  useEffect(() => {
    getCurrentPermissions();
    setRoleAndResource();
  }, [roleName]);

  function getCurrentPermissions() {
    axios.get(url5, config).then((response) => {
      console.log(response.data);

      setPermissionData(response.data);

      setReturnedTarget(Object.assign(requestBody, response.data));
    });
  }

  const permissionList = new Array();

  const requestBody = {
    roleName: roleName,
    permissionList: [...permissionList],
  };

  const [table, setTable] = useState(false);

  function buttonClick(e) {
    setRoleName(e.target.value);
    setTable(true);
  }

  const url =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/access/viewAllResources";
  const fetchResources = () => {
    axios.get(url, config).then((response) => {
      console.log(response.data);
      setResources(response.data);
    });
  };

  const [roleData, setRoleData] = useState([]);

  const url1 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/access/viewAllRoles";

  async function fetchRoleData() {
    const accessToken = localStorage.getItem("access token");
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    try {
      const resp = await axios.get(url1, config);
      console.log(resp.data);
      setRoleData(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  function setRoleAndResource() {
    for (const resourceItem in resources) {
      for (const roleItem in roleData) {
        if (roleData[roleItem].roleName === roleName) {
          const id = parseInt(resourceItem);
          console.log(roleData[roleItem].roleID);
          permissionList.push({
            ...permissions,
            roleId: roleData[roleItem].roleID,
            resourceId: id + 1,
          });
          console.log(roleData[roleItem].roleID);
          setCurrentRole(roleData[roleItem].roleID);
        }
      }
    }
  }

  const [valOfRoleId, setValOfRoleId] = useState("");

  var roleResponse = {
    roleID: "",
    roleName: "",
  };

  const url3 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/access/updatepermissionsByRoleID";
  const url6 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/access/addRole";

  const postHandler = async () => {
    const filteredPermissions = permissionData.filter((perms) => {
      return perms.roleId === currentRole;
    });

    console.log(filteredPermissions);
    const requestBody = {
      roleName: roleName,
      permissionList: [...filteredPermissions],
    };

    console.log(requestBody);
    await axios.put(url3, requestBody, config).then((response) => {
      console.log(response.data);
    });
    if (nameOfRole) {
      roleResponse = {
        ...roleResponse,
        roleName: nameOfRole,
        roleID: location.state[1],
      };
    } else {
      roleResponse = {
        ...roleResponse,
        roleName: location.state[0],
        roleID: location.state[1],
      };
    }

    console.log(roleResponse);
    await axios.post(url6, roleResponse, config).then((response) => {
      console.log(response.data);
      window.alert("permission edited");
    });
  };

  return (
    <div style={{ marginLeft: "200px" }}>
      <h1>Edit Role & Permissions</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          postHandler();
        }}
      >
        <label>Edit Role Name:</label>
        <input
          className="roleInput"
          style={{ width: "37%" }}
          type="text"
          name="name"
          value={nameOfRole}
          onChange={(e) => {
            setNameOfRole(e.target.value);
            roleData.map((allRoles, index) => {
              if (allRoles.roleName === location.state[0]) {
                setValOfRoleId(allRoles.roleID);
              }
            });
          }}
        />
        <br></br>
        <label>Edit Permissions for role:</label>
        <select
          className="roleInput"
          style={{ width: "37%" }}
          onChange={buttonClick}
          required
        >
          <option></option>
          {roleData.map((items, key) => {
            return <option>{items.roleName}</option>;
          })}
        </select>

        {table ? (
          <div>
            <label>Permissions</label>

            <table className="content-table">
              <thead>
                <tr>
                  <td>Resource Name</td>
                  <td>View</td>
                  <td>Add</td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {resources === undefined
                  ? "LOADING"
                  : resources.map((resource, index) => {
                      return (
                        <tr>
                          <td>{resource.resourceName}</td>
                          <td>
                            {permissionData === undefined
                              ? "LOADING"
                              : permissionData.map((permissions, key) => {
                                  if (
                                    resource.id === permissions.resourceId &&
                                    permissions.roleId === currentRole &&
                                    permissions.canView === true
                                  ) {
                                    console.log(permissions);

                                    return (
                                      <div>
                                        <input
                                          type="checkbox"
                                          name="View"
                                          defaultChecked={permissions.canView}
                                          onChange={(e) => {
                                            permissions.canView =
                                              !permissions.canView;
                                            console.log(permissions);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  } else if (
                                    resource.id === permissions.resourceId &&
                                    permissions.roleId === currentRole &&
                                    permissions.canView === false
                                  ) {
                                    return (
                                      <div>
                                        <input
                                          type="checkbox"
                                          name="View"
                                          defaultChecked={permissions.canView}
                                          onChange={(e) => {
                                            permissions.canView =
                                              !permissions.canView;
                                            console.log(permissions);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  }
                                })}
                          </td>
                          <td>
                            {permissionData === undefined
                              ? "LOADING"
                              : permissionData.map((permissions, key) => {
                                  if (
                                    resource.id === permissions.resourceId &&
                                    permissions.roleId === currentRole &&
                                    permissions.canAdd === true
                                  ) {
                                    console.log(permissions);

                                    return (
                                      <div>
                                        <input
                                          type="checkbox"
                                          name="View"
                                          defaultChecked={permissions.canAdd}
                                          onChange={(e) => {
                                            permissions.canAdd =
                                              !permissions.canAdd;
                                            console.log(permissions);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  } else if (
                                    resource.id === permissions.resourceId &&
                                    permissions.roleId === currentRole &&
                                    permissions.canAdd === false
                                  ) {
                                    return (
                                      <div>
                                        <input
                                          type="checkbox"
                                          name="View"
                                          defaultChecked={permissions.canAdd}
                                          onChange={(e) => {
                                            permissions.canAdd =
                                              !permissions.canAdd;
                                            console.log(permissions);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  }
                                })}
                          </td>
                          <td>
                            {permissionData === undefined
                              ? "LOADING"
                              : permissionData.map((permissions, key) => {
                                  if (
                                    resource.id === permissions.resourceId &&
                                    permissions.roleId === currentRole &&
                                    permissions.canEdit === true
                                  ) {
                                    console.log(permissions);

                                    return (
                                      <div>
                                        <input
                                          type="checkbox"
                                          name="View"
                                          defaultChecked={permissions.canEdit}
                                          onChange={(e) => {
                                            permissions.canEdit =
                                              !permissions.canEdit;
                                            console.log(permissions);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  } else if (
                                    resource.id === permissions.resourceId &&
                                    permissions.roleId === currentRole &&
                                    permissions.canEdit === false
                                  ) {
                                    return (
                                      <div>
                                        <input
                                          type="checkbox"
                                          name="View"
                                          defaultChecked={permissions.canEdit}
                                          onChange={(e) => {
                                            permissions.canEdit =
                                              !permissions.canEdit;
                                            console.log(permissions);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  }
                                })}
                          </td>
                          <td>
                            {permissionData === undefined
                              ? "LOADING"
                              : permissionData.map((permissions, key) => {
                                  if (
                                    resource.id === permissions.resourceId &&
                                    permissions.roleId === currentRole &&
                                    permissions.canDelete === true
                                  ) {
                                    console.log(permissions);

                                    return (
                                      <div>
                                        <input
                                          type="checkbox"
                                          name="View"
                                          defaultChecked={permissions.canDelete}
                                          onChange={(e) => {
                                            permissions.canDelete =
                                              !permissions.canDelete;
                                            console.log(permissions);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  } else if (
                                    resource.id === permissions.resourceId &&
                                    permissions.roleId === currentRole &&
                                    permissions.canDelete === false
                                  ) {
                                    return (
                                      <div>
                                        <input
                                          type="checkbox"
                                          name="View"
                                          defaultChecked={permissions.canDelete}
                                          onChange={(e) => {
                                            permissions.canDelete =
                                              !permissions.canDelete;
                                            console.log(permissions);
                                            console.log(e.target.value);
                                          }}
                                        />
                                      </div>
                                    );
                                  }
                                })}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
            <div>
              <button type="submit">Save</button>
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default PermissionsList;
