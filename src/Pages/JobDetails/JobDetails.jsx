import React, { useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import moment from "moment";
import "./jobdetails.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fetch_Jobs_Id } from "../../store/actions";
import { useParams } from "react-router-dom";
import Spinners from "../../Components/Spinners";

const JobDetails = () => {
  const dispatch = useDispatch();
  const jobId = useParams().id;

  const alljob = useSelector((state) => state.singleJob);
  const error = useSelector((state) => state.errors);
  const loginuser = useSelector((state) => state.auth);
  const { userInfo } = loginuser;
  const { isLoading } = error;
  const { jobs } = alljob;

  useEffect(() => {
    dispatch(Fetch_Jobs_Id(jobId));
  }, [dispatch, jobId]);
  if (!jobs) {
    return <p>Loading.......</p>;
  }

  const onJobHandler = () => {
    dispatch({ type: "REMOVE_JOB" });
  };

  return (
    <div className="details">
      {isLoading ? (
        <Spinners />
      ) : (
        <>
          {" "}
          <Row>
            <Col lg={6}>
              <div className="job-top">
                <div className="job-right">
                  <Card className="mb-3 w-100 ps-5 pe-5" key={jobs.id}>
                    <Card.Body>
                      <Row>
                        <div className="d-flex  gap-4">
                          <Col lg={3}>
                            <div className="card-left">
                              <img src={jobs.image} alt="" />
                            </div>
                          </Col>
                          <Col lg={9}>
                            <div className="card-right">
                              <h3 className="title ">{jobs.title}</h3>
                              <div className="d-flex gap-3">
                                <span className="small">
                                  <CardGiftcardIcon /> {jobs.company}
                                </span>
                                <span className="small">
                                  <EditLocationIcon /> {jobs.location}
                                </span>
                                <span className="small">
                                  <CalendarMonthIcon />{" "}
                                  {moment(jobs.createdAt).format("YYYY-MM-DD")}
                                </span>

                                <span className="small">
                                  <AppRegistrationIcon />
                                  Vacancy: {jobs.vacancy}
                                </span>
                              </div>
                            </div>
                          </Col>
                        </div>
                      </Row>
                      <div className="buttons mt-3 d-flex gap-2">
                        <Button variant="danger" size="sm">
                          {jobs.location}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="job-bottom ">
                <Card className="border-0 ms-5">
                  <Card.Title>
                    <h2 className="text-dark mt-4">Job Highlights</h2>
                  </Card.Title>
                  <Card.Body>
                    <div className="sallery mb-3">
                      <span className="lead d-flex flex-column gap-2">
                        <span>
                          <CurrencyExchangeIcon /> Sallery
                        </span>
                        <p>${jobs.salary}</p>
                      </span>
                    </div>
                    <div className="job-types mb-4">
                      <span className="lead d-flex flex-column gap-2">
                        <span>
                          <WorkOutlineIcon />
                          Job Time
                        </span>
                        <div className="d-flex gap-2">
                          {jobs.jobType === "Full Time" ? (
                            <>
                              <span className="btn btn-success border">
                                Full Time
                              </span>
                              <span className="btn border">Per Time</span>
                            </>
                          ) : (
                            <>
                              <span className="btn border">Full Time</span>
                              <span className="btn btn-success border">
                                Per Time
                              </span>
                            </>
                          )}
                          {/* <span className="btn border">Per Time</span>
                      <span className="btn border">Internship</span>
                      <span className="btn border">Remote</span> */}
                        </div>
                      </span>
                    </div>
                    <div className="shift mb-4">
                      <span className="lead d-flex flex-column gap-2">
                        <span>
                          <AccessTimeIcon />
                          Shift & Shedule
                        </span>
                        <div className="d-flex gap-2">
                          {jobs.shift === "8 hours" ? (
                            <>
                              <span className="btn btn-success border">
                                8 hours shift
                              </span>
                              <span className="btn border">12 hours shift</span>
                            </>
                          ) : (
                            <>
                              <span className="btn border">8 hours shift</span>
                              <span className="btn btn-success border">
                                12 hours shift
                              </span>
                            </>
                          )}

                          {/* <span className="btn border">12 hour shift</span> */}
                        </div>
                      </span>
                    </div>
                    <div className="qualification mb-4">
                      <span className="lead d-flex flex-column gap-2">
                        <span>
                          <CastForEducationIcon />
                          Qualifications
                        </span>
                        <ul>
                          <li>{jobs.education} (prefered)</li>
                          <li>{jobs.exp}</li>
                        </ul>
                      </span>
                    </div>

                    <div className="qualification mb-4">
                      <span className="lead d-flex flex-column gap-2">
                        <span>
                          <CastForEducationIcon />
                          Full Job Description
                        </span>
                        <p>{jobs.desc}</p>
                        <ul>
                          <li>Clean Code</li>
                          <li>Reusable Code</li>
                          <li>Git & Github</li>
                          <li>Sql Databse</li>
                          <li>Strong Communication</li>
                        </ul>
                      </span>
                      <h2 className="btn border mt-3">Report Job</h2>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col lg={6}>
              <div className="right-details ms-5">
                {jobs.creator !== userInfo?.id && (
                  <div className="title mt-4">
                    <h4>
                      Application End's :{" "}
                      <span className="text-danger">
                        {moment(jobs.expire).format("YYYY-MM-DD")}
                      </span>
                    </h4>
                    <Link to={`/job/apply/${jobId}`}>
                      <Button
                        onClick={onJobHandler}
                        className="mt-2"
                        variant="primary"
                      >
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                )}
                <Card className="mt-3 w-75">
                  <Card.Body>
                    <Card.Text>
                      <div className="mb-3">
                        <span>
                          <CalendarMonthIcon />{" "}
                          <span style={{ fontWeight: "bold" }}>
                            Date Posted
                          </span>
                        </span>
                        <p>{moment(jobs.createdAt).format("YYYY-MM-DD")}</p>
                      </div>
                      <div className="mb-3">
                        <span>
                          <EditLocationIcon />{" "}
                          <span style={{ fontWeight: "bold" }}>Location</span>
                        </span>
                        <p>Dhaka</p>
                      </div>
                      <div className="mb-3">
                        <span>
                          <CurrencyExchangeIcon />{" "}
                          <span style={{ fontWeight: "bold" }}>
                            Offered Sallery
                          </span>
                        </span>
                        <p>${jobs.salary}</p>
                      </div>
                      <div className="mb-3">
                        <span>
                          <CalendarMonthIcon />{" "}
                          <span style={{ fontWeight: "bold" }}>
                            Expiration Date
                          </span>
                        </span>
                        <p>{moment(jobs.expire).format("YYYY-MM-DD")}</p>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default JobDetails;
