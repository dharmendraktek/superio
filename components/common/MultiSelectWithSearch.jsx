"use client";

import { reactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";

const MultiSelectWithSearch = ({ statesList, setStatesList, selectedState, setSelectedState }) => {
  const [filteredStates, setFilteredStates] = useState(statesList);

  // Synchronize filteredStates with the initial statesList
  useEffect(() => {
    setFilteredStates(statesList);
  }, [statesList]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm) {
      // Filter based on name and case-insensitive match
      const filterData = statesList.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      setFilteredStates(filterData);
    } else {
      // Reset to the original statesList, keeping selected state
      setFilteredStates(statesList);
    }
  };

  const handleCheckboxChange = (item) => {
    const updatedList = statesList.map((dataItem) => {
      if (dataItem.isoCode === item.isoCode) {
        // Toggle the selected property
        return { ...dataItem, selected: !dataItem.selected };
      }
      return dataItem;
    });

    // Update statesList and selectedState
    setStatesList(updatedList);
    const updatedSelectedState = updatedList.filter((state) => state.selected);
    setSelectedState(updatedSelectedState);
  };

  return (
    <div className="w-100">
      <div className="dropdown w-100">
        <button
          type="button"
          className="w-100 d-flex justify-content-between client-form-input"
          data-bs-toggle="dropdown"
        >
          <div className="d-flex gap-2 flex-wrap">
            {selectedState?.length > 0 && selectedState?.map((item, index) => (
              <div
                key={index}
                className="px-2 rounded-1"
                style={{ background: "var(--primary-2nd-color)" }}
              >
                <span>{item.name || item}</span>
              </div>
            ))}
          </div>
          <span>{reactIcons.arrowfilldown}</span>
        </button>
        <ul
          className="dropdown-menu w-100 custom-scroll-sm"
          style={{
            minHeight: "60px",
            maxHeight: "250px",
            overflow: "auto",
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Search here ..."
              className="px-2 w-100 client-form-input"
              onChange={handleSearchChange}
            />
          </div>
          {filteredStates.map((item, index) => (
            <li
              key={index}
              className="d-flex px-2 gap-2 hover-bg-change cursor-pointer"
            >
              <input
                type="checkbox"
                checked={item.selected || false}
                onChange={() => handleCheckboxChange(item)}
              />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelectWithSearch;
