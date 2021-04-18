import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchLocationsAction,
  onChangeLocationInsertInput,
  locationInsertAction,
  locationUpdateAction,
  locationDeleteAction,
  clearApiCallStatus
} from "../store/ducks/locations/actions";
import { DataTable } from "../components/dataTable";
import { FileUpload } from "../components/fileUpload";
import { InsertFormModal } from "../components/insertFormModal";
import { LocationInsertForm } from "../components/locationInsertForm";
import { Alert } from "../components/alert";
import { IconButton } from "../components/iconButton";
import { freeSet } from "@coreui/icons";

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
  CSpinner
} from "@coreui/react";

const LocationSettings = (props) => {
  const {
    locations,
    loading,
    locationInsertInputValues,
    apiCallStatus,
    apiCallStatusMessage
  } = props.states;
  const {
    onPageLoad,
    onChangeLocationInsertInput,
    onLocationInsertFormSubmit,
    onLocationUpdateSubmit,
    onLocationDeleteSubmit,
    onChangeAlertShow
  } = props.methods;

  /**Get */
  useEffect(() => {
    onPageLoad();
  }, []);

  /**File upload */
  const [fileData, setFileData] = useState(null);
  const onFileUploaded = (data) => {
    setFileData(data);
  };

  /** Insert */
  const [modalShow, setModal] = useState(false);
  const onModalToggle = () => {
    setModal(!modalShow);
  };

  const inputChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    onChangeLocationInsertInput({ name, value });
  }

  const locationInsertFormSubmit = () => {
    onLocationInsertFormSubmit(locationInsertInputValues);
  }

  useEffect(() => {
    if (apiCallStatus === 'success') {
      setModal(false);
    }
  }, [apiCallStatus]);

  /**Update */
  const locationUpdateCell = (oldValue, newValue, row, column) => {
    let params = {
      column: column.dataField,
      data: newValue,
      id: row.ID
    }
    onLocationUpdateSubmit(params);
  }

  /**Remove */
  const onRemoveButtonClick = (id) => {
    onLocationDeleteSubmit(id);
  }

  const locationsColumns = [
    {
      dataField: "ID",
      text: "",
      hidden: true,
    },
    {
      dataField: "name",
      text: "BİRLİK/KURUM ADI",
      headerAttrs: { width: "40%" },
    },
    {
      dataField: "tafics",
      text: "ERİŞİM NO",
    },
    {
      dataField: "operatorAccessNumber",
      text: "OPERATÖR ERİŞİM NO",
    },
    {
      dataField: "externalNumber",
      text: "HARİCİ NO",
    },
    {
      dataField: "isGeneral",
      text: "ALT BİRLİK",
      editable: false,
      formatter: (cell, row, rowIndex, colIndex) => (row.isGeneral ? 'Var' : 'Yok'),
      style: (cell, row, rowIndex, colIndex) => {
        if (row.isGeneral) {
          return {
            color: 'blue',
          };
        }
      }
    },
    {
      dataField: "removeLocation",
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

  return (
    <>
      <Alert
        content={apiCallStatusMessage}
        color={apiCallStatus}
        onShowChange={e => onChangeAlertShow(e)}
        show={apiCallStatus === '' ? false : 3} />
      <InsertFormModal
        title="Birlik Ekle"
        onModalToggle={onModalToggle}
        modalShow={modalShow}
      >
        <LocationInsertForm
          onSubmit={locationInsertFormSubmit}
          inputChangeHandler={inputChangeHandler}
          values={locationInsertInputValues} />
      </InsertFormModal>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h4>Birlik Ayarları</h4>
            </CCardHeader>
            <CCardBody>
              <CTabs activeTab="manuel">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="manuel">El ile düzenle</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="auto">Dosya içe aktar(beta)</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane data-tab="manuel">
                    <CCard>
                      <CCardHeader>
                        <h6>
                          Bu sayfada Birlik/Kurum tanımlayabilir,
                          güncelleyebilir veya silebilirsiniz.
                        </h6>
                      </CCardHeader>
                      <CCardBody>
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
                            rows={locations}
                            columns={locationsColumns}
                            isCellEditActive={true}
                            asyncUpdateMethod={locationUpdateCell}
                            isAddButtonActive={true}
                            addButtonText="Birlik Ekle"
                            onAddButtonClick={onModalToggle}
                          />
                        )}
                      </CCardBody>
                    </CCard>
                  </CTabPane>
                  <CTabPane data-tab="auto">
                    <CCard>
                      <CCardHeader>
                        <h6>
                          Bu sayfada .xlsx uzantılı Birlik/Kurum içeren
                          dosyanızı içe aktarabilirsiniz.
                        </h6>
                        <p>
                          İlgili dosyanın içeriği tablo yapısıyla uyuşmalıdır.
                        </p>
                      </CCardHeader>
                      <CCardBody>
                        <FileUpload onFileUploaded={onFileUploaded} />
                        {fileData !== null ? (
                          <div style={{ marginTop: 20 }}>
                            <p>
                              Dosyanızın içerisindeki verileri, aşağıdaki
                              tablodan kontrol edebilir, düzenleyebilir ve
                              kaydedebilirsiniz.
                            </p>
                            <DataTable
                              rows={fileData}
                              columns={locationsColumns}
                              isCellEditActive={true}
                            />
                          </div>
                        ) : null}
                      </CCardBody>
                    </CCard>
                  </CTabPane>
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
    states: { ...state.locations }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    methods: {
      onPageLoad: () => {
        dispatch(fetchLocationsAction());
      },
      onChangeLocationInsertInput: (values) => {
        dispatch(onChangeLocationInsertInput(values));
      },
      onLocationInsertFormSubmit: (params) => {
        dispatch(locationInsertAction(params));
      },
      onLocationUpdateSubmit: (params) => {
        dispatch(locationUpdateAction(params));
      },
      onLocationDeleteSubmit: (params) => {
        dispatch(locationDeleteAction(params));
      },
      onChangeAlertShow: (alertTimeout) => {
        if (alertTimeout === 0) {
          dispatch(clearApiCallStatus());
        }
      },
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSettings);
