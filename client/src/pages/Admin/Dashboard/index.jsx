import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
  FaUsers,
  FaBook,
  FaChalkboardTeacher,
  FaMoneyBillWave,
} from "react-icons/fa";
import AdminLayout from "../../../Layout/AdminLayout";
import Table from "../../../components/Table";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import VerifiedIcon from "@mui/icons-material/Verified";
import DoNotDisturbAltRoundedIcon from "@mui/icons-material/DoNotDisturbAltRounded";
// import Histogram from "../../../components/statistics/Histogram";
import Linechart from "../../../components/statistics/LineChart";
import Header from "../../../components/Admin/Header";
import apiHelper from "../../../utils/apiHelper";

const session = sessionStorage.getItem("authToken") !== null;
const users = [
  { role: "user" },
  { role: "admin" },
  { role: "super-admin" },
  { role: "student" },
  { role: "professor" },
  { role: "parent" },
]; // Static data

export const PreviewTable = ({ columns, rows, heading }) => {
  return (
    <Box>
      <Typography variant="h6" textAlign={"start"}>
        {heading}
      </Typography>
      <Table columns={columns} rows={rows} />
    </Box>
  );
};

const Index = () => {
  const [users, setusers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const total_customer = users.length;
  useEffect(() => {
    // Add your API call here
    const fetchUsers = async () => {
      try {
        const response = await apiHelper("/user/allusers", {}, "GET");
        const { data } = await response;
        setusers(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchProducts = async () => {
      try {
        const response = await apiHelper("/product", {}, "GET");
        const { data } = await response;
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOrders = async () => {
      try {
        const response = await apiHelper("/order", {}, "GET");
        const { data } = await response;
        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
    fetchProducts();
    fetchUsers();
  }, []);

  const card_data = [
    { id: 1, title: "Total Users", value: total_customer, icon: <FaUsers /> },
    { id: 2, title: "Products", value: products.length || 0, icon: <FaBook /> },
    { id: 3, title: "Orders", value: orders.length || 0, icon: <FaChalkboardTeacher /> },
    { id: 7, title: "Fee Earn", value: "+50", icon: <FaMoneyBillWave /> },
  ];
  const columns = [
    {
      field: "profile",
      headerName: "Profile",
      width: 70,
      renderCell: (params) => (
        <img
          src={"/image/userProfile/defaultUser.png"}
          width={100}
          height={100}
          alt="Profile"
        />
      ),
    },
    {
      field: "enroll_num",
      headerName: "Enrollment No.",
      width: 100,
    },
    {
      field: "name",
      headerName: "User Name",
      width: 150,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },

    {
      field: "verified",
      headerName: "Verified",
      width: 100,
      renderCell: (params) => (
        <IconButton>
          {params.row.verified ? (
            <VerifiedIcon color="primary" />
          ) : (
            <DoNotDisturbAltRoundedIcon color="error" />
          )}
        </IconButton>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params) => (
        <IconButton sx={{ fontSize: "0.9em", width: "4em", height: "4em" }}>
          {params === "admin" ? "Admin" : "User"}
        </IconButton>
      ),
    },
    {
      field: "registration_date",
      headerName: "Registration Date",
      type: "date",
      valueGetter: (params) => {
        let date = new Date(params);
        return date;
      },
      width: 100,
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
        </div>
      ),
    },
  ];
  const handleEdit = (row) => {
    console.log("Edit:", row);
    // Add your edit logic here
  };
  const handleDelete = (row) => {
    console.log("Delete:", row);
    // Add your delete logic here
  };
  const mapUsersToRows = (users) => {
    return users.map((user, index) => ({
      id: index + 1, // Unique ID for each row
      profile: user.image || 'https://via.placeholder.com/40',
      enroll_num: 'N/A', // Placeholder for enroll number
      name: `${user.fName} ${user.lName}`,
      mobile: 'N/A', // Placeholder for mobile number
      email: user.email,
      verified: user.emailVerified,
      role: user.role,
      registration_date: user.createdAt,
    }));
  };
  
  const rows = mapUsersToRows(users);
  const productData = {
    products: ["Product A", "Product B", "Product C", "Product D", "Product E"],
    orders: [10, 20, 15, 30, 25],
  };

  const salesData = {
    products: ["Jan", "Feb", "Mar", "Apr", "May"],
    sales: [1000, 1500, 800, 1200, 1700],
  };
  return (
    <Box>
      <AdminLayout>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          width={"75%"}
        >
          <Header heading={"Dashboard"} />
        </Grid>
        <Grid container spacing={3} sx={{ mt: 3 }} width={"75%"}>
          {card_data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  {item.icon}
                </Avatar>
                <CardContent>
                  <Typography variant="h5">{item.value}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container width={"100%"} my={2}>
          <Box display={"flex"} flexDirection={"row"} width={"75%"}>
            <Box width={"50%"}>
              <Linechart
                title="Product Orders "
                xAxisData={productData.products}
                yAxisData={productData.orders}
                xAxisLabel="Products"
                yAxisLabel="Orders"
              />
            </Box>
            <Box width={"50%"}>
              <PreviewTable
                columns={columns}
                rows={rows}
                heading="Recent Users"
              />
            </Box>
          </Box>

          {/* <Histogram/> */}
          {/* <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Recent Users</Typography>
              <a href="/admin/dashboard/users">View All</a>
            </Box>
            <RecentUser />
          </Grid> */}
        </Grid>
      </AdminLayout>
    </Box>
  );
};

export default Index;
