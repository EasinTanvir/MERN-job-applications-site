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
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fetch_Jobs } from "../../store/actions";
import Spinners from "../../Components/Spinners";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import JobCard from "./JobCard";
import JobPagination from "./Pagination";
import { NoJobFound } from "./NotFound";
import Loader from "./Loader";
import Paginations from "./Pagination";
const JobPage = () => {
  const alljob = useSelector((state) => state.alljobs);
  const page = useSelector((state) => state.alljobs.page);
  const loginuser = useSelector((state) => state.auth);
  const { userInfo } = loginuser;
  const error = useSelector((state) => state.errors);
  const { isLoading } = error;
  const { jobs } = alljob;

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setinput] = useState(searchParams.get("search"));
  const [location, setLocation] = useState(searchParams.get("location"));
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [urlParams, setUrlParams] = useSearchParams();

  const objectToQueryString = (obj) => {
    const queryString = Object.keys(obj)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      )
      .join("&");
    return queryString;
  };

  useEffect(() => {
    const params = new URLSearchParams(urlParams);

    if (input) {
      params.set("search", input);
      params.delete("page");
    } else {
      params.delete("search");
    }

    if (location) {
      params.set("location", location);
      params.delete("page");
    } else {
      params.delete("location");
    }
    if (jobType) {
      params.set("jobType", jobType);
      params.delete("page");
    } else {
      params.delete("jobType");
    }
    if (category) {
      params.delete("page");
      params.set("category", category);
    } else {
      params.delete("category");
    }

    setUrlParams(params);
  }, [input, location, setUrlParams, category, jobType]);

  // Navigate and dispatch Fetch_Jobs with updated params
  useEffect(() => {
    const paramsObject = {};
    for (const [key, value] of urlParams.entries()) {
      paramsObject[key] = value;
    }
    console.log(paramsObject);

    const queryString = objectToQueryString(paramsObject);
    navigate(`/job/search?${urlParams.toString()}`);
    dispatch(Fetch_Jobs(queryString));
  }, [urlParams, navigate, dispatch]);

  const onJobHandler = () => {
    dispatch({ type: "REMOVE_JOB" });
  };

  return (
    <div className="jobs max-w-full overflow-hidden min-h-[calc(100vh-64px)] relative">
      <Row>
        <Col lg={6}>
          <div className="job-left ">
            <div className="search">
              <Form>
                <Form.Label className="flex items-center gap-1">
                  <SearchIcon />
                  <span className="text-slate-700 font-semibold text-lg">
                    Search by keywords
                  </span>
                </Form.Label>
                <Form.Control
                  value={input}
                  onChange={(e) => setinput(e.target.value)}
                  placeholder="Job Title, keywords"
                />
              </Form>
            </div>
            <div className="location">
              <Form.Label className="flex items-center gap-2">
                <span>
                  <AddLocationAltIcon />
                </span>
                <span className="text-slate-700 font-semibold text-lg">
                  Location
                </span>
              </Form.Label>
              <Form.Control
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                as="select"
                name=""
                id=""
              >
                <option value="">-Location-</option>
                <option value="remote">Remote</option>
                <option value="international">International</option>
                <option value="hybrid">Hybrid</option>
              </Form.Control>
            </div>

            <div className="category">
              <Form.Label className="flex items-center gap-1">
                <CategoryIcon />{" "}
                <span className="text-slate-700 font-semibold text-lg">
                  Category
                </span>
              </Form.Label>
              <Form.Control
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                as="select"
                name=""
                id=""
              >
                <option value="">-Category-</option>
                <option value="full stack">Full Stack Developer</option>
                <option value="frontEnd">FrontEnd Developer</option>
                <option value="backEnd">BackEnd Developer</option>
                <option value="reactJs">React Developer</option>
                <option value="wordpress">WordPress Developer</option>
              </Form.Control>
            </div>

            <div className="job-type">
              <Form.Label className="flex items-center gap-1">
                <WorkIcon />{" "}
                <span className="text-slate-700 font-semibold text-lg">
                  Job Type
                </span>
              </Form.Label>
              <Form.Control
                onChange={(e) => setJobType(e.target.value)}
                value={jobType}
                as="select"
                name=""
                id=""
              >
                <option value="">-Job-Type-</option>
                <option value="full time">FullTime</option>
                <option value="per time">PerTime</option>
              </Form.Control>
            </div>
          </div>
        </Col>
        <Col lg={6} className="py-4">
          <Container fluid>
            {isLoading ? (
              <div className="min-h-[600px]  flex items-center justify-center ">
                <Loader />
              </div>
            ) : (
              <div className="job-right">
                {jobs.length === 0 ? (
                  <>
                    <NoJobFound />
                  </>
                ) : (
                  <>
                    {jobs.map((item) => (
                      <JobCard key={item.id} {...item} />
                      // <Card className="mb-3  p-2" key={item.id}>
                      //   <Card.Body>
                      //     <div className="d-flex gap-3">
                      //       <div className="card-left">
                      //         <img src={item.image} alt="" />
                      //       </div>
                      //       <div className="card-right">
                      //         <h3 className="title ">{item.title}</h3>
                      //         <div className="d-flex gap-4 mt-2 ">
                      //           <span className="small flex items-center gap-1">
                      //             <CardGiftcardIcon /> {item.company}
                      //           </span>
                      //           <span className="small flex items-center gap-0">
                      //             <EditLocationIcon /> {item.location}
                      //           </span>
                      //           <span className="small flex items-center gap-1">
                      //             <AppRegistrationIcon />
                      //             Vacancy: {item.vacancy}
                      //           </span>
                      //           <span className="small d-flex items-center">
                      //             <AccessAlarmIcon />
                      //             <span className="ms-1"> {item.jobType}</span>
                      //           </span>
                      //         </div>
                      //       </div>
                      //     </div>
                      //     <div className="buttons mt-3 d-flex gap-2">
                      //       <Link to={`/job/${item.id}`}>
                      //         {" "}
                      //         <Button size="sm">Job Details</Button>
                      //       </Link>
                      //       <Link to={`/job/apply/${item.id}`}>
                      //         {item.creator !== userInfo?.id && (
                      //           <Button
                      //             onClick={onJobHandler}
                      //             variant="danger"
                      //             size="sm"
                      //           >
                      //             Apply Now
                      //           </Button>
                      //         )}
                      //       </Link>
                      //     </div>
                      //   </Card.Body>
                      // </Card>
                    ))}
                  </>
                )}
              </div>
            )}
          </Container>
        </Col>
      </Row>
      <div className="flex justify-center pt-4 pb-8 absolute bottom-4 w-full">
        <Paginations numberOfPage={page} />
      </div>
    </div>
  );
};

export default JobPage;
