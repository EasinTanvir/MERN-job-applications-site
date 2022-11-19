import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_User, Log_Out, Sign_In, update_User } from "../../store/actions";
import "./profile.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { Button, Card, Form } from "react-bootstrap";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { useToast } from "@chakra-ui/react";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const MainProfile = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.myuser);
  const loginUser = useSelector((state) => state.auth);
  const err = useSelector((state) => state.errors);
  const finalUpdate = useSelector((state) => state.updateUser);
  const { update } = finalUpdate;
  const { isError } = err;
  const { userInfo } = loginUser;
  const [input, setInput] = useState({
    name: userInfo.name,
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    dispatch(get_User());
  }, [dispatch]);
  const onClickHandler = () => {
    localStorage.removeItem("userData");

    dispatch(Log_Out());
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const recData = {
      name: input.name,
      oldPassword: input.oldPassword,
      newPassword: input.newPassword,
    };

    const recData2 = {
      email: userInfo.email,
      password: input.newPassword,
    };

    dispatch(update_User(recData));

    setTimeout(() => {
      dispatch(Sign_In(recData2));
    }, 700);
  };
  const { myuser } = users;

  if (update !== null) {
    toast({
      title: "User Update Succesfully",
      description: "Thanks for your Update",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <div className="profile">
      <div className="l-dash">
        <div className="d-icons">
          <div>
            <AddHomeWorkIcon style={{ fontSize: "50px" }} />
          </div>
          <div>
            <span className="text-primary">SuprJob</span>
          </div>
        </div>
        <div className="dashboard">
          <Link to="/profile">
            <div className="d-items1 d-flex gap-2">
              <DashboardIcon />
              <span>DashBoard</span>
            </div>
          </Link>
          <Link to="/myprofile">
            <div className="d-items2 d-flex gap-2">
              <RecordVoiceOverIcon />
              <span>Profile</span>
            </div>
          </Link>
          <Link to="/mypostjob">
            <div className="d-items2 d-flex gap-2">
              <BorderColorIcon />
              <span>MyPostJob</span>
            </div>
          </Link>
          <div>
            <Button onClick={onClickHandler} variant="primary">
              <LogoutIcon /> LogOut
            </Button>
          </div>
        </div>
      </div>
      <div className="r-dash">
        <div className="pro  mt-5 w-100 h-75 d-flex align-iteems-center justify-content-center">
          <Card className="border-0">
            <Card.Img
              style={{ width: "100px", height: "100px" }}
              className="ms-3 mb-3"
              src="/assests/user1.png"
            />
            <Card.Title>
              <span className="users">{myuser?.name}</span>
              <h3 className="mt-5">Update Your Profile</h3>
            </Card.Title>
            <Card.Body>
              <div className="my-forms">
                <Form onSubmit={onSubmitHandler}>
                  <Form.Group className="mb-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      as="input"
                      onChange={onChangeHandler}
                      name="name"
                      value={input.name}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      onChange={onChangeHandler}
                      name="oldPassword"
                      as="input"
                      placeholder="Enter old Password"
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      onChange={onChangeHandler}
                      name="newPassword"
                      as="input"
                      placeholder="Enter new Password"
                    />
                  </Form.Group>
                  {isError && (
                    <p className="small text-danger mt-1 mb-1">{isError}</p>
                  )}

                  <Button type="submit">Update</Button>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
