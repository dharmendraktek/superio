"use client";

import AddMomAction from "@/components/common/AddMomAction";
import AddMomModal from "@/components/common/AddMomModal";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import JobDetailsPreviewModal from "@/components/common/JobDetailsPreviewModal";
import Loader from "@/components/common/Loader";
import MultiFilterSearch from "@/components/common/MultiFilterSearch";
import MultiSearch from "@/components/common/MultiSearch";
import Pagination from "@/components/common/Pagination";
import { deleteReq, getApiReq, getReq } from "@/utils/apiHandlers";
import { jobReportFilterKey } from "@/utils/constant";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import { cleanString } from "@/utils/regex";
import FileSaver from "file-saver";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Mom = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [momData, setMomData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFields, setOpenFields] = useState(false);
  const [fieldName, setFieldName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openAct, setOpenAct] = useState(false);
  const [expand, setExpand] = useState(null);
  const [allParam, setAllParam] = useState("");
  const [filterKeys, setFilterKeys] = useState(jobReportFilterKey);
  const [momItem, setMomItem] = useState("");
  const [momActionDetails, setMomActionDetails] = useState("");
  const [openAssign, setOpenAssign] = useState(null);
  const [openTaskOwner, setOpenTaskOwner] = useState(null);

  useEffect(() => {
    let param = "";

    // Include date parameters if both startDate and endDate are present
    if (startDate && endDate) {
      param += `&job_created_start=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&job_created_end=${moment(endDate).format("YYYY-MM-DD")}`;
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
      getMomList(param);
    } else if (page) {
      getMomList(param);
    } else {
      getMomList(param);
    }
  }, [startDate, endDate, page, filterKeys]);

  const handleClear = () => {
    const updatedFilters = filterKeys.map((item) => ({
      ...item,
      selected: false,
      search_value: null,
      rank: null,
    }));
    setFilterKeys(updatedFilters);
    setFieldName("");
    setStartDate(null);
    setEndDate(null);
    setSearch("");
    setPage(0);
  };

  const handleExportExcel = async () => {
    const response = await getApiReq(
      `${
        allParam
          ? `/job-report/report/?${allParam}&export=excel`
          : "/job-report/report/?export=excel"
      }`
    );
    if (response.status) {
      var blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(blob, "jobs-report.xlsx");
    }
  };

  const getMomList = async (param) => {
    setIsLoading(true);
    const response = await getReq(
      `/meeting-minutes/?page=${page + 1}&size=25${param ? param : ""}`
    );
    setIsLoading(false);
    if (response.status) {
      setDataCount(response.data.count);
      setMomData(response.data.results || response.data);
    }
  };

  const handleDeleteAction = async (id) => {
    const response = await deleteReq(`/meeting-action-items/${id}/`);
    if (response.status) {
      toast.success("Action Item has been successfully Deleted");
      getMomList();
    }
  };

  const handleDeleteMom = async (id) => {
    const response = await deleteReq(`/meeting-minutes/${id}/`);
    if (response.status) {
      toast.success("MOM has been successfully Deleted");
      getMomList();
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <AddMomModal
        handleGetMom={getMomList}
        momItem={momItem}
        setMomItem={setMomItem}
      />
      <AddMomAction
        setMomActionDetails={setMomActionDetails}
        momActionDetails={momActionDetails}
        handleGetMom={getMomList}
        momItem={momItem}
        setMomItem={setMomItem}
      />
      <JobDetailsPreviewModal jobDetails={momItem} setJobDetails={setMomItem} />
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <div className="py-1 d-flex align-item-center gap-2">
            <h4>MOM (Meetings of Minutes)</h4>
          </div>
          {/* <MultiFilterSearch
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
          /> */}
          <div className="d-flex gap-2 justify-content-end align-items-center">
            {/* <div className="d-flex gap-2 mt-1">
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
            </div> */}
            {/* <div className="d-flex gap-2">
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
            </div> */}
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div>
            {/* <span className="text-primary">{dataCount} records</span> */}
          </div>
          {/* <button
            className="theme-btn btn-style-one small d-flex align-items-center gap-2"
            onClick={() => handleExportExcel()}
          >
            <span className="fw-600 fs-6">Excel</span>
            <span>{reactIcons.download}</span>
          </button> */}
          {/* <button
            className="theme-btn btn-style-one small d-flex align-items-center gap-2"
            // onClick={() => handleExportExcel()}
            data-bs-toggle="offcanvas"
            data-bs-target="#addMomModal"
            aria-controls="offcanvasRight"
          >
            <span className="fw-600 fs-6">Create</span>
          </button> */}
          <div class="dropdown">
            <button
              type="button"
              class="theme-btn btn-style-one small"
              data-bs-toggle="dropdown"
            >
              Create
            </button>
            <ul class="dropdown-menu">
              <li
                // data-bs-toggle="offcanvas"
                // data-bs-target="#addMomModal"
                // aria-controls="offcanvasRight"
                className="cursor-pointer text-black"
                onClick={() => {
                  setMomItem("");
                }}
              >
                <Link href="/employers-dashboard/add-mom">
                  <span class="dropdown-item" href="">
                    MOM
                  </span>
                </Link>
              </li>
              <li
                data-bs-toggle="offcanvas"
                data-bs-target="#addMomActionModal"
                aria-controls="offcanvasLeft"
                className="cursor-pointer  text-black"
                //  onClick={() => setOpen(!open)}
              >
                <a class="dropdown-item" href="#">
                  Action Item
                </a>
              </li>
            </ul>
          </div>
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
                  Action Item
                </th>
                <th style={{ width: "250px" }}>Subject</th>
                <th style={{ width: "200px" }}>Minutes Description</th>
                <th style={{ width: "150px" }}>Participants</th>
                <th style={{ width: "200px" }}>Status</th>
                <th style={{ width: "200px" }}>Created By</th>
                <th style={{ width: "200px" }}>Updated By</th>
                <th style={{ width: "200px" }}>Create At</th>
                <th style={{ width: "200px" }}>Updated At</th>
                <th style={{ width: "150px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {momData.length > 0 &&
                momData?.map((item, index) => {
                  const {
                    id,
                    action_items,
                    participants_details,
                    created_by,
                    updated_by,
                    status_details,
                    subject,
                    description,
                    created_at,
                    updated_at,
                    status,
                    participants,
                  } = item;

                  return (
                    <>
                      <tr key={index}>
                        <td className="" style={{ width: "200px" }}>
                          {item.action_items.length > 0 && (
                            <>
                              <div
                                onClick={() => {
                                  if (expand == item.id) {
                                    setExpand(null);
                                    // setClientData((prev) => {
                                    //   const update = [...prev];
                                    //   update[index]["open"] = false;
                                    //   return update;
                                    // });
                                  } else {
                                    setExpand(item.id);
                                    // setClientData((prev) => {
                                    //   const update = [...prev];
                                    //   update[index]["open"] = true;
                                    //   return update;
                                    // });
                                  }
                                }}
                                className="mx-2 px-1 d-flex gap-1 justify-content-center align-items-center text-white  rounded-1 cursor-pointer fw-bold fs-6"
                                style={{
                                  background: "var(--primary-2nd-color)",
                                }}
                              >
                                <div
                                  className="text-white "
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    fontSize: "12px",
                                    borderRadius: "3px",
                                    background: "var(--primary-2nd-color)",
                                  }}
                                >
                                  <p
                                    className="text-white fw-medium"
                                    style={{ fontSize: "15px" }}
                                  >
                                    {item.action_items.length}
                                  </p>
                                </div>
                                <span className="cursor-pointer text-white fs-4">
                                  {item.id == expand
                                    ? reactIcons.arrowfillup
                                    : reactIcons.arrowfilldown}
                                </span>
                              </div>
                            </>
                          )}
                        </td>
                        <td
                          className="text-primary cursor-pointer"
                          style={{ width: "250px" }}
                        >
                          {/* <span
                            data-bs-toggle="offcanvas"
                            data-bs-target="#addMomModal"
                            aria-controls="offcanvasRight"
                            onClick={() => setMomItem(item)}
                          >
                            {subject}
                          </span> */}
                          <Link
                            href="/employers-dashboard/mom/[id]"
                            as={`/employers-dashboard/mom/${item.id}`}
                            // target="_blank"
                          >
                            {subject}
                          </Link>
                          <span
                            data-bs-toggle="offcanvas"
                            data-bs-target="#addMomActionModal"
                            aria-controls="offcanvasLeft"
                            className="text-primary px-2 fs-5"
                            onClick={() => setMomItem(item)}
                          >
                            {reactIcons.add}
                          </span>
                        </td>
                        <td
                          className="text-capitalize text-center d-flex gap-1"
                          style={{ width: "200px" }}
                        >
                          <span
                            data-bs-toggle="modal"
                            data-bs-target="#jobDetailsPreviewModal"
                            className="cursor-pointer text-primary fs-5"
                            id="jobDetailsPreview"
                            onClick={() => {
                              setMomItem(item);
                            }}
                          >
                            {reactIcons.view}
                          </span>
                        </td>
                        <td
                          style={{ width: "150px" }}
                          className=""
                          onMouseEnter={() => setOpenAssign(item.id)}
                          onMouseLeave={() => setOpenAssign(null)}
                        >
                          <div className="d-flex px-5 position-relative">
                            <span className="cursor-pointer text-primary fs-5">
                              {reactIcons.peoplegroup}
                            </span>
                            {openAssign == item.id && (
                              <div
                                className="position-absolute bg-lightestblue px-2 d-flex gap-2 flex-wrap rounded-1"
                                style={{
                                  width: "250px",
                                  minHeight: "30px",
                                  maxHeight: "fit-content",
                                  zIndex: "5",
                                }}
                              >
                                {participants_details.map((item) => {
                                  return (
                                    <span className="text-white">
                                      {item.first_name} {item.last_name}
                                    </span>
                                  );
                                })}
                                <span className="text-white">
                                  {participants_details.length == 0 &&
                                    "Not available"}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "200px" }}
                        >
                          {status_details?.name || "N/A"}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "200px" }}
                        >
                          {created_by?.first_name +
                            " " +
                            created_by.last_name || "N/A"}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "200px" }}
                        >
                          {updated_by?.first_name +
                            " " +
                            updated_by.last_name || "N/A"}
                        </td>
                        <td style={{ width: "200px" }}>
                          {moment(created_at).format("DD-MM-yyyy hh:mm A")}
                        </td>
                        <td style={{ width: "200px" }}>
                          {moment(updated_at).format("DD-MM-yyyy hh:mm A")}
                        </td>
                        <td style={{ width: "150px" }}>
                          <div>
                            <span
                              className="text-primary cursor-pointer"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#addMomModal"
                              aria-controls="offcanvasRight"
                              onClick={() => setMomItem(item)}
                            >
                              {reactIcons.edit}
                            </span>
                            <span
                              className="text-danger cursor-pointer"
                              onClick={() => handleDeleteMom(item.id)}
                            >
                              {reactIcons.delete}
                            </span>
                          </div>
                        </td>
                      </tr>
                      {item.id == expand && (
                        <tr style={{ background: "white" }}>
                          <td colSpan={10}>
                            <div
                              className="mx-5 my-3 border rounded-1  inner-table shadow custom-scroll-2nd"
                              style={{ height: "400px", overflow: "auto" }}
                            >
                              <div></div>
                              <table>
                                <thead className="table-inner-thead">
                                  <th style={{ width: "300px" }}>Task</th>
                                  <th style={{ width: "100px" }}>Task Owner</th>
                                  <th style={{ width: "100px" }}>Timeline</th>
                                  <th style={{ width: "300px" }}>
                                    Action Taken
                                  </th>
                                  <th style={{ width: "300px" }}>Result</th>
                                  <th style={{ width: "150px" }}>Status</th>
                                  <th>Created At</th>
                                  <th>Updated At</th>
                                  <th>Head Ownership</th>
                                  <th>Action</th>
                                </thead>
                                <tbody
                                  style={{
                                    height: "400px !important",
                                    overflow: "auto",
                                  }}
                                >
                                  {item.action_items.map((action, _index) => {
                                    const {
                                      task,
                                      timeline,
                                      action_taken,
                                      result,
                                      created_at,
                                      updated_at,
                                      meeting_ref,
                                      ownership_details,
                                      head_ownership_details,
                                      status,
                                    } = action;
                                    return (
                                      <tr key={_index}>
                                        <td
                                          onClick={() => {
                                            setMomActionDetails(action);
                                            setMomItem(item);
                                          }}
                                          data-bs-toggle="offcanvas"
                                          data-bs-target="#addMomActionModal"
                                          aria-controls="offcanvasLeft"
                                          className="cursor-pointer fw-bold"
                                          style={{ width: "300px" }}
                                        >
                                          {task || "N/A"}
                                        </td>
                                        <td
                                          style={{ width: "100px" }}
                                          className=""
                                          onMouseEnter={() =>
                                            setOpenTaskOwner(action.id)
                                          }
                                          onMouseLeave={() =>
                                            setOpenTaskOwner(null)
                                          }
                                        >
                                          <div className="d-flex px-5 position-relative">
                                            <span className="cursor-pointer text-primary fs-5">
                                              {reactIcons.peoplegroup}
                                            </span>
                                            {openTaskOwner == action.id && (
                                              <div
                                                className="position-absolute bg-lightestblue px-2 d-flex gap-2 flex-wrap rounded-1"
                                                style={{
                                                  width: "250px",
                                                  minHeight: "30px",
                                                  maxHeight: "fit-content",
                                                  zIndex: "5",
                                                }}
                                              >
                                                {ownership_details.map(
                                                  (item) => {
                                                    return (
                                                      <span className="text-white">
                                                        {item.first_name}{" "}
                                                        {item.last_name}
                                                      </span>
                                                    );
                                                  }
                                                )}
                                                <span className="text-white">
                                                  {ownership_details.length ==
                                                    0 && "Not available"}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </td>
                                        <td style={{ width: "100px" }}>
                                          {moment(timeline).format(
                                            "DD-MM-yyyy"
                                          ) || "N/A"}
                                        </td>
                                        <td style={{ width: "300px" }}>
                                          {action_taken || "N/A"}
                                        </td>
                                        <td style={{ width: "300px" }}>
                                          {result || "N/A"}
                                        </td>
                                        <td style={{ width: "150px" }}>
                                          {status_details.name || "N/A"}
                                        </td>
                                        <td>
                                          {moment(created_at).format(
                                            "DD-MM-yyyy"
                                          )}
                                        </td>
                                        <td>
                                          {moment(updated_at).format(
                                            "DD-MM-yyyy"
                                          )}
                                        </td>
                                        <td className="d-flex gap-1">
                                          {head_ownership_details.map(
                                            (item) => {
                                              return (
                                                <span
                                                  key={item.id}
                                                  className="text-black"
                                                >
                                                  {item.first_name}{" "}
                                                  {item.last_name}
                                                </span>
                                              );
                                            }
                                          )}
                                        </td>
                                        <td>
                                          <div className="d-flex gap-1">
                                            <Link
                                              href="/employers-dashboard/mom/[id]"
                                              as={`/employers-dashboard/mom/${item.id}`}
                                              // target="_blank"
                                            >
                                              <span
                                                className="text-primary cursor-pointer"
                                                // data-bs-toggle="offcanvas"
                                                // data-bs-target="#addMomActionModal"
                                                // aria-controls="offcanvasLeft"
                                                // onClick={() =>
                                                //   setContactDetails(action)
                                                // }
                                              >
                                                {reactIcons.edit}
                                              </span>
                                            </Link>
                                            <span
                                              onClick={() =>
                                                handleDeleteAction(action.id)
                                              }
                                              className="text-danger cursor-pointer"
                                            >
                                              {reactIcons.delete}
                                            </span>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              {/* End tr */}
              {momData?.length == 0 && (
                <tr className="mt-5 ">
                  <td colSpan={6} className="text-center">
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

export default Mom;
