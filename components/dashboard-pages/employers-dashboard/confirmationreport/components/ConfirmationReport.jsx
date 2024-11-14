"use client";

import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import Loader from "@/components/common/Loader";
import MultiFilterSearch from "@/components/common/MultiFilterSearch";
import Pagination from "@/components/common/Pagination";
import { getApiReq, getReq } from "@/utils/apiHandlers";
import { confirmationFilterKeys } from "@/utils/constant";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import FileSaver from "file-saver";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ConfirmationReport = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [confirmationData, setConfirmationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFields, setOpenFields] = useState(false);
  const [fieldName, setFieldName] = useState("search_any");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterKeys, setFilterKeys] = useState(confirmationFilterKeys);
  const [allParam, setAllParam] = useState("");
  const [type, setType] = useState();
  const [isExcelLoading, setIsExcelLoading] = useState(false);

  useEffect(() => {
    let param = "";

    // Include date parameters if both startDate and endDate are present
    if (startDate && endDate && type == "confirmation") {
      param += `&confirmation_date_start=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&confirmation_date_end=${moment(endDate).format("YYYY-MM-DD")}`;
    } else if (startDate && endDate && type == "submission") {
      param += `&submission_start=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&submission_end=${moment(endDate).format("YYYY-MM-DD")}`;
    } else if (type == "all") {
      param += `&confirmation_date_start=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&confirmation_date_end=${moment(endDate).format(
        "YYYY-MM-DD"
      )}&submission_start=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&submission_end=${moment(endDate).format("YYYY-MM-DD")}`;
    }

    // Include filtered keys
    const filterParams = filterKeys
      .filter((item) => item.selected && item.search_value) // Filter items with selected: true and search_value present
      .map((item) => `&${item.value}=${item.search_value}`) // Create the string in the format &value=search_value
      .join(""); // Join them together to form the final string

    param += filterParams; // Combine date and filter parameters

    if (param !== allParam) {
      setAllParam(param);
      setPage(0); // Set page to 0 if it's falsy
      getJobDelegationReports(param);
    } else if (page) {
      getJobDelegationReports(param);
    } else {
      getJobDelegationReports(param);
    }
  }, [startDate, endDate, page, filterKeys, type]);

  const getJobDelegationReports = async (param) => {
    setIsLoading(true);
    const response = await getReq(
      `/confirmation-joining-applicant-report/report/?page=${page + 1}&size=25${
        param ? param : ""
      }`
    );

    setIsLoading(false);

    if (response.status) {
      setDataCount(response.data.count);
      setConfirmationData(response.data.results || response.data);
    }
  };

  const handleClear = () => {
    let update = [...filterKeys];
    update.map((item) => {
      delete item["selected"];
      delete item["search_value"];
      return item;
    });
    setFilterKeys(update);
    setFieldName("");
    setStartDate(null);
    setEndDate(null);
    setSearch("");
    setType("");
    setPage(0);
  };

  const handleExportExcel = async () => {
    try {
      setIsExcelLoading(true);
      const response = await getApiReq(
        `${
          allParam
            ? `/confirmation-joining-applicant-report/report/?${allParam}&export=excel`
            : "/confirmation-joining-applicant-report/report/?export=excel"
        }`
      );
      setIsExcelLoading(false);
      if (response.status) {
        var blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileSaver.saveAs(blob, "confirmation-joining-report.xlsx");
      }
    } catch (err) {
      setIsExcelLoading(false);
      toast.error(response.error.message || "Something went wrong");
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="py-1">
        <h4>Confirmation Reports</h4>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <MultiFilterSearch
            openFields={openFields}
            setOpenFields={setOpenFields}
            filterKeys={filterKeys}
            setFilterKeys={setFilterKeys}
            search={search}
            fieldName={fieldName}
            setFieldName={setFieldName}
            setSearch={setSearch}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <div className="d-flex gap-2 justify-content-end align-items-center">
            <div className="d-flex gap-2 mt-1">
              <div className="d-flex gap-2 align-items-center">
                <label className="fw-700">Type</label>
                <select
                  onChange={(e) => setType(e.target.value)}
                  className="cursor-pointer border p-1 border-black"
                  value={type}
                >
                  <option>Select</option>
                  <option value={"confirmation"}>Confirmation</option>
                  <option value="submission">Submission</option>
                  <option value={"all"}>All</option>
                </select>
              </div>
              <div className="" style={{ width: "200px" }}>
                <DatePickerCustom
                  date={startDate}
                  handleDate={(date) => setStartDate(date)}
                  placeholder="From Date"
                />
              </div>
              <div className="" style={{ width: "200px" }}>
                <DatePickerCustom
                  date={endDate}
                  handleDate={(date) => setEndDate(date)}
                  placeholder="To Date"
                />
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                className={` small theme-btn ${
                  moment(startDate).format("DD-MM") ==
                    moment(new Date()).format("DD-MM") &&
                  moment(endDate).format("DD-MM") ==
                    moment(new Date()).format("DD-MM")
                    ? "btn-style-five"
                    : "btn-style-three"
                }`}
                onClick={() => {
                  setType("confirmation");
                  setStartDate(new Date());
                  setEndDate(new Date());
                }}
              >
                Today
              </button>
              <button
                className={` small theme-btn ${
                  moment(startDate).format("DD-MM") ===
                    moment(new Date().setDate(new Date().getDate() - 1)).format(
                      "DD-MM"
                    ) &&
                  moment(endDate).format("DD-MM") ===
                    moment(new Date().setDate(new Date().getDate() - 1)).format(
                      "DD-MM"
                    )
                    ? "btn-style-five"
                    : "btn-style-three"
                }`}
                onClick={() => {
                  const today = new Date();
                  const yesterday = new Date();
                  yesterday.setDate(today.getDate() - 1); // Set yesterday's date
                  setType("confirmation");
                  setStartDate(yesterday); // Setting yesterday's date
                  setEndDate(yesterday); // Setting today's date
                }}
              >
                Yesterday
              </button>
              <button
                className="theme-btn btn-style-two small"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div>
            <span className="text-primary">{dataCount} records</span>
          </div>
          <button
            className="theme-btn btn-style-one small d-flex gap-2"
            onClick={() => handleExportExcel()}
            disabled={isExcelLoading}
          >
            {isExcelLoading ? (
              <BtnBeatLoader />
            ) : (
              <>
                <span>Excel</span>
                <span>{reactIcons.download}</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="d-flex me-2 mt-1 mb-2">
        {filterKeys
          .sort((a, b) => (a.rank || Infinity) - (b.rank || Infinity))
          .map((item, index) => {
            return (
              <div className="">
                {item.selected && (
                  <div
                    key={item.id}
                    className="border d-flex me-2 justify-content-between border-secondary"
                  >
                    <div
                      onClick={() => {
                        setFieldName(item.id);
                        let itemIndex = filterKeys.findIndex(
                          (i) => i.id == item.id
                        );
                        setFilterKeys((prevKeys) => {
                          const update = [...prevKeys];
                          update[itemIndex] = {
                            ...update[itemIndex],
                            search_value: "",
                          };
                          return update;
                        });
                      }}
                      className="bg-gray text-white px-2 cursor-pointer"
                      htmlFor={item.value}
                    >
                      {item.name}
                    </div>
                    {item.search_value && (
                      <div className="px-2 bg-secondary fw-600">
                        {item.search_value || ""}
                        {/* <input type="text" placeholder="Search..." /> */}
                      </div>
                    )}
                    <div className="px-1 bg-secondary cursor-pointer">
                      <span
                        onClick={() => {
                          setFieldName(null);
                          setFilterKeys((prevKeys) => {
                            const update = [...prevKeys];
                            let itemIndex = update.findIndex(
                              (i) => i.id == item.id
                            );
                            update[itemIndex] = {
                              ...update[itemIndex],
                              selected: false,
                              search_value: "",
                              rank: "",
                            };
                            return update;
                          });
                        }}
                      >
                        {reactIcons.normalclose}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className="mt-2">
        <div className="table_div custom-scroll-sm">
          <table className="default-table ">
            <thead className="position-sticky">
              <tr>
                <th className="" style={{ width: "200px" }}>
                  Confirmation Date
                </th>
                <th style={{ width: "200px" }}>Submission Date</th>
                <th style={{ width: "200px" }}>Submission ID</th>
                <th style={{ width: "200px" }}>Candidate ID</th>
                <th style={{ width: "250px" }}>Candidate Name</th>
                <th style={{ width: "250px" }}>Job Title</th>
                <th style={{ width: "250px" }}>Candidate Email</th>
                <th style={{ width: "200px" }}>Candidate Mobile</th>
                <th style={{ width: "300px" }}>Client</th>
                <th style={{ width: "200px" }}>Current Status</th>
                <th style={{ width: "200px" }}>Joining Status Date</th>
                <th style={{ width: "150px" }} className="">
                  Join Status
                </th>
              </tr>
            </thead>
            <tbody>
              {confirmationData.length > 0 &&
                confirmationData?.map((item, index) => {
                  const {
                    submission_id,
                    client,
                    job_title,
                    job_id,
                    applicant_id,
                    applicant_name,
                    applicant_email,
                    applicant_mobile,
                    current_status,
                    confirmation_date,
                    joining_status_change_date,
                    submission_date,
                    joined_status,
                  } = item;

                  return (
                    <>
                      <tr key={index}>
                        <td className="" style={{ width: "200px" }}>
                          {moment(confirmation_date).format(
                            "DD-MM-YYYY  hh:mm A"
                          )}
                        </td>
                        <td className="" style={{ width: "200px" }}>
                          {moment(submission_date).format(
                            "DD-MM-YYYY  hh:mm A"
                          )}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "200px" }}
                        >
                          {submission_id}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "200px" }}
                        >
                          {applicant_id || "N/A"}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "250px" }}
                        >
                          {applicant_name || "N/A"}
                        </td>
                        <td
                          style={{ width: "250px" }}
                          className="text-capitalize"
                        >
                          {job_title || "N/A"}
                        </td>
                        <td
                          style={{ width: "250px" }}
                          className="text-capitalize"
                        >
                          {applicant_email || "N/A"}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "200px" }}
                        >
                          {applicant_mobile || "N/A"}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "300px" }}
                        >
                          {client || "N/A"}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "200px" }}
                        >
                          {current_status || "N/A"}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "200px" }}
                        >
                          {moment(joining_status_change_date).format(
                            "DD-MM-yyyy hh:mm A"
                          ) || "N/A"}
                        </td>
                        <td className="" style={{ width: "150px" }}>
                          {joined_status || "N/A"}
                        </td>
                      </tr>
                    </>
                  );
                })}
              {/* End tr */}
              {confirmationData?.length == 0 && (
                <tr className="mt-5 ">
                  <td colSpan={4} className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {dataCount > 25 && (
          <Pagination dataCount={dataCount} page={page} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export default ConfirmationReport;
