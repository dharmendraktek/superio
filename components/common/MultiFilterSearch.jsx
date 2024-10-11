import { reactIcons } from "@/utils/icons";
import DatePickerCustom from "./DatePickerCustom";

const MultiFilterSearch = ({
  openFields,
  setOpenFields,
  filterKeys,
  setFilterKeys,
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
          <span>{filterKeys.find((item, index) => index == fieldName)?.name}</span>
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
              right:'0px'
            }}
          >
            <div className="w-100 d-flex flex-wrap rounded-1">
              {filterKeys.map((item, index) => {
                return (
                  <>
                  <div
                    key={index}
                    // onClick={() => {
                    //   setFieldName(item.value);
                    //   setOpenFields(false);
                    // }}
                    className={`cursor-pointer d-flex gap-2 hover-bg-change my-1 px-2 rounded-1 fw-medium w-50 ${item.value == fieldName ? 'bg-primary text-white' : 'bg-white'}`}
                  >
                    <input type="checkbox" checked={item.selected} onChange={(e) => {
                      if(item.value == "interview_round"){
                           setOpenFields(true);
                      }else {
                         setOpenFields(false);
                      }
                      if(e.target.checked){
                        setFieldName(index);
                        let update = [...filterKeys];
                        update[index]["selected"] = e.target.checked;
                       setFilterKeys(update);
                        // keys[index]["selected"] = e.target.checked;
                        // setOpenFields(false);
                      }else{
                        setOpenFields(false);
                        let update = [...filterKeys];
                        update[index]["selected"] = e.target.checked;
                       setFilterKeys(update);
                      }
                        
                    }} />
                    <span className="fw-600">{item.name}</span>
                  </div>
            {item.name =="Interview Round" && item?.selected &&
            <div className="border position-absolute bg-white border-secondary rounded-1 w-50 h-30 px-2" style={{right:-195}}>
                  <div className="d-flex gap-2">
                    <input type="radio" name="interveiw_round" value="Client Round" checked={item.search_value == "Client" ? true : false} onClick={() => {
                      setOpenFields(false);
                      setFieldName(index);
                      let update = [...filterKeys];
                      update[index]["search_value"] = "Client";
                     setFilterKeys(update);
                    }} />
                    <label>Client Round</label>
                  </div>
                  <div className="d-flex gap-2">
                    <input type="radio" name="interveiw_round" value="L1" checked={item.search_value == "L1" ? true : false} onClick={() => {
                      setOpenFields(false);
                      setFieldName(index);
                      let update = [...filterKeys];
                      update[index]["search_value"] = "L1";
                     setFilterKeys(update);
                    }} />
                    <label>L1 Round</label>
                  </div>
                  <div className="d-flex gap-2">
                    <input type="radio"  name="interveiw_round"  value="L2" checked={item.search_value == "L2" ? true : false}
                      onClick={() => {
                        setFieldName(index);
                        setOpenFields(false);
                        let update = [...filterKeys];
                        update[index]["search_value"] = "L2";
                       setFilterKeys(update);
                      }} 
                    />
                    <label>L2 Round</label>
                  </div>
                  <div className="d-flex gap-2">
                    <input type="radio" name="interveiw_round"  value="L3" checked={item.search_value == "L3" ? true : false}
                     onClick={() => {
                      setFieldName(index);
                      setOpenFields(false);
                      let update = [...filterKeys];
                      update[index]["search_value"] = "L3";
                     setFilterKeys(update);
                    }} 
                    />
                    <label>L3 Round</label>
                  </div>
            </div>
            }
                  </>
                );
              })}
            </div>
          </div>
        )}
        <input
          type="text"
          onChange={(e) =>{ 
            setSearch(e.target.value)
          }}
          onKeyDown={(e) => {
            if(e.key == "Enter"){
               let update = [...filterKeys];
            update[fieldName]["search_value"] = search;
            setFilterKeys(update);
            setSearch('');
            }
          }}
          className="ps-2"
          placeholder="Search..."
          style={{ width: "200px" }}
          value={search}
        />
         {/* {search && */}
                <span onClick={() =>{
                   let update = [...filterKeys];
                   update[fieldName]["search_value"] = search;
                   setFilterKeys(update);
                   setSearch('');
                }} className="position-absolute cursor-pointer	  text-primary fs-5" style={{right:"8px"}}>{reactIcons.search}</span>
        {/* } */}
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

export default MultiFilterSearch;
