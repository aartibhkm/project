import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Banner from "../../components/Banner";
import "../../styles/home.css";
import StarRatings from "react-star-ratings";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import apiHelper from "../../utils/apiHelper";
export const HeroSection = () => {
  return (
    <section className="hero">
      <h2>Quality Sanitary Hardware for Every Need</h2>
      <p>
        Discover our range of top-quality products designed to meet your needs.
      </p>
      <button>Shop Now</button>
    </section>
  );
};
export const AboutSection = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      id="about"
      className="about"
    >
      <Box width={"49%"}>
        <Typography variant={"h4"} textAlign={"start"}>
          About Us
        </Typography>
        <Typography variant="subtitle2" textAlign={"start"}>
          We are a leading provider of sanitary hardware, offering top-notch
          products and solutions for both residential and commercial
          applications.
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        sx={{
          width: "49%",
          "> img": {
            width: "50%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            "&:first-child": {
              marginRight: "1rem",
            },
          },
        }}
        className="about-content"
      >
        <>
          <img
            src={"/images/a1.jpg"}
            alt="About Us 1"
            className="about-image"
          />
          <img
            src={"/images/a2.jpg"}
            alt="About Us 2"
            className="about-image"
          />
        </>
      </Box>
    </Box>
  );
};
export const OurProducts = ({ data }) => {
  const [category, setCategory] = useState("Paint");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async (_category) => {
      setLoading(true);
      try {
        const response = await apiHelper(
          "/product",
          {
            category: _category,
          },
          "GET"
        );
        const { data } = response;
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts(category);
  }, [category]);

  const { heading } = data;
  return (
    <section id="products" className="products">
      <Box
        display={"flex"}
        alignItems={"center"}
        my={2}
        justifyContent={"space-between"}
      >
        <Typography variant="h4" textAlign={"start"}>
          {heading}
        </Typography>
        <Button variant="outlined" textAlign={"end"}>
          view All{" "}
        </Button>
      </Box>
      <Box my={2}>
        {["Paint", "Sanitary", "Hardware"].map((__category, index) => (
          <Button
            key={index}
            onClick={() => {
              setCategory(__category);
            }}
            variant="contained"
            color={__category === category ? "primary" : "inherit"}
            sx={{
              borderRadius: 20,
              margin: 0.5,
              textTransform: "capitalize",
              paddingX: 2,
              paddingY: 1,
              fontWeight: "bold",
              fontSize: "0.875rem",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            {__category}
          </Button>
        ))}
      </Box>

      <Box className="product-list" justifyContent={"flex-start"}>
        {products?.slice(0,8)?.map((product, index) => {
          const { name, description, imageUrl } = product;
          return (
            <Card className="product-card" key={index}>
              <img
                src={imageUrl[0]}
                alt={"product.name"}
                className="product-image"
              />
              <CardContent>
                <Typography variant="h6">
                  {name.length > 20 ? name.substr(0, 20) + ".." : name}
                </Typography>
                <Typography variant="body2">
                  {description.length > 80 ? description.substr(0, 80) + ".." : description}
                </Typography>
                <StarRatings
                  rating={product.rating} // Replace with dynamic rating if needed
                  starRatedColor="gold"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="5px"
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  ₹{product.price}
                </Typography>
                <button
                  onClick={() => {
                    const url = `product/${product.category}?id=${product._id}`;
                    window.location.href = url;
                  }}
                >
                  View Product
                </button>
              </CardContent>
            </Card>
          );
        })}
        {/* Add more product cards as needed */}
      </Box>
    </section>
  );
};
export const CustomerBenifits = () => {
  const data = [
    {
      heading: "FREE SHIPPING",
      description: "Fast & Ontime Delivery For Delhi customers",
      icon: <LocalShippingOutlinedIcon />,
    },
    {
      heading: "SATISFACTION",
      description: "99% Guaranteed Satisfaction",
      icon: <HubOutlinedIcon />,
    },
    {
      heading: "ORIGNAL PRODUCTS",
      description: "100% Authentic & Branded Products",
      icon: <ThumbUpOffAltOutlinedIcon />,
    },
    {
      heading: "DEALS",
      description: "Transparent & Competitive Best Pricing",
      icon: <TipsAndUpdatesOutlinedIcon />,
    },
  ];
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      gap={6} // Increased gap for better spacing
      py={5} // Slightly increased padding for more space
      px={2} // Added padding for better content alignment
      borderRadius={2} // Rounded corners for a modern feel
      boxShadow={2} // Added subtle shadow for depth
    >
      {data.map((item, index) => (
        <Box
          key={index}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={0.2} // Increased gap for better spacing between elements
          textAlign="center" // Centered text alignment for all elements
          // maxWidth={180} // Restricted width for better layout on smaller screens
        >
          {item.icon}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {item.heading}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#424242", marginTop: "4px" }}
          >
            {item.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
const index = () => {
  const banners = [
    {
      img: {
        src: "/images/banner/home/home_banner-4.png",
        alt: "Banner 1",
      },
    },
    {
      img: {
        src: "/images/banner/home/home_banner-5.png",
        alt: "Banner 2",
      },
    },
    {
      img: {
        src: "/images/banner/home/home_banner-6.png",
        alt: "Banner 3",
      },
    },
    {
      img: {
        src: "/images/banner/home/home_banner-7.png",
        alt: "Banner 3",
      },
    },
  ];
  const products = {
    heading: "Our Products",
  };
  return (
    <div className="__home">
      <Banner data={banners} />
      <CustomerBenifits />
      <HeroSection />
      <AboutSection />
      <OurProducts data={products} />
    </div>
  );
};

export default index;
