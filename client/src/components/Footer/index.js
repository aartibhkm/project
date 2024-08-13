import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  TextField,
  Button,
  styled,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Pinterest,
  YouTube,
} from "@mui/icons-material";

// Styled components
const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: "#1c1c1c",
  color: "#fff",
  padding: theme.spacing(6, 0),
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4, 0),
  },
}));

const FooterWave = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "100px",
  backgroundColor: "#1c1c1c",
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)",
  zIndex: -1,
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(2),
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
  display: "block",
  marginBottom: theme.spacing(1),
  "&:hover": {
    color: theme.palette.primary.main,
    textDecoration: "underline",
    transition: "color 0.3s ease",
  },
}));

const NewsletterInput = styled(TextField)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  width: "100%",
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// Data for footer sections
const footerSections = [
  {
    title: "Shop",
    links: [
      { text: "Hardware", href: "#" },
      { text: "Paints", href: "#" },
      { text: "Appliances", href: "#" },
      { text: "Sanitary", href: "#" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { text: "About Us", href: "/about-us" },
      { text: "Career", href: "#" },
      { text: "News & Events", href: "#" },
      { text: "Brands", href: "#" },
      { text: "Products Catalogue", href: "#" },
      { text: "Blog", href: "#" },
      { text: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Other Links",
    links: [
      { text: "FAQ's", href: "#" },
      { text: "Affiliate", href: "#" },
      { text: "Track Your Order", href: "#" },
      { text: "Terms & Conditions", href: "#" },
      { text: "Privacy Policy", href: "#" },
      { text: "Returns Policy", href: "#" },
      { text: "Shipping Policy", href: "#" },
    ],
  },
  {
    title: "Contact Details",
    links: [
      { text: "080-29769845", href: "#" },
      { text: "+91 9008711121", href: "#" },
      {
        text: "sales@kailash_hardware.in",
        href: "mailto:sales@kailash_hardware.in",
      },
      {
        text: "No 192/6, Opposite Indian Oil, Sarjapur Main Road, Dommasandra, Delhi, 110041, new Delhi",
        href: "#",
      },
    ],
  },
];

// Footer Component
const Footer = () => {
  return (
    <StyledFooter>
      <FooterWave />
      <Container>
        <Grid container spacing={2}>
          {footerSections.map((section, index) => {
            if (index === 3) {
              return (
                <Grid item xs={12} md={3} key={index}>
                   
                  <FooterSection>
                    {section.links.map((link, linkIndex) => (
                      <FooterLink href={link.href} key={linkIndex}>
                        {link.text}
                      </FooterLink>
                    ))}
                  </FooterSection>
                </Grid>
              );
            }
            return (
              <Grid item xs={12} md={3} key={index}>
                <FooterSection>
                  <Typography variant="h6" gutterBottom>
                    {section.title}
                  </Typography>
                  {section.links.map((link, linkIndex) => (
                    <FooterLink href={link.href} key={linkIndex}>
                      {link.text}
                    </FooterLink>
                  ))}
                </FooterSection>
              </Grid>
            );
          })}
           
        </Grid>

        <Divider sx={{ my: 4, borderColor: "#444" }} />
        <Grid container spacing={2} justifyContent="center">
          <IconButton color="inherit" href="https://facebook.com">
            <Facebook />
          </IconButton>
          <IconButton color="inherit" href="https://twitter.com">
            <Twitter />
          </IconButton>
          <IconButton color="inherit" href="https://instagram.com">
            <Instagram />
          </IconButton>
          <IconButton color="inherit" href="https://linkedin.com">
            <LinkedIn />
          </IconButton>
          <IconButton color="inherit" href="https://pinterest.com">
            <Pinterest />
          </IconButton>
          <IconButton color="inherit" href="https://youtube.com">
            <YouTube />
          </IconButton>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          &copy; 2024 kailash_hardware . Design By -  kailash_hardware Team
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
