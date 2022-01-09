import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 20,
  },
});

function RoleTable() {
  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    roles();
  }, []);

  const [role, setRole] = useState([]);

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

  return (
    <div>
      <div>
        <Button
          onClick={() => {
            history.push("/accessManagement");
          }}
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          startIcon={<AddCircleOutlineIcon />}
        >
          Add a Role
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell width="5%" align="left">
                Roles
              </StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {role.map((roles, index) => {
              return (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {roles.roleID}
                  </StyledTableCell>
                  <StyledTableCell size="10%" align="left">
                    {roles.roleName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      onClick={() => {
                        history.push({
                          pathname: "/permissions",
                          state: [roles.roleName, roles.roleID],
                        });
                      }}
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RoleTable;
