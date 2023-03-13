import React, { useEffect, useState } from "react";

const PaginationBlock = ({ handlePrev, handleNext, page, totalPages }) => {
  const [displablePrev, setdisplablePrev] = useState(false);
  const [displableNext, setdisplableNext] = useState(false);

  const previous = () => {
    if (displablePrev) {
      return;
    }

    handlePrev();
  };

  const next = () => {
    if (displableNext) {
      return;
    }

    handleNext();
  };

  useEffect(() => {
    if (page == totalPages) {
      setdisplableNext(true);
    }
    if (page == 1) {
      setdisplablePrev(true);
    }
  }, [page, totalPages]);

  return (
    <div className="d-flex justify-content-end pr-5 mt-3">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className={`page-item  ${displablePrev ? "disabled" : ""}`}
            onClick={() => previous()}
          >
            <a className="page-link" href="#">
              Previous
            </a>
          </li>

          <li
            className={`page-item  ${displableNext ? "disabled" : ""}`}
            onClick={() => next()}
          >
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationBlock;
