import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import { Button, Link } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

// Styled Components
const LogoBox = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(4),
  width: 200,
  display: "flex",
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 250,
  role: "presentation",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "black",
  textDecoration: "none",
  margin: theme.spacing(2),
  fontWeight: 700,
  position: "relative",
  "&:hover": {
    color: "#007FFF",
    cursor: "pointer",
    "&::after": {
      width: "100%",
      left: 0,
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    width: "0",
    height: "2px",
    bottom: "-4px",
    left: "50%",
    backgroundColor: "#007FFF",
    transition: "all 0.3s ease-in-out",
  },
}));

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Index() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Check if authToken exists in session storage
  const authToken = sessionStorage.getItem("authToken");
  const session = !!authToken;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setMobileOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    window.location.href = "/"; // Redirect to home page after logout
  };

  const links = [
    {
      name: "Home",
      link: "/",
      subDescription: "Return to the homepage and explore our offerings.",
    },
    {
      name: "Paints",
      link: "/paints",
      subDescription:
        "Browse our wide selection of premium paints and coatings.",
    },
    {
      name: "Sanitary",
      link: "/sanitary",
      subDescription:
        "Discover our sanitary products for your home and business.",
    },
    {
      name: "Hardware",
      link: "/hardware",
      subDescription: "Find high-quality hardware tools and accessories.",
    },
    {
      name: "Installation/service",
      link: "/Installation_service",
      subDescription: "Find high-quality hardware tools and accessories.",
    },
    {
      name: "Contact",
      link: "/contact",
      subDescription: "Get in touch with us for inquiries and support.",
    }
  ];

  const drawer = (
    <DrawerContent onClick={handleCloseNavMenu} onKeyDown={handleCloseNavMenu}>
      <IconButton onClick={handleCloseNavMenu}>
        <CloseIcon />
      </IconButton>
      <Divider />
      <List>
        {links.map((page, index) => {
          return (
            <Link
              key={index}
              href={page?.link}
              underline={"none"}
              color={"black"}
            >
              <ListItem
                button
                onClick={handleCloseNavMenu}
              >
                <ListItemText
                  primary={page?.name}
                  secondary={page?.subDescription ?? ""}
                />
              </ListItem>
              <Divider />
            </Link>
          );
        })}
      </List>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            display: "flex",
            margin: "1em auto",
            width: "90%",
          }}
          onClick={() => {
            window.location.href = "/auth";
          }}
        >
          Register/Login
        </Button>
      </Box>
    </DrawerContent>
  );

  return (
    <AppBar position="sticky" sx={{ background: "white" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <LogoBox>
            <img src="/logo_main.png" alt="main logo" loading="lazy" />
          </LogoBox>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={mobileOpen}
              onClose={handleCloseNavMenu}
              ModalProps={{ keepMounted: true }}
              width={250}
            >
              {drawer}
            </Drawer>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {links.map((link, index) => (
              <StyledLink
                href={link.link}
                key={index}
                onClick={handleCloseNavMenu}
              >
                {link.name}
              </StyledLink>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ color: "black" }}
              aria-label="cart"
              onClick={() => {
                window.location.href = "/cart";
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
            <Tooltip title="Open settings">
              {!session ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleOutlinedIcon color="action" />
                </IconButton>
              ) : (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: 3 }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!session ? (
                <>
                  <Box
                    padding={2}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={2}
                    onClick={() => {
                      window.location.href = "/auth";
                    }}
                  >
                    <Box>
                      <Typography textAlign="center">
                        Welcome to Kailash Hardware
                      </Typography>
                    </Box>
                    <Box onClick={handleCloseUserMenu}>
                      <Button
                        variant={"outlined"}
                        disableFocusRipple
                        component={"button"}
                        sx={{
                          textTransform: "capitalize",
                          width: "90%",
                        }}
                      >
                        Register/Login
                      </Button>
                    </Box>
                  </Box>
                </>
              ) : (
                settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === "Logout" ? handleLogout : handleCloseUserMenu
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Index;
