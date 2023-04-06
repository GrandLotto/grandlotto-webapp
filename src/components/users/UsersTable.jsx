import React from "react";
// import { useNavigate } from "react-router-dom";
import {
  addComma,
  formateDateAndTimeByName,
} from "../../global/customFunctions";
import ComponentLoading from "../blocks/ComponentLoading";
import PaginationBlock from "../blocks/PaginationBlock";

const UsersTable = ({
  columns,
  page,
  totalPages,
  data,
  type,
  nextP,
  PrevP,
  isLoading,
  fetchByPage,
  hasPagination = true,
  columnSpan = "6",
  noDataText = "No user found",
}) => {
  // const navigation = useNavigate();
  const handlePrev = () => {
    if (type === "WITHDRAWAL") {
      PrevP(type);

      return;
    }
  };

  const handleNext = () => {
    if (type === "WITHDRAWAL") {
      nextP(type);

      return;
    }

    if (type === "DEPOSIT") {
      nextP(type);

      return;
    }
  };

  const handleFetchByPage = (newPage) => {
    if (type === "WITHDRAWAL") {
      fetchByPage(type, newPage);

      return;
    }

    if (type === "DEPOSIT") {
      fetchByPage(type, newPage);

      return;
    }
  };
  return (
    <>
      {isLoading && <ComponentLoading inner={true} title="Please wait ..." />}
      <div className="grandlotto_table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                {columns &&
                  columns?.map((head, index) => (
                    <th key={index}>{head?.name}</th>
                  ))}
              </tr>
            </thead>

            {data && data?.length ? (
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    {/* <td>{index < 10 ? "0" + (index + 1) : index}</td> */}
                    <td>{item?.requestNumber || item?.id}</td>
                    <td>
                      {type === "WITHDRAWAL"
                        ? item?.bankName + " (" + item?.accountNumber + ")"
                        : item?.channel}
                    </td>
                    {/* <td>{item?.accountNumber}</td> */}
                    <td>
                      {formateDateAndTimeByName(
                        item?.dateRequested || item?.datePaid
                      )}
                    </td>
                    <td>
                      {(item?.status?.toLowerCase() === "pending" ||
                        item?.status?.toLowerCase() === "processing") && (
                        <span className="has_status isPending">
                          {item?.status}
                        </span>
                      )}

                      {item?.status?.toLowerCase() === "lost" && (
                        <span
                          className={`has_status ${[
                            item?.status?.toLowerCase() === "lost"
                              ? "isLost"
                              : "",
                          ]}`}
                        >
                          {item?.status}
                        </span>
                      )}
                    </td>
                    <td>₦ {item?.amount ? addComma(item?.amount) : 0}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={columnSpan}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className="no_data_div">
                        <br />
                        <br />
                        <br />
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ flexDirection: "column" }}
                        >
                          <h4
                            className="mb-4"
                            style={{ fontSize: "18px", fontWeight: 500 }}
                          >
                            {noDataText}
                          </h4>
                        </div>

                        <br />
                        <br />
                        <br />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>

      <div className="grandlotto_table_small border-top">
        {data && data?.length ? (
          data?.map((item, index) => (
            <div
              className="grandlotto_table_small_flex d-flex justify-content-between"
              key={index}
            >
              <div className="grandlotto_table_small_flex_left">
                <div className="d-flex">
                  {(item?.status?.toLowerCase() === "pending" ||
                    item?.status?.toLowerCase() === "processing") && (
                    <div className="fullStop pending"></div>
                  )}

                  {item?.status?.toLowerCase() === "lost" && (
                    <div className="fullStop error"></div>
                  )}
                  <div>
                    <h4 className="">
                      Request ID: {item?.requestNumber || item?.id}
                    </h4>
                    <p className="">
                      {formateDateAndTimeByName(item?.dateRequested)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grandlotto_table_small_flex_right">
                <h4 className="">
                  ₦{item?.amount ? addComma(item?.amount) : 0}
                </h4>
                <p className="">
                  <span className="d-block">{item?.bankName}</span>
                  <span className="d-block mt-2">({item?.accountNumber})</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="no_data_div">
              <br />
              <br />
              <br />
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <h4
                  className="mb-4"
                  style={{ fontSize: "18px", fontWeight: 500 }}
                >
                  {noDataText}
                </h4>
              </div>

              <br />
              <br />
              <br />
            </div>
          </div>
        )}
      </div>

      {data && data?.length && hasPagination ? (
        <PaginationBlock
          handlePrev={handlePrev}
          handleNext={handleNext}
          page={page}
          totalPages={totalPages}
          handleFetchByPage={handleFetchByPage}
        />
      ) : null}
    </>
  );
};

export default UsersTable;
