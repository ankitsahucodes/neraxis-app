import { Link } from "react-router-dom";

const Backbtn = () => {
  return (
    <>
      <div className="col-2 col-md-2 d-none d-md-block">
        <Link className="btn btn-outline-dark w-100" to="/">
          Back to Dashboard
        </Link>
      </div>

      <div className="col-12 d-md-none mb-3 ">
        <Link className="btn btn-dark w-100" to="/">
          Back to Dashboard
        </Link>
      </div>
    </>
  );
};

export default Backbtn;
