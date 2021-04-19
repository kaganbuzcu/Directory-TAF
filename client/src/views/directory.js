import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchAction as fetchLocationsAction
} from "../store/ducks/locations/actions";
import {
  fetchAction as fetchSubLocationsAction
} from "../store/ducks/subLocations/actions";
import {
  fetchAction as fetchNumbersAction
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

const Directory = (props) => {
  const [collapse, setCollapse] = useState(false);

  const {
    onPageLoad
  } = props.methods;

  const {
    locations,
    loading
  } = props.states.locations;

  const {
    subLocations,
  } = props.states.subLocations;

  const {
    numbers,
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
    }
  ];

  const generalTaficsColumns = [
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
    }
  ];

  /**Get */
  useEffect(() => {
    onPageLoad();
  }, []);

  /** Sub Location Select */
  const [selectedSubLocation, setSelectedSubLocation] = useState({});
  const onChangeSubLocationSelect = (selected) => {
    setSelectedSubLocation(selected);
    setCollapse(false);
    setTimeout(() => {
      setCollapse(true);
    }, 200);
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
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h5>
                6'INCI MKNZ.P.TÜM.K.LIĞI (EKY) ÇILDIROBA ÜS BÖLGE KOMUTANLIĞI
                TELEFON REHBERİ
              </h5>
              <br />
              <p>
                SANTRAL TAFICS İRTİBAT NUMARASI: <strong>9 223 1118</strong>
              </p>
              <p>
                SANTRAL HARİCİ İRTİBAT NUMARASI: <strong>0348 792 20 74</strong>{" "}
                / <strong>0348 792 20 38</strong> ( EMNİYETSİZ FAKS NUMARASI:{" "}
                <strong>0348 792 20 36</strong>)
              </p>
            </CCardHeader>
            <CCardBody>
              <CTabs 
              onActiveTabChange={() => onChangeSubLocationSelect({ value: 0, label: "Tümü", locationID: 0 })}>
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
                  <CNavItem key="generalTafics">
                    <CNavLink data-tab="generalTafics">Genel Tafics</CNavLink>
                  </CNavItem>
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
                                    isCellEditActive={false}
                                    isAddButtonActive={false}
                                  />}
                                </CCollapse>
                              </CCardBody>
                            </CCard>
                          </CTabPane>
                        )
                      }
                    })
                  }
                  <CTabPane data-tab="generalTafics">
                    <CCard>
                      <CCardBody>
                        <DataTable
                          rows={locations.filter((row) => row.isGeneral == false)}
                          columns={generalTaficsColumns}
                        />
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
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
