import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <div className="footers">
      <Container fluid>
        <Row>
          <Col className="text-center" lg={4}>
            <h2>Address</h2>

            <span className="d-block small">Uttara, Dhaka-1230</span>

            <span className="d-block small">Bangladesh</span>
          </Col>
          <Col className="text-center" lg={4}>
            <h2>About Us</h2>
            <p className="small">
              {" "}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui rem
              labore aliquid nihil. Tempore quas labore odit modi, adipisci
              excepturi.
            </p>
          </Col>
          <Col className="text-center" lg={4}>
            <h2>Contact Us</h2>
            <span className="d-block"> Mobile: ++4274444444</span>
            <span className="d-block"> Email: contact@gmail.com</span>
            <div>
              <FacebookIcon />
              <LinkedInIcon />
              <TwitterIcon />
              <InstagramIcon />
            </div>
          </Col>
          <p className="text-center mt-2 small text-light">
            Copyright © 2022 SuperShop | All Rights Reserved
          </p>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
