import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import LogoutIcon from "@mui/icons-material/Logout";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  application_UserDetails,
  Fetch_Jobs_Id,
  Log_Out,
  remove_CartItems,
  update_CartItems,
} from "../../store/actions";
import { useParams } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Modals from "../../Components/Modals";
import { useToast } from "@chakra-ui/react";
import RadarIcon from "@mui/icons-material/Radar";
import RejectModals from "../../Components/RejectModal";
import Spinners from "../../Components/Spinners";

const Application = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [rejShow, setRejtShow] = useState(false);

  const params = useParams().id;
  const dispatch = useDispatch();
  const applyDetails = useSelector((state) => state.applyuser);
  const { applyusers } = applyDetails;
  const error = useSelector((state) => state.errors);
  const { isLoading } = error;
  // const alljob = useSelector((state) => state.singleJob);
  // const { jobs } = alljob;

  const onClickHandler = () => {
    localStorage.removeItem("userData");

    dispatch(Log_Out());
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleRejClose = () => {
    setRejtShow(false);
  };

  const showModal = () => {
    setShow(true);
  };

  const showRejModal = () => {
    setRejtShow(true);
  };

  const onModalRemoveHandler = (id) => {
    const recData = {
      isRejected: true,
      id,
    };
    dispatch(remove_CartItems(params, recData));
    // toast({
    //   title: "Reject Applicants",
    //   description: "This applicants rejected for that position",
    //   status: "danger",
    //   duration: 5000,
    //   isClosable: true,
    // });
  };

  const onModalHandler = (id) => {
    const recData = {
      isPending: true,
      id,
    };

    dispatch(update_CartItems(params, recData));
    toast({
      title: "Approver User Successfully",
      description: "This user is seelected for that position",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  useEffect(() => {
    dispatch(Fetch_Jobs_Id(params));
  }, [dispatch, params]);

  useEffect(() => {
    dispatch(application_UserDetails(params));
  }, [dispatch, params]);

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
            <div className="d-flex justify-content-center align-items-center">
              <Spinners />
            </div>
          ) : (
            <>
              {" "}
              <Row>
                <div className="d-flex justify-content-center m-2">
                  <Card.Title className=" fs-2 positons">
                    All Applicants
                  </Card.Title>
                </div>
                {applyusers.length === 0 ? (
                  <>
                    <Button className="w-50 m-auto mt-5" variant="danger">
                      No one applied for that position yet....
                    </Button>
                  </>
                ) : (
                  <>
                    {applyusers.map((item) => (
                      <Col md={12} className="p-2">
                        <Card className="p-3">
                          <Card.Title className="d-flex align-items-center">
                            <RadarIcon />
                            <span>Position : </span>
                            <span className="ms-1 mt-1">
                              ({item.jobItems.title})
                            </span>
                          </Card.Title>
                          <Card.Body>
                            <div className="d-flex flex-column">
                              <div>
                                Name :{" "}
                                <span className="fw-bold">{item.name}</span>
                              </div>
                              <div>
                                Email :{" "}
                                <span className="fw-bold">{item.email}</span>
                              </div>
                              <div>
                                Location :{" "}
                                <span className="fw-bold">{item.country}</span>
                              </div>
                              <div>
                                Description : <span>{item.desc}</span>
                              </div>
                              {item.isPending ? (
                                <div className="w-75">
                                  <Button className="mt-3" variant="success">
                                    <span>
                                      <HowToRegIcon />{" "}
                                    </span>{" "}
                                    This user is Approved for that position
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  {item.isRejected ? (
                                    <p className="btn btn-danger w-25 mt-2">
                                      <DoNotDisturbIcon />{" "}
                                      <span>This Application Rejected</span>
                                    </p>
                                  ) : (
                                    <>
                                      {" "}
                                      <div className="mt-2 d-flex gap-2">
                                        <Button
                                          onClick={showModal}
                                          variant="primary"
                                        >
                                          Approve
                                        </Button>

                                        <Modals
                                          btn1="Approve"
                                          title="Approve Application Status"
                                          desc="Are you sure you want to approve that user for that posittion!"
                                          show={show}
                                          handleClose={handleClose}
                                          approveUser={() =>
                                            onModalHandler(item._id)
                                          }
                                        />
                                        <Button
                                          onClick={showRejModal}
                                          variant="danger"
                                        >
                                          Reject
                                        </Button>
                                        <RejectModals
                                          btn1="Reject"
                                          title="Reject Applicants "
                                          desc="Are you sure you want to Reject that user for that posittion!"
                                          show={rejShow}
                                          handleClose={handleRejClose}
                                          approveUser={() =>
                                            onModalRemoveHandler(item._id)
                                          }
                                        />
                                      </div>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </>
                )}
              </Row>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Application;
