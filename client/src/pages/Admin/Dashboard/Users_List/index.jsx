import React from "react";
import { useState,useEffect } from "react";
import { Box, IconButton } from "@mui/material";
// import Table from " ../../../components/Table";
import Table from "../../../../components/Table";
import Header from "../../../../components/Admin/Header";
import AdminLayout from "../../../../Layout/AdminLayout";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import VerifiedIcon from "@mui/icons-material/Verified";
import DoNotDisturbAltRoundedIcon from "@mui/icons-material/DoNotDisturbAltRounded";
import apiHelper from "../../../../utils/apiHelper";

const Index = () => {
  const [users, setusers] = useState([]);
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
    fetchUsers();
  }, []);

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
            <VerifiedIcon  color="primary"/>
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
        <IconButton sx={{fontSize:"0.9em" , width:"4em" , height:"4em"}}>{params === "admin" ? "Admin" : "User"}</IconButton>
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
  
  const rows = mapUsersToRows(users) || [];

  return (
    <AdminLayout>
      <Header heading={"Users List"}
      />
      <Table columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default Index;
