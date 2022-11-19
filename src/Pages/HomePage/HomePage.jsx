import "./home.css";
import { Row, Col, Container, Button } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const selRef = useRef();
  const [input, setinput] = useState();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!selRef.current.value && input) {
      if (input) {
        navigate(`/job/search/${input}`);
      } else {
        navigate("/");
      }
    } else if (selRef.current.value && !input) {
      if (selRef.current.value) {
        navigate(`/job/location/${selRef.current.value}`);
      } else {
        navigate("/");
      }
    } else if (selRef.current.value && input) {
      if (selRef.current.value && input) {
        navigate(`/job/search/${input}/job/location/${selRef.current.value}`);
      } else if (selRef.current.value && input) {
        navigate(`/job/location/${selRef.current.value}/job/search/${input}`);
      } else {
        navigate("/");
      }
    } else {
      navigate("/job");
    }
  };

  return (
    <div className="home ">
      <Container>
        <Row>
          <Col lg={6}>
            <div className="left">
              <h3>Find Your perfect Job Match</h3>
              <p className="lead">Find Job, Employment and carrer opprtunity</p>
              <form onSubmit={onSubmitHandler} className="inputs">
                <SearchIcon />
                <input
                  onChange={(e) => setinput(e.target.value)}
                  type="text"
                  placeholder="Search for job"
                />
                <LocationOnIcon />
                <Form.Control ref={selRef} as="select" name="" id="">
                  <option value="">-Location-</option>
                  <option value="Remote">Remote</option>
                  <option value="International">International</option>
                  <option value="Hybrid">Hybrid</option>
                </Form.Control>
                <Button variant="primary" type="submit">
                  FindJob
                </Button>
              </form>
              <p className="small mt-5">
                Populer searches : Designer, developer, Web, ios, Android,
                Sotware
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="right">
              <div className="imgs">
                <img
                  src="https://res.cloudinary.com/dujpd4jfd/image/upload/v1668769371/axcesyd3kchntjp4rz4m.jpg"
                  alt=""
                />
                <div className="icons">
                  <div className="icons1">
                    <img src="/assests/amazon.png" alt="" />
                  </div>
                  <div className="icons2">
                    <img src="/assests/Upwork.png" alt="" />
                  </div>
                  <div className="icons3">
                    <img src="/assests/Shopify.png" alt="" />
                  </div>
                  <div className="icons4">
                    <img src="/assests/linkedin.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
