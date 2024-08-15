import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../reducers/ExpandSlice";
import { MdArrowForwardIos } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { RiLogoutCircleFill, RiSettingsLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { adminSideBarLinks } from "../../../data/admin";

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 300,
  transition: "width 0.2s",
  backgroundColor: theme.palette.background.paper,
  height: "100vh",
  [theme.breakpoints.up("md")]: {
    width: 350,
  },
}));

const SidebarToggle = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const SidebarList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  alignItems: "center",
  justifyContent: "center",
}));

export const DetailedLinks = ({ adminSideBarLinks }) => {
  const initialToggleState = Array(adminSideBarLinks.length).fill(false);
  initialToggleState[0] = true;
  const [toggleLinks, setToggleLinks] = useState(initialToggleState);
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggle = (index) => {
    setToggleLinks((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  return (
    <Box p={2}>
      {adminSideBarLinks.slice(1, adminSideBarLinks.length).map((item, index) => (
        <Box key={index}>
          <ListItem button onClick={() => handleToggle(index)}>
            <ListItemText primary={item?.heading} />
            <MdArrowForwardIos
              style={{
                transform: toggleLinks[index] ? "rotate(-90deg)" : "rotate(90deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </ListItem>
          <Collapse in={toggleLinks[index]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item?.links?.map((subItem, subIndex) => (
                <ListItem
                  button
                  key={subIndex}
                  selected={location.pathname === subItem.link}
                  onClick={() => navigate(subItem.link)}
                >
                  <ListItemIcon>{subItem.icon}</ListItemIcon>
                  <ListItemText primary={subItem.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default function Sidebar() {
  const location = useLocation();
  const session = ""; // Placeholder for user session
  const dispatch = useDispatch();
  const { expandSidebar } = useSelector((state) => state);
  const expand = expandSidebar.expandSidebar;
  const navigate = useNavigate();

  const handleExpand = () => {
    dispatch(toggleSidebar());
  };

  return (
    <SidebarContainer
      sx={{
        width: expand ? 350 : 300,
        transition: "width 0.2s",
      }}
    >
      <SidebarToggle onClick={handleExpand}>
        <MdArrowForwardIos
          style={{
            transform: expand ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s",
          }}
        />
      </SidebarToggle>

      <SidebarHeader>
        <Avatar
          src={session?.user?.image || "/image/userProfile/defaultUser.png"}
          sx={{ width: 100, height: 100 }}
        />
        {expand && (
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">Welcome back 👋</Typography>
            <Typography variant="h6">{session?.user?.name || "jaspreet singh"}</Typography>
          </Box>
        )}
      </SidebarHeader>

      <List>
        {adminSideBarLinks[0].links.map((item, index) => (
          <ListItem
            button
            key={index}
            selected={location.pathname === item.link}
            onClick={() => navigate(item.link)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>

      <DetailedLinks adminSideBarLinks={adminSideBarLinks} />

      <nav>
        <SidebarList>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <RiSettingsLine />
            </ListItemIcon>
          </ListItem>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <IoNotificationsSharp />
            </ListItemIcon>
          </ListItem>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <AiFillMessage />
            </ListItemIcon>
          </ListItem>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <RiLogoutCircleFill />
            </ListItemIcon>
          </ListItem>
        </SidebarList>
      </nav>
    </SidebarContainer>
  );
}


