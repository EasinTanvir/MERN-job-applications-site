import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Row, Col, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sign_In, Sign_Up } from "../../store/actions";
import { useToast } from "@chakra-ui/react";

const AuthPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const users = useSelector((state) => state.auth);
  const { userInfo } = users;

  const [isLogedIn, setIsLogedIn] = useState(false);
  const [input, setInut] = useState({ name: "", email: "", password: "" });
  const error = useSelector((state) => state.errors);
  const { isError } = error;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInut({ ...input, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isLogedIn) {
      const recData = {
        name: input.name,
        email: input.email,
        password: input.password,
      };
      dispatch(Sign_Up(recData));
    } else {
      //sign in
      const recData = {
        email: input.email,
        password: input.password,
      };
      dispatch(Sign_In(recData));
    }
  };

  if (userInfo?.token) {
    toast({
      title: "Login successfull.",
      description: "Now you can apply & post for job",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <div className="auths mt-4">
      <Row>
        <Col className="m-auto" md={5}>
          <Card className="p-2">
            <Card.Title className="text-center">
              {isLogedIn ? "SignUp here" : "SignIn here"}
            </Card.Title>
            <Card.Body>
              <Form onSubmit={onSubmitHandler}>
                {isLogedIn && (
                  <FloatingLabel
                    controlId="floatingInput"
                    label="UserName"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      type="text"
                      name="name"
                      onChange={onChangeHandler}
                      placeholder="name"
                    />
                  </FloatingLabel>
                )}
                <FloatingLabel
                  className={isError === "sorry no user found!!" ? "" : "mb-3"}
                  controlId="floatingInput"
                  label="Email address"
                >
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    onChange={onChangeHandler}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
                {!isLogedIn && isError === "sorry no user found!!" && (
                  <p className="text-danger small mb-2">{isError}</p>
                )}
                {isLogedIn && isError === "Sorry email already taken" && (
                  <p
                    style={{ marginTop: "-8px" }}
                    className="text-danger small mb-2"
                  >
                    {isError}
                  </p>
                )}
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChangeHandler}
                  />
                </FloatingLabel>

                {!isLogedIn && isError === "Invalid password" && (
                  <p className="text-danger small mt-1">{isError}</p>
                )}
                {isLogedIn && isError === "Password must be 6 character" && (
                  <p className="text-danger small mt-1">{isError}</p>
                )}
                <Button type="submit" className="mt-3">
                  {isLogedIn ? "Register" : "Submit"}
                </Button>
              </Form>
              <div className="w-100 mt-1 text-center">
                <Button
                  onClick={() => setIsLogedIn(!isLogedIn)}
                  type="button"
                  variant="danger"
                >
                  {isLogedIn ? "Switch to SignIn" : "Switch to SignUp"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AuthPage;
