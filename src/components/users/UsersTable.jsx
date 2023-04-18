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
  onEdit,
  onDelete,
}) => {
  // const navigation = useNavigate();
  const handlePrev = () => {
    if (type === "WITHDRAWAL") {
      PrevP(type);

      return;
    }
  };

  const handleNext = () => {
    nextP(type);
  };

  const handleFetchByPage = (newPage) => {
    fetchByPage(type, newPage);
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
                    <td>{item?.firstName + " " + item?.lastName}</td>
                    <td>{item?.email}</td>

                    <td>
                      {["active"].includes(
                        item?.accountStatus?.toLowerCase()
                      ) && (
                        <span className="has_status">
                          {item?.accountStatus}
                        </span>
                      )}
                      {["inactive"].includes(
                        item?.accountStatus?.toLowerCase()
                      ) && (
                        <span className="has_status isLost">
                          {item?.accountStatus}
                        </span>
                      )}
                    </td>
                    <td>{formateDateAndTimeByName(item?.lastLogin)}</td>
                    <td>
                      <div
                        className="d-flex butnFlex "
                        style={{ columnGap: 10 }}
                      >
                        {["active"].includes(
                          item?.accountStatus?.toLowerCase()
                        ) ? (
                          <button
                            onClick={() => onDelete(item)}
                            className="bg-danger text-light px-4 "
                            style={{ borderRadius: 10 }}
                          >
                            De-activate
                          </button>
                        ) : (
                          <button
                            onClick={() => onDelete(item)}
                            className="bg-success text-light px-4 "
                            style={{ borderRadius: 10 }}
                          >
                            Activate
                          </button>
                        )}
                      </div>
                    </td>
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
