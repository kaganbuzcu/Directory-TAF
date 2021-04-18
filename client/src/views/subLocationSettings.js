import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchLocationsAction
} from "../store/ducks/locations/actions";
import {
  fetchAction,
  changeInsertInput,
  insertAction,
  updateAction,
  deleteAction,
  clearApiCallStatus
} from "../store/ducks/subLocations/actions";
import Select from "react-select";
import { DataTable } from "../components/dataTable";
import { InsertFormModal } from "../components/insertFormModal";
import { SubLocationInsertForm } from "../components/subLocationInsertForm";
import { Alert } from "../components/alert";
import { IconButton } from "../components/iconButton";
import { freeSet } from "@coreui/icons";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCollapse,
  CSpinner
} from "@coreui/react";

const SubLocationSettings = (props) => {
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
    loading,
    insertInputValues,
    apiCallStatus,
    apiCallStatusMessage
  } = props.states.subLocations;

  const options = [{
    value: 0,
    label: "Tümü"
  }];

  if (locations.length !== 0) {
    locations.map((location, index) => {
      if (location.isGeneral) {
        options.push({
          value: location.ID,
          label: location.name
        });
      }
    })
  }

  const subLocationsColumns = [
    {
      dataField: "ID",
      text: "",
      hidden: true,
    },
    {
      dataField: "name",
      text: "KISIM/ŞUBE ADI",
      headerAttrs: { width: "45%" },
    },
    {
      dataField: "locationName",
      text: "BAĞLI BİRLİK",
      headerAttrs: { width: "45%" },
    },
    {
      dataField: "locationID",
      text: "",
      hidden: true
    },
    {
      dataField: "removeSubLocation",
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

  /** Location Select Methods */
  const [selectedOptionName, setselectedOptionName] = useState({});
  const [isAddButtonActive, setisAddButtonActive] = useState(false);
  const onChangeLocationSelect = (selected) => {
    console.log(selected);
    setselectedOptionName(selected);
    if (selected.value != "0")
      setisAddButtonActive(true);
    else
      setisAddButtonActive(false);
    onChangeInsertInput({ name: "locationID", value: selected.value });
    setCollapse(false);
    setTimeout(() => {
      setCollapse(true);
    }, 500);
  }

  /** Insert */
  const [modalShow, setModal] = useState(false);
  const onModalToggle = () => {
    setModal(!modalShow);
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
      name: newValue,
      id: row.ID
    }
    onUpdateSubmit(params);
  }

  /**Remove */
  const onRemoveButtonClick = (id) => {
    onDeleteSubmit(id);
  }

  return (
    <>
      <Alert
        content={apiCallStatusMessage}
        color={apiCallStatus}
        onShowChange={e => onChangeAlertShow(e)}
        show={apiCallStatus === '' ? false : 3} />
      <InsertFormModal
        title={selectedOptionName.label + " için Kısım/Şube ekle."}
        onModalToggle={onModalToggle}
        modalShow={modalShow}
      >
        <SubLocationInsertForm
          onSubmit={insertFormSubmit}
          inputChangeHandler={inputChangeHandler}
          values={insertInputValues} />
      </InsertFormModal>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h4>Kısım/Şube Ayarları</h4>
            </CCardHeader>
            <CCardBody>
              <CCard>
                <CCardHeader>
                  <h6>
                    Bu sayfada seçeceğiniz Birlik için Kısım/Şube tanımlayabilir,
                    güncelleyebilir veya silebilirsiniz.
                  </h6>
                  <Select
                    options={options}
                    placeholder="Seçiniz"
                    onChange={onChangeLocationSelect}
                  />
                </CCardHeader>
                <CCardBody>
                  <CCollapse show={collapse}>
                    {loading ? (
                      <CSpinner
                        color="primary"
                        style={{
                          width: "4rem",
                          height: "4rem",
                        }}
                      />
                    ) : (
                      <DataTable
                        rows={subLocations.filter((row) => row.locationID == selectedOptionName.value || selectedOptionName.value == 0)}
                        columns={subLocationsColumns}
                        isCellEditActive={true}
                        asyncUpdateMethod={updateCell}
                        isAddButtonActive={isAddButtonActive}
                        addButtonText="Kısım/Şube Ekle"
                        onAddButtonClick={onModalToggle}
                      />
                    )}
                  </CCollapse>
                </CCardBody>
              </CCard>
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
      subLocations: state.subLocations
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    methods: {
      onPageLoad: () => {
        dispatch(fetchLocationsAction());
        dispatch(fetchAction());
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

export default connect(mapStateToProps, mapDispatchToProps)(SubLocationSettings);
