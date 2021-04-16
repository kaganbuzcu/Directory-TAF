import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchLocationsAction,
} from "../store/ducks/locations/actions";
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
} from "@coreui/react";
import Select from "react-select";
import { DataTable } from "../components/dataTable";

const Directory = (props) => {
  const [collapse, setCollapse] = useState(false);

  const directoryData = [
    {
      id: 0,
      makam: "ordu komutanı",
      rutbe: "ORGENERAL",
      isim: "Metin GÜRAK",
      dahili: "2000",
      milsec: "5001",
      cep: "",
    },
    {
      id: 1,
      makam: "ordu komutanı emir asb.",
      rutbe: "",
      isim: "",
      dahili: "2013",
      milsec: "",
      cep: "",
    },
    {
      id: 2,
      makam: "tümen komutanı",
      rutbe: "Tümgeneral",
      isim: "Levent ERGÜN",
      dahili: "2001",
      milsec: "5002",
      cep: "",
    },
    {
      id: 3,
      makam: "tümen komutanı emir asb.",
      rutbe: "",
      isim: "",
      dahili: "2013",
      milsec: "",
      cep: "",
    },
    {
      id: 4,
      makam: "tümen komutanı icra sb.",
      rutbe: "Tank Albay",
      isim: "Yasin",
      dahili: "2003",
      milsec: "",
      cep: "",
    },
    {
      id: 5,
      makam: "tümen k.yrd.",
      rutbe: "",
      isim: "Mehmet AÇIK",
      dahili: "4000",
      milsec: "5003",
      cep: "",
    },
    {
      id: 6,
      makam: "tümen k.yrd emir asb.",
      rutbe: "",
      isim: "",
      dahili: "4002",
      milsec: "",
      cep: "",
    },
    {
      id: 7,
      makam: "kurmay başkanı",
      rutbe: "Tank Albay",
      isim: "NAİL TÜRE",
      dahili: "2019",
      milsec: "",
      cep: "",
    },
    {
      id: 8,
      makam: "personel şube müdürü",
      rutbe: "Per.Yzb.",
      isim: "Murat SAY",
      dahili: "2101",
      milsec: "",
      cep: "0542 420 90 25",
    },
    {
      id: 9,
      makam: "per.işl.asb.",
      rutbe: "Per.Asb.Üçvş.",
      isim: "Haluk KARALAR",
      dahili: "2102",
      milsec: "",
      cep: "",
    },
    {
      id: 10,
      makam: "istihbarat şube müdürü",
      rutbe: "P.Yb.",
      isim: "Orhan Veli SAYKI",
      dahili: "2201",
      milsec: "",
      cep: "0552 585 12 40",
    },
    {
      id: 11,
      makam: "isth.ş.asb.",
      rutbe: "isth.asb.kd.çvş.",
      isim: "Ömer GÖZEL",
      dahili: "2202",
      milsec: "",
      cep: "0538 625 56 32",
    },
  ];

  const directoryColumns = [
    {
      dataField: "ID",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "makam",
      text: "MAKAM",
    },
    {
      dataField: "rutbe",
      text: "RÜTBE",
    },
    {
      dataField: "isim",
      text: "ADI SOYADI",
    },
    {
      dataField: "dahili",
      text: "DAHİLİ",
    },
    {
      dataField: "milsec",
      text: "MİLSEC",
    },
    {
      dataField: "cep",
      text: "CEP TELEFONU",
    },
  ];

  const options = [
    { value: "0", label: "6'NCI MKNZ.P.TÜM.K.LIĞI EKY/ÇILDIROBA" },
    { value: "1", label: "KOMUTAN YARDIMCILIĞI" },
    { value: "2", label: "PERSONEL ŞUBE MÜDÜRLÜĞÜ" },
  ];

  const {
    onPageLoad,
  } = props.methods;

  const {
    locations,
  } = props.states;

  const locationsColumns = [
    {
      dataField: "ID",
      text: "ID",
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
  ];

  /**Get */
  useEffect(() => {
    onPageLoad();
  }, []);

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
              <CTabs activeTab="directory">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="directory">Rehber</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="generalTafics">Genel Tafics</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane data-tab="directory">
                    <CCard>
                      <CCardHeader>
                        <Select
                          options={options}
                          placeholder="Seçiniz"
                          onChange={() => {
                            setCollapse(false);
                            setTimeout(() => {
                              setCollapse(true);
                            }, 500);
                          }}
                        />
                      </CCardHeader>
                      <CCardBody>
                        <CCollapse show={collapse}>
                          <DataTable
                            rows={directoryData}
                            columns={directoryColumns}
                          />
                        </CCollapse>
                      </CCardBody>
                    </CCard>
                  </CTabPane>
                  <CTabPane data-tab="generalTafics">
                    <CCard>
                      <CCardBody>
                        <DataTable
                          rows={locations}
                          columns={locationsColumns}
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
    states: { ...state.locations }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    methods: {
      onPageLoad: () => {
        dispatch(fetchLocationsAction());
      },
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
