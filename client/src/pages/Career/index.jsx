import React from "react";
import "../../styles/AboutUs.css"; // Import CSS for the AboutUs component
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Import icons from react-icons

const Index = () => {
  return (
    <div className="about-us">
      <div className="banner">
        <img
          src={"/images/a2.jpg"}
          alt="Kailash Hardware and Sanitary Store"
          className="banner-image"
        />
      </div>
      <div className="about-us-content">
        <h1>
          <b>
            <i>Welcome to Kailash Hardware, Sanitary & Paints Products</i>
          </b>
        </h1>
        <p>
          <b>
            <i>
              At Kailash Hardware and Sanitary Products, we are more than just a
              store; we are your trusted partner in all things hardware and
              sanitary. Established with a vision to provide high-quality
              products and exceptional service, we have been serving our valued
              customers with dedication and integrity for 12 years.
            </i>
          </b>
        </p>

        <h2>
          <b>
            <i>Our Story</i>
          </b>
        </h2>
        <p>
          <b>
            <i>
              Founded in 2014, Kailash Hardware and Sanitary Products began with
              a simple goal: to offer top-notch hardware and sanitary solutions
              for homes and businesses. Our founders, Kailash Vats, envisioned a
              place where customers could find reliable products and expert
              advice under one roof. Over the years, our commitment to quality
              and customer satisfaction has fueled our growth, making us a
              leading name in the industry.
            </i>
          </b>
        </p>

        <h2>
          <b>
            <i>Our Mission</i>
          </b>
        </h2>
        <p>
          <b>
            <i>
              Our mission is to enhance the lives of our customers by providing:
            </i>
          </b>
        </p>
        <ul>
          <li>
            <strong>High-Quality Products</strong>: We offer a comprehensive
            range of hardware tools, plumbing fixtures, sanitary ware, and
            accessories sourced from trusted manufacturers.
          </li>
          <li>
            <strong>Exceptional Service</strong>: Our knowledgeable staff is
            dedicated to assisting you with product selection, technical advice,
            and after-sales support.
          </li>
          <li>
            <strong>Innovative Solutions</strong>: We stay ahead of industry
            trends to bring you the latest products and technologies that meet
            your needs.
          </li>
        </ul>

        <h2>
          <b>
            <i>What We Offer</i>
          </b>
        </h2>
        <p>
          <b>
            <i>At Kailash Hardware and Sanitary Products, you’ll find:</i>
          </b>
        </p>
        <ul>
          <li>
            <strong>Hardware Tools</strong>: From hand tools to power tools, we
            have everything you need for your projects.
          </li>
          <li>
            <strong>Sanitary Ware</strong>: Explore our selection of toilets,
            faucets, and more, designed for both style and functionality.
          </li>
          <li>
            <strong>Plumbing Fixtures</strong>: Quality pipes, fittings, and
            accessories for all your plumbing needs.
          </li>
          <li>
            <strong>Expert Advice</strong>: Our team of experts is always ready
            to provide guidance and solutions tailored to your specific
            requirements.
          </li>
        </ul>

        <h2>
          <b>
            <i>Why Choose Us?</i>
          </b>
        </h2>
        <ul>
          <li>
            <strong>Experience and Expertise</strong>: With years of experience
            in the industry, we have the knowledge and skills to address all
            your hardware and sanitary needs.
          </li>
          <li>
            <strong>Customer-Centric Approach</strong>: We prioritize your
            satisfaction and strive to provide personalized service and support.
          </li>
          <li>
            <strong>Quality Assurance</strong>: We are committed to offering
            products that meet the highest standards of quality and durability.
          </li>
        </ul>

        <h2>
          <b>
            <i>Our Values</i>
          </b>
        </h2>
        <ul>
          <li>
            <strong>Integrity</strong>: We believe in honest and transparent
            business practices.
          </li>
          <li>
            <strong>Customer Focus</strong>: Your needs and concerns are at the
            forefront of everything we do.
          </li>
          <li>
            <strong>Excellence</strong>: We are dedicated to continuous
            improvement and excellence in our products and services.
          </li>
        </ul>

        <h2>
          <b>
            <i>Visit Us</i>
          </b>
        </h2>
        <p>
          <b>
            <i>
              We invite you to visit our store at C-169, shop no.2 Gali no.8,
              Majlis Park (near Ram Mandir) and experience firsthand the quality
              and service that set us apart. Our friendly staff is here to help
              you find exactly what you need and answer any questions you may
              have.
            </i>
          </b>
        </p>

        <h2>
          <b>
            <i>Get in Touch</i>
          </b>
        </h2>
        <p>
          <b>
            <i>
              For more information or to inquire about our products and
              services, please contact us at 9910424992 or email
              kvats9910@gmail.com. Follow us on the following platforms to stay
              updated on the latest products, promotions, and news.
            </i>
          </b>
        </p>

        <div className="social-media">
          <a
            href="https://www.facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/company/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>

        <p>
          Thank you for choosing Kailash Hardware and Sanitary Products. We look
          forward to serving you!
        </p>
      </div>
    </div>
  );
};

export default Index;
