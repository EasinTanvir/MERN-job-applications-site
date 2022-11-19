import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart_Job, Log_Out, myPost_Jobs } from "../../store/actions";
import "./profile.css";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { Button, Card, Col, Row } from "react-bootstrap";
import MailIcon from "@mui/icons-material/Mail";
import moment from "moment";
import LogoutIcon from "@mui/icons-material/Logout";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Link } from "react-router-dom";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DoNotDisturbOffIcon from "@mui/icons-material/DoNotDisturbOff";
import Spinners from "../../Components/Spinners";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const myJobs = useSelector((state) => state.cartjobs);
  const post = useSelector((state) => state.postJob);
  const error = useSelector((state) => state.errors);
  const { isLoading } = error;
  const { posts } = post;
  const { cartJob } = myJobs;

  const onClickHandler = () => {
    localStorage.removeItem("userData");

    dispatch(Log_Out());
  };

  useEffect(() => {
    dispatch(myPost_Jobs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCart_Job());
  }, [dispatch]);
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
        <>
          {isLoading ? (
            <div className="d-flex align-items-center justify-content-center">
              <Spinners />{" "}
            </div>
          ) : (
            <>
              {" "}
              <div>
                <h2>Application Status</h2>
                <hr />
                <div className="application ps-5 pe-5 d-flex gap-3">
                  <div className="w-50 border">
                    <Card>
                      <Card.Body>
                        <Card.Title className="text-center">
                          Total Applied =
                          <span className="ms-2">{cartJob?.length}</span>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="w-50 border">
                    {" "}
                    <Card>
                      <Card.Body>
                        <Card.Title className="text-center">
                          Total Job Post = {posts.length}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="recent">
                <div className="apply mt-4">
                  <Row>
                    {cartJob.length === 0 ? (
                      <>
                        <Button className="w-50 m-auto" variant="danger">
                          You didn't apply for any job yet
                        </Button>
                      </>
                    ) : (
                      <>
                        <p
                          style={{ fontSize: "22px" }}
                          className="ms-5 mt-2 mb-3"
                        >
                          Recent Application.....
                        </p>
                        {cartJob.map((item) => (
                          <Col lg={6} key={item.id}>
                            <Card bg="light" className="mb-3 ">
                              <Card.Body>
                                <div className="d-flex gap-3">
                                  <div className="card-left">
                                    <img
                                      style={{ borderRadius: "50%" }}
                                      src="/assests/user1.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="card-right">
                                    <h3 className="title mb-2">
                                      {item.jobItems.title}
                                    </h3>
                                    <div className="d-flex gap-2 flex-column">
                                      <span className="small">
                                        <span>
                                          <DriveFileRenameOutlineIcon />{" "}
                                        </span>
                                        {item.name}
                                        <span className="ms-3">
                                          Status :
                                          <>
                                            {item.isRejected ? (
                                              <span className="small ms-2 btn btn-danger">
                                                <DoNotDisturbOffIcon />{" "}
                                                Application rejected
                                              </span>
                                            ) : (
                                              <>
                                                {" "}
                                                {item.isPending ? (
                                                  <>
                                                    <h1 className="btn btn-success ms-3">
                                                      Approved <TaskAltIcon />
                                                    </h1>
                                                  </>
                                                ) : (
                                                  <>
                                                    <AutorenewIcon
                                                      style={{ color: "red" }}
                                                    />
                                                    <span>( pending... )</span>
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </>
                                        </span>
                                      </span>
                                      <span className="small">
                                        <span>
                                          <MailIcon />{" "}
                                        </span>
                                        {item.email}
                                      </span>
                                      <span className="small">
                                        <span className="me-2"> AppliedOn</span>
                                        {moment(item.createdAt).format(
                                          "YYYY-MM-DD"
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </>
                    )}
                  </Row>
                </div>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default ProfilePage;
