import "./home.css";
import { useEffect, useRef, useState } from "react";
import { Row, Col, Container, Button, Toast } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { IoSearchOutline } from "react-icons/io5";
const Search = () => {
  const toast = useToast();

  const navigate = useNavigate();
  const selRef = useRef();
  const [input, setinput] = useState();
  const [location, setLocation] = useState("");

  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);

  const onSearchHandler = () => {
    if (!input && !location) {
      toast({
        title: "Warning",
        description: "Please select a keyword",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (input) {
      params.set("search", input);
    }
    if (location) {
      params.set("location", location);
    }

    navigate(`/job/search?${params}`);
  };
  return (
    <div className="left ">
      <h3 className="px-2">Find Your perfect Job Match</h3>
      <p className=" text-slate-700 mt-2 sm:text-xl text-sm">
        Find Job, Employment and carrer opprtunity
      </p>
      <div className="inputs border">
        <SearchIcon />
        <input
          onChange={(e) => setinput(e.target.value)}
          type="text"
          placeholder="Search for job"
        />
        <LocationOnIcon className="sm:block hidden" />
        <Form.Control
          className="sm:block hidden"
          onChange={(e) => setLocation(e.target.value)}
          as="select"
          name=""
          id=""
        >
          <option value="">-Location-</option>
          <option value="remote">Remote</option>
          <option value="international">International</option>
          <option value="hybrid">Hybrid</option>
        </Form.Control>
        <Button
          className="flex items-center gap-1"
          onClick={onSearchHandler}
          variant="primary"
          type="submit"
        >
          Search
          <span>
            <IoSearchOutline className="mt-1 text-lg" />
          </span>
        </Button>
      </div>
      <p className="small mt-3 text-slate-600 px-2">
        Populer searches : React, Wordpress, Php, ios, Android, Sotware
      </p>
    </div>
  );
};

export default Search;
