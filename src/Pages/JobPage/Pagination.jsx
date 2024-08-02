import Pagination from "@mui/material/Pagination";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({ numberOfPage }) => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const paramValue = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const onChangeHandler = (event, value) => {
    params.set("page", value.toString());
    navigate(`${pathname}?${params}`);
  };

  return (
    <Pagination
      color="primary"
      page={paramValue}
      defaultPage={2}
      siblingCount={0}
      boundaryCount={2}
      count={numberOfPage}
      onChange={onChangeHandler}
      shape="rounded"
    />
  );
};

export default Paginations;
