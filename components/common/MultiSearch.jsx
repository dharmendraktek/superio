import { reactIcons } from "@/utils/icons";
import DatePickerCustom from "./DatePickerCustom";

const MultiSearch = ({
  openFields,
  setOpenFields,
  keys,
  search,
  setSearch,
  setFieldName,
  fieldName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {

  return (
    <div className="" style={{ minWidth: "400px", maxWidth:'fit-content' }}>
      <div className="d-flex border border-primary rounded-1 position-relative">
        <div
          onClick={() => setOpenFields(!openFields)}
          style={{ width: "fit-content" }}
          className="px-2 rounded-start-1 border-end border-primary bg-primary text-white fw-medium  cursor-pointer"
        >
          <span>{keys.find((item) => item.value == fieldName)?.name}</span>
          <span>{reactIcons.arrowfilldown}</span>
        </div>
        {openFields && (
          <div
            className="position-absolute border px-2 py-2 bg-white"
            style={{
              width: "390px",
              minHeight: "300px",
              maxHeight:'fit-content',
              zIndex: "10000",
              top: "35px",
            }}
          >
            <div className="w-100 d-flex flex-wrap rounded-1">
              {keys.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setFieldName(item.value);
                      setOpenFields(false);
                    }}
                    className={`cursor-pointer hover-bg-change my-1 px-2 rounded-1 fw-medium w-50 ${item.value == fieldName ? 'bg-primary text-white' : 'bg-white'}`}
                  >
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="px-2"
          placeholder="Search..."
          style={{ width: "200px" }}
          value={search}
        />
         {search &&
                // <span onClick={() => setSearch('')} className="position-absolute cursor-pointer	  text-primary fs-5" style={{right:"8px"}}>{reactIcons.close}</span>
                <button className="theme-btn btn-style-one small position-absolute" style={{right:'0px'}}>Search</button>
        }
        {/* <button className="theme-btn btn-style-one small">Search</button> */}
      </div>
      {(fieldName == "created" || fieldName == "updated") && (
        <div className="d-flex gap-2 w-100 mt-1">
          <div className="w-50">
            <DatePickerCustom
              date={startDate}
              handleDate={(date) => setStartDate(date)}
            />
          </div>
          <div className="w-50">
            <DatePickerCustom
              date={endDate}
              handleDate={(date) => setEndDate(date)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSearch;
