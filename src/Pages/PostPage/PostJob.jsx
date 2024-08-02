import axios from "axios";
import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Spinners from "../../Components/Spinners";
import { Create_NewPosition } from "../../store/actions";
import "./post.css";
import { useToast } from "@chakra-ui/react";

const PostJob = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [file, setFile] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);
  const [input, setInput] = useState({
    title: "",
    company: "",
    location: "",
    vacancy: "",
    shift: "",
    jobType: "",
    education: "",
    exp: "",
    salary: "",
    desc: "",
  });

  const onImageHandler = async (image) => {
    if (image === undefined) {
      console.log("select an image");
    }
    if (image.type === "image/jpg" || "image/jpeg" || "image/png") {
      setImageLoader(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "image-upload");
      formData.append("upload_name", "dujpd4jfd");

      try {
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dujpd4jfd/image/upload",
          formData
        );
        setFile(data.url.toString());

        setImageLoader(false);
      } catch (err) {
        console.log(err);
        setImageLoader(false);
      }
    } else {
      console.log("please select an jpg image");
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const {
      title,
      company,
      location,
      vacancy,
      shift,
      jobType,
      education,
      exp,
      salary,
      desc,
    } = input;
    const recData = {
      title,
      image: file,
      company,
      location,
      vacancy,
      shift,
      jobType,
      education,
      exp,
      salary,
      desc,
    };
    dispatch(Create_NewPosition(recData));
  };

  return (
    <div className="posts overflow-hidden">
      <Form onSubmit={onSubmitHandler}>
        <Form.Text>
          {" "}
          <h1 className="display-6 text-center mb-3">Create a JobPost</h1>{" "}
        </Form.Text>
        <hr className="hr-line" />
        <Row>
          <Col className="me-5 m-auto" md={4}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                as="input"
                autoFocus
                onChange={onChangeHandler}
                name="title"
                type="text"
                required
                placeholder="Enter Name"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                as="input"
                onChange={(e) => onImageHandler(e.target.files[0])}
                accept="image/*"
                type="file"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Company</Form.Label>
              <Form.Control
                as="input"
                onChange={onChangeHandler}
                name="company"
                required
                placeholder="Enter Company"
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Location</Form.Label>
              <Form.Control
                as="select"
                onChange={onChangeHandler}
                name="location"
                required
                placeholder="Enter Location"
                type="text"
              >
                <option value="">--Select--</option>
                <option value="International">International</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Vacancy</Form.Label>
              <Form.Control
                as="input"
                onChange={onChangeHandler}
                name="vacancy"
                required
                placeholder="Enter Vacancy"
                type="number"
              />
            </Form.Group>
          </Col>
          <Col className=" m-auto" md={4}>
            <Form.Group className="mb-2">
              <Form.Label>Shift</Form.Label>
              <Form.Control
                as="select"
                onChange={onChangeHandler}
                name="shift"
                required
              >
                <option value="">--Select--</option>
                <option value="12 hours">12 Hours</option>
                <option value="8 hours">8 Hours</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>JobType</Form.Label>
              <Form.Control
                as="select"
                onChange={onChangeHandler}
                name="jobType"
                required
              >
                <option value="">--Select--</option>
                <option value="Full Time">FullTime</option>
                <option value="Per Time">PerTime</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Education</Form.Label>
              <Form.Control
                as="input"
                onChange={onChangeHandler}
                name="education"
                required
                placeholder="Enter Education"
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                as="input"
                onChange={onChangeHandler}
                name="exp"
                required
                placeholder="Enter Experience"
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                as="input"
                onChange={onChangeHandler}
                name="salary"
                required
                placeholder="Enter Salary"
                type="text"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="m-auto" md={10}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              name="desc"
              onChange={onChangeHandler}
              required
              placeholder="Enter Descriptions"
            />
          </Col>
        </Row>
        <div className="w-100 text-center mt-4 mb-5 border-warning">
          {imageLoader ? (
            <Spinners />
          ) : (
            <Button type="submit" variant="danger">
              Create JobPost
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default PostJob;
