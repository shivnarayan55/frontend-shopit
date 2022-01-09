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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";

const columns = [
  { id: "ID", label: "ID", minWidth: 5 },

  {
    id: "Name",
    label: "Name",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Description",
    label: "Description",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Price",
    label: "Price",
    minWidth: 50,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Quantity",
    label: "Quantity",
    minWidth: 50,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Actions",
    label: "Actions",
    minWidth: 170,
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

function ProductTable() {
  useEffect(() => {
    getAllProducts();
  }, []);
  var targetBody = {
    id: "",
    productName: "",
    price: "",
    description: "",
    quantity: "",
    imageName: "",

    productCategory: {
      id: "",
      name: "",
    },
  };

  const history = useHistory();

  const [productData, setProductData] = useState([]);

  const url1 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/products/viewAll";

  const accessToken = localStorage.getItem("access token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  useEffect(() => {
    getAllProducts();
  }, [productData]);
  function getAllProducts() {
    try {
      axios.get(url1, config).then((response) => {
        // console.log(response.data);
        setProductData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

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

  const url2 =
    "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/products/delete/";
  const deleteHandler = (id2) => {
    try {
      axios.delete(url2 + id2, config).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <NavLink to="/addProduct">
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "20px" }}
            startIcon={<AddCircleOutlineIcon />}
          >
            Add a Product
          </Button>
        </NavLink>
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, key) => (
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
            {productData.map((products, index) => {
              return (
                <TableBody>
                  <TableCell>{products.id}</TableCell>
                  <TableCell>{products.productName}</TableCell>
                  <TableCell>{products.description}</TableCell>
                  <TableCell>{products.price}</TableCell>
                  <TableCell>{products.quantity}</TableCell>
                  <TableCell>
                    <div style={{ marginLeft: "100px" }}>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();

                          history.push({
                            pathname: "/editProduct",

                            state: [{ ...products }],
                          });
                        }}
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      {
                        <Button
                          style={{ marginLeft: "10px" }}
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                          onClick={(e) => {
                            deleteHandler(products.id);
                          }}
                        >
                          Delete
                        </Button>
                      }
                    </div>
                  </TableCell>
                </TableBody>
              );
            })}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default ProductTable;
