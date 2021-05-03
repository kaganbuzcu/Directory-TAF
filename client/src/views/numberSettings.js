import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchAction as fetchLocationsAction
} from "../store/ducks/locations/actions";
import {
  fetchAction as fetchSubLocationsAction
} from "../store/ducks/subLocations/actions";
import {
  fetchAction as fetchNumbersAction,
  changeInsertInput,
  insertAction,
  updateAction,
  deleteAction,
  clearApiCallStatus
} from "../store/ducks/numbers/actions";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCollapse,
  CSpinner
} from "@coreui/react";
import Select from "react-select";
import { DataTable } from "../components/dataTable";
import { InsertFormModal } from "../components/insertFormModal";
import { NumberInsertForm } from "../components/numberInsertForm";
import { Alert } from "../components/alert";
import { IconButton } from "../components/iconButton";
import { freeSet } from "@coreui/icons";

const NumberSettings = (props) => {
  const [collapse, setCollapse] = useState(false);

  const {
    onPageLoad,
    onChangeInsertInput,
    onInsertFormSubmit,
    onUpdateSubmit,
    onDeleteSubmit,
    onChangeAlertShow,
  } = props.methods;

  const {
    locations,
  } = props.states.locations;

  const {
    subLocations,
  } = props.states.subLocations;

  const {
    numbers,
    loading,
    insertInputValues,
    apiCallStatus,
    apiCallStatusMessage
  } = props.states.numbers;

  const options = [{
    value: 0,
    label: "Tümü",
    locationID: 0
  }];

  if (subLocations.length !== 0) {
    subLocations.map((subLocation, index) => {
      options.push({
        value: subLocation.ID,
        label: subLocation.name,
        locationID: subLocation.locationID
      });
    })
  }

  const directoryColumns = [
    {
      dataField: "ID",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "duty",
      text: "MAKAM",
    },
    {
      dataField: "rank",
      text: "RÜTBE",
    },
    {
      dataField: "nameSurname",
      text: "ADI SOYADI",
    },
    {
      dataField: "internalNumber",
      text: "DAHİLİ",
    },
    {
      dataField: "gsm",
      text: "CEP TELEFONU",
    },
    {
      dataField: "removeNumber",
      text: "",
      editable: false,
      formatter: (cell, row, rowIndex, colIndex) => {
        return (
          <IconButton
            color="danger"
            onClick={() => onRemoveButtonClick(row.ID)}
            icon={freeSet.cilTrash}
          />
        );
      },
    },
  ];

  /**Get */
  useEffect(() => {
    onPageLoad();
  }, []);

  /** Sub Location Select */
  const [selectedSubLocation, setSelectedSubLocation] = useState({});
  const [isAddButtonActive, setisAddButtonActive] = useState(false);
  const onChangeSubLocationSelect = (selected) => {
    setSelectedSubLocation(selected);
    if (selected.value != "0")
      setisAddButtonActive(true);
    else
      setisAddButtonActive(false);
    setCollapse(false);
    setTimeout(() => {
      setCollapse(true);
    }, 500);
  }

  /** Insert */
  const [modalShow, setModal] = useState(false);
  const onModalToggle = () => {
    onChangeInsertInput({ name: "subLocationID", value: selectedSubLocation.value });
    onChangeInsertInput({ name: "locationID", value: selectedSubLocation.locationID });
    setModal(!modalShow);
  };

  const handleKeypress = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      insertFormSubmit();
      e.preventDefault();
    }
  };

  const inputChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    onChangeInsertInput({ name, value });
  }

  const insertFormSubmit = () => {
    onInsertFormSubmit(insertInputValues);
  }

  useEffect(() => {
    if (apiCallStatus === 'success') {
      setModal(false);
    }
  }, [apiCallStatus]);

  /**Update */
  const updateCell = (oldValue, newValue, row, column) => {
    let params = {
      column: column.dataField,
      data: newValue,
      id: row.ID
    }
    onUpdateSubmit(params);
  }

  /**Remove */
  const onRemoveButtonClick = (id) => {
    onDeleteSubmit(id);
  }

  if (loading) {
    return (
      <CSpinner
        color="primary"
        style={{
          width: "4rem",
          height: "4rem",
        }}
      />
    );
  }

  return (
    <>
      <Alert
        content={apiCallStatusMessage}
        color={apiCallStatus}
        onShowChange={e => onChangeAlertShow(e)}
        show={apiCallStatus === '' ? false : 3} />
      <InsertFormModal
        title={selectedSubLocation.label + " için Numara ekle."}
        onModalToggle={onModalToggle}
        handleKeypress={handleKeypress}
        modalShow={modalShow}
      >
        <NumberInsertForm
          onSubmit={insertFormSubmit}
          inputChangeHandler={inputChangeHandler}
          values={insertInputValues} />
      </InsertFormModal>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h4>Numara Ayarları</h4>
            </CCardHeader>
            <CCardBody>
              <CTabs onActiveTabChange={() => onChangeSubLocationSelect({ value: 0, label: "Tümü", locationID: 0 })}>
                <CNav variant="tabs">
                  {
                    locations.map(location => {
                      if (location.isGeneral) {
                        return (
                          <CNavItem key={location.ID}>
                            <CNavLink data-tab={location.ID}>{location.name}</CNavLink>
                          </CNavItem>
                        )
                      }
                    })
                  }
                </CNav>
                <CTabContent>
                  {
                    locations.map(location => {
                      if (location.isGeneral) {
                        return (
                          <CTabPane key={location.ID} data-tab={location.ID}>
                            <CCard>
                              <CCardHeader>
                                <Select
                                  options={options.filter((row) => row.locationID == location.ID || row.locationID == 0)}
                                  placeholder="Seçiniz"
                                  onChange={onChangeSubLocationSelect}
                                  value={selectedSubLocation}
                                />
                              </CCardHeader>
                              <CCardBody>
                                <CCollapse show={collapse}>
                                  {<DataTable
                                    rows={selectedSubLocation.value == 0 ?
                                      numbers.filter((row) => row.locationID == location.ID)
                                      : numbers.filter((row) => row.subLocationID == selectedSubLocation.value)}
                                    columns={directoryColumns}
                                    isCellEditActive={true}
                                    asyncUpdateMethod={updateCell}
                                    isAddButtonActive={isAddButtonActive}
                                    addButtonText="Numara Ekle"
                                    onAddButtonClick={onModalToggle}
                                  />}
                                </CCollapse>
                              </CCardBody>
                            </CCard>
                          </CTabPane>
                        )
                      }
                    })
                  }
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    states: {
      locations: state.locations,
      subLocations: state.subLocations,
      numbers: state.numbers
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    methods: {
      onPageLoad: () => {
        dispatch(fetchLocationsAction());
        dispatch(fetchSubLocationsAction());
        dispatch(fetchNumbersAction());
      },
      onChangeInsertInput: (values) => {
        dispatch(changeInsertInput(values));
      },
      onInsertFormSubmit: (params) => {
        dispatch(insertAction(params));
      },
      onUpdateSubmit: (params) => {
        dispatch(updateAction(params));
      },
      onDeleteSubmit: (params) => {
        dispatch(deleteAction(params));
      },
      onChangeAlertShow: (alertTimeout) => {
        if (alertTimeout === 0) {
          dispatch(clearApiCallStatus());
        }
      },
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberSettings);
