"use client";
import { getReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import { useCallback, useEffect, useState } from "react";
import { throttle } from "lodash";

const TagToJobApplicantModal = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobPostList, setJobPostList] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState();
  const [selectJob, setSelectJob] = useState();


  const getJobpostsList = useCallback(
    throttle(async (searchQuery, pageNumber) => {
      setIsLoading(true);
      const response = await getReq(
        `/jobs/?page=${pageNumber + 1}&active=true${searchQuery ? `&search=${searchQuery}` : ""}`
      );
      setIsLoading(false);
      if (response.status) {
        setJobPostList(response.data.results);
      }
    }, 300), // Throttle with a 300ms delay
    []
  );

  useEffect(() => {
    if (search) {
      setPage(0); // Reset page when search changes
    }

    // Call the throttled function
    getJobpostsList(search, page);

    // Cleanup the throttle on component unmount
    return () => {
      getJobpostsList.cancel();
    };
  }, [search, page, getJobpostsList]);

  return (
    <div
      style={{ width: "1000px !important" }}
      className="offcanvas offcanvas-end"
      tabindex="-1"
      id="tagToJobApplicantModal"
      aria-labelledby="tagToJobApplicantRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="tagToJobApplicantRightLabel" className="text-primary fw-500">
          Tag To Job
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          id="closeBtnInterview"
          // onClick={() => setForm(initialState)}
        ></button>
      </div>
      <div className="offcanvas-body">
        <div>
          <div className="px-5">
            <div className="d-flex gap-5">
              <p className="fs-6">Select Job</p>
              <div className="position-relative">
                <div
                  className="d-flex border border-secondary px-2  justify-content-between"
                  style={{ width: "300px" }}
                  
                >
                  {/* Clicking the text area should not trigger the dropdown */}
                  <p>
                    {selectJob?.job_code}  {selectJob?.title}
                  </p>

                  {/* Clicking the arrow toggles the dropdown */}
                  <span onClick={() => setOpen(!open)} className="cursor-pointer">
                    {reactIcons.arrowfilldown}
                  </span>
                </div>

                {/* Only show the dropdown if `open` is true */}
                {open && (
                  <div
                    className="position-absolute border shadow"
                    style={{
                      zIndex: 10,
                      backgroundColor: "white",
                      width: "100%",
                    }}
                  >
                    <div className="">
                      {/* Search input */}
                      <input
                        type="text"
                        className="w-100 px-2 border border-secondary fw-600 text-black"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search job..."
                      />

                      {/* Filtered job list based on search */}
                      <ul className="border border-secondary table_div_custom custom-scroll-sm" style={{ listStyle: "none", paddingLeft: 0, height:'400px' }}>
                        {jobPostList.map((item, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                setSelectJob(item);
                                setOpen(false); // Close the dropdown when an item is selected
                              }}
                              className="curor-pointer px-2 py-1 text-black fw-600"
                            >
                            {item.job_code} - {item.title}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex my-2 gap-5">
              <p className="fs-6">Applicant Id</p>
              <div>
                <input type="text" className="w-100" disabled value={'applicant'} />
              </div>
            </div>
            <div className="d-flex my-2 gap-3">
              <p className="fs-6">Applicant Name</p>
              <div>
                <input type="text" className="w-100" disabled value={'sdfsd'} />
              </div>
            </div>
            <div className="d-flex my-2 gap-4">
              <p className="fs-6">Email Address</p>
              <div>
                <input type="text" className="w-100" disabled value={'sdfsd'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagToJobApplicantModal;
