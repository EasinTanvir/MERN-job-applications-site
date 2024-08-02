import React, { useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fetch_Jobs_Id } from "../../store/actions";
import { useParams } from "react-router-dom";
import Spinners from "../../Components/Spinners";
import Loader from "../JobPage/Loader";

const JobDetails = () => {
  const dispatch = useDispatch();
  const jobId = useParams().id;
  const navigate = useNavigate();
  const alljob = useSelector((state) => state.singleJob);
  const error = useSelector((state) => state.errors);
  const loginuser = useSelector((state) => state.auth);
  const { userInfo } = loginuser;
  const { isLoading } = error;
  const { jobs } = alljob;

  useEffect(() => {
    if (jobId) {
      dispatch(Fetch_Jobs_Id(jobId));
    }
  }, [dispatch, jobId]);

  if (!jobs) {
    return navigate("/job/search");
  }

  const onJobHandler = () => {
    dispatch({ type: "REMOVE_JOB" });
  };

  return (
    <Container>
      <div className="details max-w-full overflow-hidden py-4 min-h-[calc(100vh-64px)] ">
        {isLoading ? (
          <div className="min-h-[600px] flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {" "}
            <Row>
              <Col lg={6}>
                <div className="job-top ">
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
                                <h3 className=" font-montserrat text-slate-800 text-2xl font-bold">
                                  {jobs.title}
                                </h3>
                                <div className="flex sm:flex-row flex-wrap sm:gap-4 gap-2 mt-2">
                                  <span className="small small flex items-center gap-1">
                                    <CardGiftcardIcon /> {jobs.company}
                                  </span>
                                  <span className="small small flex items-center gap-1">
                                    <EditLocationIcon /> {jobs.location}
                                  </span>
                                  <span className="small small flex items-center gap-1">
                                    <CalendarMonthIcon />{" "}
                                    {moment(jobs.createdAt).format(
                                      "YYYY-MM-DD"
                                    )}
                                  </span>

                                  <span className="small small flex items-center gap-1">
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
                <div className="job-bottom">
                  <Card className="border-0 ">
                    <Card.Title>
                      <h2 className="font-montserrat text-slate-800 text-2xl font-bold">
                        Job Highlights
                      </h2>
                    </Card.Title>
                    <Card.Body>
                      <div className="sallery mb-3">
                        <div className=" flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <CurrencyExchangeIcon />{" "}
                            <span className="text-slate-950 font-semibold">
                              Sallery
                            </span>
                          </span>
                          <p className="text-slate-700 font-[500]">
                            ${jobs.salary}
                          </p>
                        </div>
                      </div>
                      <div className="job-types mb-4">
                        <span className="lead d-flex flex-column gap-3">
                          <span className="flex items-center gap-1">
                            <WorkOutlineIcon />
                            Job Time
                          </span>
                          <div className="d-flex gap-2">
                            {jobs.jobType === "Full Time" ? (
                              <>
                                <span className="btn bg-btnColor text-white border">
                                  Full Time
                                </span>
                                <span className="btn border ">Per Time</span>
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
                          <span className="flex items-center gap-1">
                            <AccessTimeIcon />
                            Shift & Shedule
                          </span>
                          <div className="d-flex gap-2 mt-1">
                            {jobs.shift === "8 hours" ? (
                              <>
                                <span className="btn bg-btnColor text-white border">
                                  8 hours shift
                                </span>
                                <span className="btn border">
                                  12 hours shift
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="btn border">
                                  8 hours shift
                                </span>
                                <span className="btn bg-btnColor text-white border">
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
                          <span className="flex items-center gap-1 font-montserrat">
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
                        <div className="lead d-flex flex-column gap-2">
                          <div className="flex items-center gap-2">
                            <CastForEducationIcon />
                            <h3 className="font-montserrat text-slate-800 text-2xl font-bold">
                              Job Description
                            </h3>
                          </div>
                          <p className="text-slate-800">{jobs.desc}</p>
                        </div>
                        <h2 className="btn border mt-3">Report Job</h2>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              <Col lg={6}>
                <div className="right-details ">
                  <>
                    {jobs.creator !== userInfo?.id && (
                      <div className="title mt-4">
                        <h4 className="font-montserrat text-slate-800 text-2xl font-bold py-2">
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
                  </>
                  <Card className="mt-3 ">
                    <Card.Body>
                      <Card.Text>
                        <div className="mb-3">
                          <span className="flex items-center gap-1">
                            <CalendarMonthIcon />{" "}
                            <div className=" " style={{ fontWeight: "bold" }}>
                              Date Posted :{" "}
                              <span className="text-slate-700 font-normal text-[15px]">
                                {moment(jobs.createdAt).format("YYYY-MM-DD")}
                              </span>
                            </div>
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center gap-1">
                            <EditLocationIcon />{" "}
                            <span style={{ fontWeight: "bold" }}>
                              Location :{" "}
                              <span className="text-slate-700 font-normal text-[15px]">
                                {jobs.location}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div>
                            <CurrencyExchangeIcon />{" "}
                            <span style={{ fontWeight: "bold" }}>
                              Offered Sallery :{" "}
                              <span className="text-slate-700 font-normal text-[15px]">
                                ${jobs.salary}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center gap-1">
                            <CalendarMonthIcon />{" "}
                            <span style={{ fontWeight: "bold" }}>
                              Expiration Date :{" "}
                              <span className="text-slate-700 font-normal text-[15px]">
                                {moment(jobs.expire).format("YYYY-MM-DD")}
                              </span>
                            </span>
                          </div>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>{" "}
    </Container>
  );
};

export default JobDetails;
