import { reactIcons } from '@/utils/icons';
import React from 'react';
import ReactPaginate from 'react-paginate';
const Pagination = ({ dataCount, pageSize, setPage, page }) => {
  const handlePageClick = (event) => {
    setPage(event.selected);
  };
  return (
    <div className="py-4 d-flex justify-content-center align-items-center">
      {/* <div>
        <label className="text-black">Page Size</label>
        <select
          onChange={(e) => setPageSize(e.target.value)}
          value={pageSize}
          className="w-16 border-[1px] custom-select-drop text-black ml-3 border-yellow rounded-md py-1 px-2 border-solid"
        >
          <option value={'10'}>10</option>
          <option value={'20'}>20</option>
        </select>
      </div> */}
      <ReactPaginate
        nextLabel={<span className='fs-4'>{reactIcons.fastForward}</span>}        
        onPageChange={handlePageClick}
        forcePage={page}
        pageRangeDisplayed={2}
        pageCount={Math.ceil(dataCount/ 25)}
        previousLabel={<span className='fs-4'>{reactIcons.fastBackward}</span>}
        renderOnZeroPageCount={null}
        containerClassName="d-flex justify-content-center text-black gap-2 align-items-center pagination-container"
        pageClassName="pagination-item-style"
        activeClassName="bg-primary text-white"
        previousClassName="pagination-item-style"
        nextClassName="pagination-item-style"
        disabledClassName="disabled-item"
      />
    </div>
  );
};

export default Pagination;