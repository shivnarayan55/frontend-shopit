import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./UserManagement.css";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import UserModal from "./UserModal";

const columns = [
  { id: "ID", label: "ID", minWidth: 170 },
  { id: "Name", label: "Name", minWidth: 100 },
  {
    id: "Username",
    label: "Username",
    minWidth: 50,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Email",
    label: "Email",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "Authority",
    label: "Authority",
    minWidth: 245,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Actions",
    label: "Actions",
    minWidth: 10,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

function UserTable() {
  const history = useHistory();

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [user, setUser] = useState([]);
  const [userRole, setUserRole] = useState([]);

  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const url1 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/users/viewAll";
  const url2 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/access/getUserRole";

  useEffect(() => {
    buttonHandler();
  }, []);

  function buttonHandler() {
    const accessToken = localStorage.getItem("access token");
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    try {
      axios.get(url1, config).then((response) => {
        console.log(response.data);

        setUser(response.data);
        try {
          axios.get(url2, config).then((response) => {
            console.log(response.data);
            setUserRole(response.data);
          });
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Paper style={{ height: "300px" }} className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {user.map((items, key) => (
              <TableRow>
                <TableCell>{items.id}</TableCell>
                <TableCell>{items.name}</TableCell>
                <TableCell>{items.username}</TableCell>

                <TableCell>{items.email}</TableCell>

                <TableCell>{items.authority}</TableCell>
                <TableCell>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      history.push({
                        pathname: "/editUser",

                        state: [{ ...items }],
                      });
                    }}
                    style={{ marginRight: "150px" }}
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>

                  {/* <Button
                    style={{ marginLeft: "110px", marginTop: "0px" }}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default UserTable;
