import "./job.css";
import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Link } from "react-router-dom";
import { BiSolidDollarCircle } from "react-icons/bi";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useDispatch, useSelector } from "react-redux";

const JobCard = ({
  id,
  image,
  title,
  company,
  location,
  vacancy,
  jobType,
  creator,
  salary,
}) => {
  const dispatch = useDispatch();
  const loginuser = useSelector((state) => state.auth);
  const { userInfo } = loginuser;
  const onJobHandler = () => {
    dispatch({ type: "REMOVE_JOB" });
  };
  return (
    <Card className="mb-3  sm:p-2" key={id}>
      <Card.Body>
        <div className="flex sm:flex-row flex-wrap gap-3">
          <div className="card-left">
            <img src={image} alt="" />
          </div>
          <div className="card-right">
            <h3 className="title">{title}</h3>
            <div className="flex sm:flex-row flex-wrap sm:gap-4 gap-2 mt-2 ">
              <span className="small flex items-center gap-1">
                <CardGiftcardIcon /> {company}
              </span>
              <span className="small flex items-center gap-0">
                <EditLocationIcon /> {location}
              </span>
              <span className="small flex items-center gap-1">
                <AppRegistrationIcon />
                Vacancy: {vacancy}
              </span>{" "}
              <span className="small flex items-center gap-1">
                <BiSolidDollarCircle className="text-2xl" />
                <span className="text-slate-800 font-[500]">
                  {salary} (USD)
                </span>
              </span>
              <span className="small d-flex items-center">
                <AccessAlarmIcon />
                <span className="ms-1"> {jobType}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="buttons mt-3 d-flex gap-2">
          <Link to={`/job/${id}`}>
            {" "}
            <Button size="sm">Job Details</Button>
          </Link>
          <Link to={`/job/apply/${id}`}>
            {creator !== userInfo?.id && (
              <Button onClick={onJobHandler} variant="danger" size="sm">
                Apply Now
              </Button>
            )}
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
