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
import axios from "axios";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { FaAngleDown } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const columns = [
  { id: "ID", label: "ID", minWidth: 10 },
  { id: "Username", label: "Username", minWidth: 100, align: "left" },
  {
    id: "Address",
    label: "Address",
    minWidth: 250,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Order Status",
    label: "Order Status",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Total Price",
    label: "Total Price",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
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

function OrderTable() {
  const [orderData, setOrderData] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  useEffect(() => {
    getAllOrders();
  }, []);

  const url1 =
    "http://Shopitproducts-env.eba-pqdd3ppe.ap-south-1.elasticbeanstalk.com/cart/viewAllOrder";
  const url2 =
    "http://Shopitproducts-env.eba-pqdd3ppe.ap-south-1.elasticbeanstalk.com/cart/deleteOrderById/";
  const url3 =
    "http://Shopitproducts-env.eba-pqdd3ppe.ap-south-1.elasticbeanstalk.com/cart/deleteOrderDataByUsername/";
  const accessToken = localStorage.getItem("access token");

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const history = useHistory();

  useEffect(() => {
    getAllOrders();
  }, [orderData]);

  const getAllOrders = () => {
    try {
      axios.get(url1, config).then((response) => {
        // console.log(response.data);
        setOrderData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
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

  const deleteHandler = (username, id) => {
    try {
      axios.delete(url2 + id, config).then((response) => {
        console.log(response.data);
        axios.delete(url3 + username, config).then((resp) => {
          console.log(resp);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
          {orderData.map((items, index) => {
            return (
              <TableBody>
                <TableCell>{items.id}</TableCell>
                <TableCell>{items.username}</TableCell>
                <TableCell align="center">{items.address}</TableCell>
                <TableCell align="center">{items.orderStatus}</TableCell>
                <TableCell align="left">{items.totalPrice}</TableCell>

                <TableCell>
                  <Button
                    style={{ marginLeft: "50px" }}
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={(e) => {
                      e.preventDefault();

                      history.push({
                        pathname: "/editOrder",

                        state: [{ ...items }],
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      deleteHandler(items.username, items.id);
                    }}
                    style={{ marginLeft: "10px" }}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableBody>
            );
          })}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orderData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default OrderTable;
