import { reactIcons } from "@/utils/icons";

const SelectWithSearch = ({list, setList, onChange}) => {
 return(
    <div className="position-relative">
    <div
      className="client-form-input d-flex justify-content-between"
    //   onClick={() => setOpenLang(!openLang)}
    >
      {/* <div>
        {form.languages.map((item) => {
          return <span>{item.name},</span>;
        })}
      </div> */}
      <span className=" float-end">{reactIcons.downarrow}</span>
    </div>
    {true && (
      <div
        className="position-absolute bg-white border border-1 w-100 px-2"
        style={{ top: "33px", zIndex: 10000 }}
      >
        {list.map((item, index) => {
          return (
            <div key={index} className="">
              <input
                type="checkbox"
                checked={item.is_checked}
                onChange={onChange}
              />
              <span className="mx-2">{item.username}</span>
            </div>
          );
        })}
      </div>
    )}
  </div>
 )   
}

export default SelectWithSearch;