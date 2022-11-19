import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import "./aplly.css";
import {
  Add_Cart_Items,
  Create_JobPost,
  Fetch_Jobs_Id,
} from "../../store/actions";
import { useToast } from "@chakra-ui/react";

const ApplyJob = () => {
  const jobId = useParams().id;
  const dispatch = useDispatch();
  const toast = useToast();

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    desc: "",
  });
  const cartData = useSelector((state) => state.cart);
  const myposts = useSelector((state) => state.jobpost);
  const { jobposts } = myposts;
  const { cartItems } = cartData;

  useEffect(() => {
    dispatch(Fetch_Jobs_Id(jobId));
  }, [dispatch, jobId]);

  useEffect(() => {
    dispatch(Add_Cart_Items(jobId));
  }, [dispatch, jobId]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const applyData = {
      jobItems: cartItems,
      jobId: cartItems.job,
      name: input.name,
      email: input.email,
      phone: input.phone,
      country: input.country,
      desc: input.desc,
    };
    dispatch(Create_JobPost(jobId, applyData));
  };

  
  if (jobposts) {
    toast({
      title: `Successfully apply for ${jobposts.jobItems.title}`,
      description: "Go to Page to see Profile Details",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <div className="apply mt-2">
      <Row>
        <Col md={6} className="m-auto">
          <Card>
            <Card.Title className="text-center m-3">
              <h2 style={{ fontWeight: "bold", fontSize: "27px" }}>
                {" "}
                Apply For this post
              </h2>
            </Card.Title>
            <Card.Body>
              <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onChange={onChangeHandler}
                    name="name"
                    required
                    type="text"
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    onChange={onChangeHandler}
                    name="email"
                    required
                    type="email"
                    placeholder="Enter Email"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    onChange={onChangeHandler}
                    required
                    type="number"
                    placeholder="Enter Phone"
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    onChange={onChangeHandler}
                    name="country"
                    required
                    type="text"
                    placeholder="Enter Country"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Resume</Form.Label>
                  <Form.Control
                    defaultValue="www.goggledrive.com"
                    type="text"
                    placeholder="name"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    onChange={onChangeHandler}
                    name="desc"
                    as="textarea"
                    rows="5"
                    maxLength="100"
                    required
                    type="email"
                    placeholder="Why should you be hired for this role?"
                  />
                </Form.Group>
                <Button type="submit">Apply</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ApplyJob;
