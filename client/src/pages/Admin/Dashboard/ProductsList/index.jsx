import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
// import Table from " ../../../components/Table";
import Table from "../../../../components/Table";
import Header from "../../../../components/Admin/Header";
import AdminLayout from "../../../../Layout/AdminLayout";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import AddProductModal from "../../../../components/Modals/AddProductModal";
import CancelIcon from "@mui/icons-material/Cancel";
import apiHelper from "../../../../utils/apiHelper";
import CircularLoader from "../../../../components/Loaders/CircularLoader";

const Index = () => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([
    // Your initial product data here
  ]);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await apiHelper("/product", {}, "GET");
        const { data } = await response;
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.image || "/image/product/defaultProduct.png"}
          width={100}
          height={100}
          alt="Product"
        />
      ),
    },
    {
      field: "id",
      headerName: "Product ID",
      width: 100,
    },
    {
      field: "name",
      headerName: "Product Name",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
    },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 100,
      renderCell: (params) => (
        <IconButton>
          {params.row.inStock ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
        </IconButton>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      renderCell: (params) => <div>{params.row.category || "N/A"}</div>,
    },
    {
      field: "addedDate",
      headerName: "Added Date",
      type: "date",
      valueGetter: (params) => {
        let date = new Date(params?.row?.addedDate);
        return date;
      },
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => handleDelete(params.row)}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)} color="primary">
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  const handleEdit = (row) => {
    console.log("Edit:", row);
    // Add your edit logic here
  };

  const handleDelete = (row) => {
    setSelectedProduct(row);
    setOpenConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      const response = await apiHelper(
        `/product/${selectedProduct.id}`,
        {},
        "DELETE"
      );
      console.log("Deleted:", selectedProduct);
      // Add your delete logic here
      window.location.reload();
    }
    setOpenConfirmDelete(false);
  };

  const handleCloseModal = () => {
    setOpenConfirmDelete(false);
    setSelectedProduct(null);
  };
  const productsMap = products.map((product) => {
    return {
      id: product._id,
      image: product.imageUrl[0],
      name: product.name,
      price: product?.price || 0,
      description: product.description,
      inStock: product.inStock,
      category: product.category,
      addedDate: product.addedDate,
    };
  });
  const rows = productsMap || [];
  const handleAddProduct = async (newProduct) => {
    setLoading(true);
    try {
      const response = await apiHelper("/product", {}, "POST", {
        ...newProduct,
        imageUrl: newProduct.images,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddProduct = () => {
    setOpenAddProduct(true);
  };

  const handleCloseAddProduct = () => {
    setOpenAddProduct(false);
  };
  return (
    <AdminLayout>
      {loading ?? <CircularLoader />}
      <Header heading={"Product List"} />
      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2, ml: 2 }}>
        <Button
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
          color="primary"
          onClick={handleOpenAddProduct}
        >
          Add Product
        </Button>
      </Box>
      <Table columns={columns} rows={rows} />
      <ConfirmationModal
        open={openConfirmDelete}
        title="Confirm Deletion"
        handleClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the product "${selectedProduct?.name}"? This action cannot be undone.`}
      />
      <AddProductModal
        open={openAddProduct}
        handleClose={handleCloseAddProduct}
        onAdd={handleAddProduct}
      />
    </AdminLayout>
  );
};

export default Index;
