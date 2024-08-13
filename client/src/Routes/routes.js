import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import Paints from "../pages/Paints";
import Sanitary from "../pages/Sanitary";
import Auth from "../pages/Auth";
import PaintDetail from "../pages/Paints/PaintDetail";
import Hardware from "../pages/Hardware";
import Dashboard from "../pages/Admin/Dashboard";
import Users_List from "../pages/Admin/Dashboard/Users_List";
import ProductList from "../pages/Admin/Dashboard/ProductsList";
import Wishlist from "../pages/Wishlist";
import AboutUs from "../pages/AboutUs";
import Career from "../pages/Career";
import NewsEvents from "../pages/NewsEvents";
import Brands from "../pages/Brands";
import ProductsCatalogue from "../pages/ProductsCatalogue";
import Blog from "../pages/Blog";
import FAQs from "../pages/FAQs";
import Affiliate from "../pages/Affiliate";
import TrackOrder from "../pages/TrackOrder";
import TermsConditions from "../pages/TermsConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ReturnsPolicy from "../pages/ReturnsPolicy";
import ShippingPolicy from "../pages/ShippingPolicy";
import Installation_service from "../pages/Installation_service";
export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <Products />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/contact",
    element: <Contact isManifestEnabled={true} />,
  },
  {
    path: "/paints",
    element: <Paints />,
  },
  {
    path: "/paints/:id",
    element: <PaintDetail />,
  },
  {
    path: "/sanitary",
    element: <Sanitary />,
  },
  {
    path: "/hardware",
    element: <Hardware />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/dashboard/users",
    element: <Users_List />,
  },
  {
    path: "/admin/dashboard/products",
    element: <ProductList />,
  },
  {
    path: "Installation_service",
    element: <Installation_service/>,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/career",
    element: <Career />,
  },
  {
    path: "/news-events",
    element: <NewsEvents />,
  },
  {
    path: "/brands",
    element: <Brands />,
  },
  {
    path: "/products-catalogue",
    element: <ProductsCatalogue />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/faqs",
    element: <FAQs />,
  },
  {
    path: "/affiliate",
    element: <Affiliate />,
  },
  {
    path: "/track-order",
    element: <TrackOrder />,
  },
  {
    path: "/terms-conditions",
    element: <TermsConditions />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/returns-policy",
    element: <ReturnsPolicy />,
  },
  {
    path: "/shipping-policy",
    element: <ShippingPolicy />,
  }
];
