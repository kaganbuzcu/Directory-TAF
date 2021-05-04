import React, { useState } from "react";
import "./dataTable.scss";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import {
  CButton
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

const dotDefinitions = {
  1: "inci",
  2: "nci",
  3: "üncü",
  4: "üncü",
  5: "inci",
  6: "ncı",
  7: "nci",
  8: "inci",
  9: "uncu",
  10: "uncu",
  20: "nci",
  30: "uncu",
  40: "ıncı",
  50: "nci",
  60: "ıncı",
  70: "inci",
  80: "inci",
  90: "ıncı",
};

const SearchBar = (props) => {
  let input;
  const [filterValue, setFilterValue] = useState("");
  const handleOnChange = (e) => {
    let value = e.target.value;
    setFilterValue(value);
    props.onSearch(value);
    if (value !== undefined) {
      if (value.slice(-1) === ".") {
        let beforeDot =
          value.slice(-2, -1) !== "0"
            ? value.slice(-2, -1)
            : value.slice(-3, -1);
        if (!isNaN(beforeDot) && beforeDot !== " ") {
          setFilterValue(
            `${value.slice(0, -1)}'${dotDefinitions[parseInt(beforeDot)]}`
          );
          props.onSearch(
            `${value.slice(0, -1)}'${dotDefinitions[parseInt(beforeDot)]}`
          );
        }
      }
    }
  };
  return (
    <div>
      <input
        className="form-control"
        ref={(n) => (input = n)}
        type="text"
        onChange={handleOnChange}
        value={filterValue}
        placeholder="Ara..."
        style={{ marginBottom: 15 }}
      />
    </div>
  );
};

const DataTable = (props) => {
  const {
    columns,
    rows,
    isCellEditActive,
    asyncUpdateMethod,
    isAddButtonActive,
    addButtonText,
    onAddButtonClick,
    isDeleteButtonActive,
    deleteButtonText,
    onDeleteButtonClick
  } = props;

  const beforeSaveCell = (oldValue, newValue, row, column) => {
    asyncUpdateMethod(oldValue, newValue, row, column);
  }

  const options = {
    custom: true,
    paginationSize: 10,
    pageStartIndex: 1,
    firstPageText: "İlk",
    prePageText: "Geri",
    nextPageText: "İleri",
    lastPageText: "Son",
    nextPageTitle: "İlk Sayfa",
    prePageTitle: "Önceki Sayfa",
    firstPageTitle: "Sonraki Sayfa",
    lastPageTitle: "Son Sayfa",
    showTotal: true,
    totalSize: rows.length,
  };

  const contentTable = ({ paginationProps, paginationTableProps }) => (
    <div>
      <PaginationListStandalone {...paginationProps} />
      <ToolkitProvider
        keyField="ID"
        columns={columns}
        data={rows}
        search={{
          searchFormatted: true,
        }}
      >
        {(toolkitprops) => (
          <div>
            <SearchBar {...toolkitprops.searchProps} />
            {isDeleteButtonActive !== undefined && isDeleteButtonActive === true
              ? (
                <div className="float-right">
                  <CButton
                    color="danger"
                    className="m-2"
                    style={{
                      alignItems: "center",
                      display: "flex"
                    }}
                    onClick={onDeleteButtonClick}
                  >
                    <CIcon content={freeSet.cilDelete} style={{ width: 20, height: 20 }} />
                    <span>{deleteButtonText}</span>
                  </CButton>
                </div>
              )
              : undefined}
            {isAddButtonActive !== undefined && isAddButtonActive === true
              ? (
                <div className="float-right">
                  <CButton
                    color="success"
                    className="m-2"
                    style={{
                      alignItems: "center",
                      display: "flex"
                    }}
                    onClick={onAddButtonClick}
                  >
                    <CIcon content={freeSet.cilPlus} style={{ width: 20, height: 20 }} />
                    <span>{addButtonText}</span>
                  </CButton>
                </div>
              )
              : undefined}
            <BootstrapTable
              striped
              hover
              {...toolkitprops.baseProps}
              {...paginationTableProps}
              cellEdit={
                isCellEditActive !== undefined && isCellEditActive === true
                  ? cellEditFactory({
                    mode: "dbclick",
                    beforeSaveCell
                  })
                  : undefined
              }
            />
          </div>
        )}
      </ToolkitProvider>
      <PaginationListStandalone {...paginationProps} />
    </div>
  );

  return (
    <PaginationProvider pagination={paginationFactory(options)}>
      {contentTable}
    </PaginationProvider>
  );
};

export default DataTable;
