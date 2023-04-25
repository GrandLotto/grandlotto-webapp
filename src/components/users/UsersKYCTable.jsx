import React from "react";
// import { useNavigate } from "react-router-dom";
import { formateDateAndTimeByName } from "../../global/customFunctions";
import ComponentLoading from "../blocks/ComponentLoading";
import PaginationBlock from "../blocks/PaginationBlock";

const UsersKYCTable = ({
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
                    <td>{index < 10 ? "0" + (index + 1) : index}</td>
                    {/* <td>{item?.requestNumber || item?.id}</td> */}
                    <td>{item?.firstName + " " + item?.lastName}</td>
                    <td>{item?.email}</td>
                    <td>null</td>

                    {/* <td>
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
                    </td> */}
                    <td>{formateDateAndTimeByName(item?.lastLogin)}</td>

                    <td>
                      <div
                        className="d-flex butnFlex "
                        style={{ columnGap: 10 }}
                      >
                        <button
                          onClick={() => onEdit(item)}
                          className="bg-success text-light px-4 "
                          style={{ borderRadius: 10 }}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => onDelete(item)}
                          className="bg-danger text-light px-4 "
                          style={{ borderRadius: 10 }}
                        >
                          Decline
                        </button>
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
            <div className="grandlotto_table_small_flex " key={index}>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                <small>{formateDateAndTimeByName(item?.lastLogin)}</small>
              </div>
              <div className="grandlotto_table_small_flex_top">
                <div className="d-flex justify-content-between">
                  <h4 className="">Name</h4>
                  <h4 className="">
                    <b>{item?.firstName + " " + item?.lastName}</b>
                  </h4>
                </div>

                <div className="d-flex justify-content-between">
                  <h4 className="">Email</h4>
                  <h4 className="">{item?.email}</h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Doc URL</h4>
                  <h4 className="">null</h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Document Type</h4>
                  <h4 className="">
                    <b>null</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">ID Number</h4>
                  <h4 className="">
                    <b>null</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <div className="d-flex butnFlex " style={{ columnGap: 10 }}>
                    <button
                      onClick={() => onEdit(item)}
                      className="bg-success text-light px-4 "
                      style={{ borderRadius: 10 }}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => onDelete(item)}
                      className="bg-danger text-light px-4 "
                      style={{ borderRadius: 10 }}
                    >
                      Decline
                    </button>
                  </div>
                </div>
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

export default UsersKYCTable;
