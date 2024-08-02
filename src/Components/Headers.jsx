import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Log_Out } from "../store/actions";
import { MdWorkspacePremium } from "react-icons/md";

const Headers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const users = useSelector((state) => state.auth);
  const { userInfo } = users;

  const onClickHandler = () => {
    localStorage.removeItem("userData");

    dispatch(Log_Out());

    navigate("/login");
  };
  return (
    <Navbar
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className="sticky-top headers bg-custom-gradient h-[64px]"
      variant="dark"
      expand="lg"
    >
      <Container className="px-2 sm:px-4">
        <Navbar.Brand>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-[30px] text-white font-dancingScript">
              SuperJob
            </Link>
            <span>
              <MdWorkspacePremium className="text-3xl" />
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`${expanded ? "custom-navbar-collapse" : ""}  p-4`}
        >
          <Nav className="ms-auto   font-serif">
            <LinkContainer to="/">
              <Nav.Link className="me-2">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer className="ms-2" to="/job/search">
              <Nav.Link>FindJob</Nav.Link>
            </LinkContainer>
            <LinkContainer className="me-2 ms-2" to="/post">
              <Nav.Link>PostJob</Nav.Link>
            </LinkContainer>
            {!userInfo?.token && (
              <LinkContainer className="me-2 w-fit px-4" to="/register">
                <Nav.Link className="bg-btnColor text-white rounded-md py-2">
                  SignUp
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo?.token && (
              <span>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <Image
                      boxSize="2rem"
                      borderRadius="full"
                      src="/assests/user1.png"
                      alt="User avatar"
                      mr="12px"
                    />
                  </MenuButton>
                  <MenuList>
                    <Link to="/profile">
                      <MenuItem minH="48px">Profile</MenuItem>
                    </Link>
                    <MenuItem minH="40px">
                      <Buttons onClick={onClickHandler}>LogOut</Buttons>
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
