import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./AccessManagement.css";

const AccessControl = () => {
  const url =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/access/viewAllResources";
  const fetchResources = () => {
    axios.get(url).then((response) => {
      console.log(response.data);
      setResources(response.data);
    });
  };

  useEffect(() => {
    fetchResources();
    console.log(resources);
  }, []);

  const [resources, setResources] = useState();
  const [permissions, setPermissions] = useState({
    resourceId: "",
    canAdd: false,
    canDelete: false,
    canEdit: false,
    canView: false,
  });

  const [roleName, setRoleName] = useState("");

  const permissionList = new Array();

  const resourceMap = new Map();
  const history = useHistory();

  var request = new Array();
  for (const resourceItem in resources) {
    resourceMap.set(resources[resourceItem].resourceName, permissions);
    const id = parseInt(resourceItem);
    permissionList.push({
      ...permissions,
      resourceId: id + 1,
    });
  }

  const postHandler = async () => {
    const requestBody = {
      roleName: roleName,
      permissionList: [...permissionList],
    };
    console.log(requestBody);

    await axios
      .post(
        "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/access/createRolewithPerm",
        requestBody
      )
      .then((response) => console.log(response.data));
    window.alert("role created");
  };

  return (
    <div className="accessTable">
      <div>
        <div>
          <h1>Create Role</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              postHandler();
            }}
          >
            <div>
              <label for="name">Role Name</label>
              <input
                className="roleInput"
                style={{ width: "46%" }}
                id="name"
                value={roleName}
                type="text"
                placeholder="Enter Role name"
                autoComplete="off"
                onChange={(e) => {
                  setRoleName(e.target.value);
                }}
              />
            </div>
            <br></br>
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
                              <div>
                                <input
                                  type="checkbox"
                                  name="View"
                                  onChange={(e) => {
                                    permissionList[index].canView =
                                      !permissionList[index].canView;
                                    console.log(permissionList[index]);
                                  }}
                                />
                              </div>
                            </td>
                            <td>
                              <div>
                                <input
                                  className="w-5 h-5"
                                  type="checkbox"
                                  name="add"
                                  onChange={(e) => {
                                    permissionList[index].canAdd =
                                      !permissionList[index].canAdd;
                                    console.log(permissionList[index]);
                                  }}
                                />
                              </div>
                            </td>
                            <td>
                              <div>
                                <input
                                  type="checkbox"
                                  name="edit"
                                  onChange={() => {
                                    permissionList[index].canEdit =
                                      !permissionList[index].canEdit;
                                    console.log(permissionList[index]);
                                  }}
                                />
                              </div>
                            </td>
                            <td>
                              <div>
                                <input
                                  type="checkbox"
                                  name="delete"
                                  onChange={() => {
                                    permissionList[index].canDelete =
                                      !permissionList[index].canDelete;
                                    console.log(permissionList[index]);
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>

            <div>
              <button type="submit">Create Role</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;
