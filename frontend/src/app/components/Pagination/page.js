import React from 'react';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons"; // for customizing icons

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={onPageChange}
      containerClassName="pagination"
      activeClassName="active"
      previousClassName="btn"
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'} 
      disabledClassName={'align-disabled'}
      previousLabel={
        <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
          <AiFillLeftCircle />
        </IconContext.Provider>
      }      
      nextLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
            <AiFillRightCircle />
          </IconContext.Provider>
        }      
    />
  );
};

export default Pagination;