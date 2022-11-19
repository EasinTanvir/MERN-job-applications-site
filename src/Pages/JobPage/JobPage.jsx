import React, { useEffect, useRef, useState } from "react";
import "./job.css";
import { Row, Col, Card, Form, Button, Container } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import CategoryIcon from "@mui/icons-material/Category";
import WorkIcon from "@mui/icons-material/Work";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fetch_Jobs } from "../../store/actions";
import Spinners from "../../Components/Spinners";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
const JobPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationRef = useRef();
  const categoryRef = useRef();
  const jobTypeRef = useRef();
  const alljob = useSelector((state) => state.alljobs);
  const loginuser = useSelector((state) => state.auth);
  const { userInfo } = loginuser;
  const error = useSelector((state) => state.errors);
  const { isLoading } = error;
  const { jobs } = alljob;

  const searchKey = useParams().keyword;
  const locationKey = useParams().loc;
  const categoryKey = useParams().cat;
  const jobTypeKey = useParams().type;

  //onLocation Change
  const onLocationChange = () => {
    if (!searchKey && !categoryKey) {
      if (locationRef.current.value) {
        navigate(`/job/location/${locationRef.current.value}`);
      } else {
        navigate("/job");
      }
    } else {
      if (locationRef.current.value) {
        navigate(
          `/job/search/${searchKey}/job/location/${locationRef.current.value}`
        );
      } else {
        navigate(`/job/search/${searchKey}`);
      }
    }

    //category
  };
  //onLSearch Change
  const onInputChange = (e) => {
    if (!locationKey) {
      if (e.target.value.trim()) {
        navigate(`/job/search/${e.target.value}`);
      } else {
        navigate("/job");
      }
    } else {
      //start

      if (e.target.value.trim()) {
        navigate(
          `/job/location/${locationRef.current.value}/job/search/${e.target.value}`
        );
      } else {
        navigate(`/job/location/${locationRef.current.value}`);
      }

      //end
    }
  };

  //onCategoryChange
  const onCategoryChange = () => {
    if (!locationKey) {
      if (categoryRef.current.value) {
        navigate(`/job/category/${categoryRef.current.value}`);
      } else {
        navigate("/job");
      }
    } else {
      //start
      if (categoryRef.current.value) {
        navigate(
          `/job/location/${locationRef.current.value}/job/category/${categoryRef.current.value}`
        );
      } else {
        navigate(`/job/location/${locationRef.current.value}`);
      }
      //end
    }
  };
  const onJobTypeHandler = () => {
    if (!locationKey && !categoryKey && !searchKey) {
      if (jobTypeRef.current.value) {
        navigate(`/job/jobtype/${jobTypeRef.current.value}`);
      } else {
        navigate("/job");
      }
    } else if (locationRef.current.value) {
      //start
      if (locationRef.current.value) {
        navigate(
          `/job/location/${locationRef.current.value}/job/jobtype/${jobTypeRef.current.value}`
        );
      } else {
        navigate(`/job/jobtype/${jobTypeRef.current.value}`);
      }
      //end
    } else if (categoryRef.current.value) {
      if (categoryRef.current.value) {
        navigate(
          `/job/category/${categoryRef.current.value}/job/jobtype/${jobTypeRef.current.value}`
        );
      } else {
        navigate(`/job/jobtype/${jobTypeRef.current.value}`);
      }
    }
  };
  useEffect(() => {
    dispatch(Fetch_Jobs(searchKey, locationKey, categoryKey, jobTypeKey));
  }, [dispatch, searchKey, locationKey, categoryKey, jobTypeKey]);

  const onJobHandler = () => {
    dispatch({ type: "REMOVE_JOB" });
  };

  return (
    <div className="jobs">
      <Row>
        <Col md={6}>
          <div className="job-left ">
            <div className="search">
              <Form>
                <Form.Label>
                  <SearchIcon /> Search by keywords
                </Form.Label>
                <Form.Control
                  onChange={onInputChange}
                  placeholder="Job Title, keywords"
                />
              </Form>
            </div>
            <div className="location">
              <Form.Label>
                <AddLocationAltIcon /> Location
              </Form.Label>
              <Form.Control
                onChange={onLocationChange}
                ref={locationRef}
                as="select"
                name=""
                id=""
              >
                <option value="">-Location-</option>
                <option value="Remote">Remote</option>
                <option value="International">International</option>
                <option value="Hybrid">Hybrid</option>
              </Form.Control>
            </div>

            <div className="category">
              <Form.Label>
                <CategoryIcon /> Category
              </Form.Label>
              <Form.Control
                onChange={onCategoryChange}
                ref={categoryRef}
                as="select"
                name=""
                id=""
              >
                <option value="">-Category-</option>
                <option value="Full Stack">Full Stack Developer</option>
                <option value="FrontEnd">FrontEnd Developer</option>
                <option value="BackEnd">BackEnd Developer</option>
                <option value="ReactJs">React Developer</option>
                <option value="Wordpress">WordPress Developer</option>
              </Form.Control>
            </div>

            <div className="job-type">
              <Form.Label>
                <WorkIcon /> Job Type
              </Form.Label>
              <Form.Control
                onChange={onJobTypeHandler}
                ref={jobTypeRef}
                as="select"
                name=""
                id=""
              >
                <option value="">-Job-Type-</option>
                <option value="Full Time">FullTime</option>
                <option value="Per Time">PerTime</option>
              </Form.Control>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <Container fluid>
            {isLoading ? (
              <Spinners />
            ) : (
              <div className="job-right">
                {jobs.length === 0 ? (
                  <>
                    <h2 className="btn btn-danger">
                      Sorry no Jobs found Search again....
                    </h2>
                  </>
                ) : (
                  <>
                    {" "}
                    {jobs.map((item) => (
                      <Card className="mb-3" key={item.id}>
                        <Card.Body>
                          <div className="d-flex gap-3">
                            <div className="card-left">
                              <img src={item.image} alt="" />
                            </div>
                            <div className="card-right">
                              <h3 className="title ">{item.title}</h3>
                              <div className="d-flex gap-2">
                                <span className="small">
                                  <CardGiftcardIcon /> {item.company}
                                </span>
                                <span className="small">
                                  <EditLocationIcon /> {item.location}
                                </span>
                                <span className="small">
                                  <AppRegistrationIcon />
                                  Vacancy: {item.vacancy}
                                </span>
                                <span className="small d-flex align-items-center">
                                  <AccessAlarmIcon />
                                  <span className="ms-1"> {item.jobType}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="buttons mt-3 d-flex gap-2">
                            <Link to={`/job/${item.id}`}>
                              {" "}
                              <Button size="sm">Job Details</Button>
                            </Link>
                            <Link to={`/job/apply/${item.id}`}>
                              {item.creator !== userInfo?.id && (
                                <Button
                                  onClick={onJobHandler}
                                  variant="danger"
                                  size="sm"
                                >
                                  Apply Now
                                </Button>
                              )}
                            </Link>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </>
                )}
              </div>
            )}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default JobPage;
