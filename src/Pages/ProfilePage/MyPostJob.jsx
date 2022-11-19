import { Button, Card, Row } from "react-bootstrap";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import LogoutIcon from "@mui/icons-material/Logout";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import GroupIcon from "@mui/icons-material/Group";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { Log_Out, myPost_Jobs } from "../../store/actions";
import Spinners from "../../Components/Spinners";

const MyPostJob = () => {
  const post = useSelector((state) => state.postJob);
  const error = useSelector((state) => state.errors);
  const { isLoading } = error;
  const { posts } = post;

  const dispatch = useDispatch();

  const onClickHandler = () => {
    localStorage.removeItem("userData");

    dispatch(Log_Out());
  };

  useEffect(() => {
    dispatch(myPost_Jobs());
  }, [dispatch]);

  return (
    <div className="profile">
      <div className="l-dash ">
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
            <div className="d-flext justify-content-center align-items-center">
              <Spinners />{" "}
            </div>
          ) : (
            <>
              {" "}
              <Row>
                {posts.length === 0 ? (
                  <>
                    <Button className="w-50 m-auto mt-5" variant="danger">
                      You didn't post any job yet
                    </Button>
                  </>
                ) : (
                  <>
                    <Card.Title className="titles">
                      Your PostJob & Users who applied
                    </Card.Title>
                    {posts.map((item) => (
                      <Card className="mb-3" key={item.id}>
                        <Card.Body>
                          <div className="d-flex gap-3">
                            <div className="card-left">
                              <img src={item.image} alt="" />
                            </div>
                            <div className="card-right">
                              <h3 className="title ">{item.title}</h3>
                              <div className="d-flex gap-2">
                                <span className="d-flex align-items-center gap-2 small">
                                  <GroupIcon />
                                  <span>
                                    {" "}
                                    Total Applied : {item.totalApply?.length}
                                  </span>
                                </span>

                                <div className="ms-5">
                                  <Link
                                    to={`/mypostjob/applicants/${item._id}`}
                                  >
                                    <Button variant="dark" size="small">
                                      View Applications
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
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

export default MyPostJob;
