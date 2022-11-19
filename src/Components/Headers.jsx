import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import WorkIcon from "@mui/icons-material/Work";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button as Buttons } from "react-bootstrap";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Log_Out } from "../store/actions";

const Headers = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.auth);
  const { userInfo } = users;

  setTimeout(() => {
    dispatch(Log_Out());
    localStorage.removeItem("userData");
  }, 86400000);

  const onClickHandler = () => {
    localStorage.removeItem("userData");

    dispatch(Log_Out());
  };
  return (
    <Navbar
      className="sticky-top headers"
      bg="primary"
      variant="dark"
      expand="lg"
    >
      <Container>
        <Navbar.Brand>
          <div className="nav-icon">
            <WorkIcon /> <h3>SuperJob</h3>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {/* {!userInfo?.token && (
              <LinkContainer to="/auth">
                <Nav.Link>Auth</Nav.Link>
              </LinkContainer>
            )} */}
            <LinkContainer to="/job">
              <Nav.Link>FindJob</Nav.Link>
            </LinkContainer>
            <LinkContainer className="me-2" to="/post">
              <Nav.Link>PostJob</Nav.Link>
            </LinkContainer>
            {userInfo?.token && (
              <span>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <Image
                      boxSize="2rem"
                      borderRadius="full"
                      src="/assests/user1.png"
                      alt="Fluffybuns the destroyer"
                      mr="12px"
                    />
                  </MenuButton>
                  <MenuList>
                    <Link to="/profile">
                      <MenuItem minH="48px">Profile</MenuItem>
                    </Link>
                    <MenuItem minH="40px">
                      <Link to="/auth">
                        <Buttons onClick={onClickHandler}>LogOut</Buttons>
                      </Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Headers;
