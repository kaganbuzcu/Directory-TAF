import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchLocationsAction } from "../store/ducks/locations/actions";
import { DataTable } from "../components/dataTable";
import { FileUpload } from "../components/fileUpload";
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
  CSpinner,
} from "@coreui/react";

const LocationSettings = ({ locations, loading, onPageLoad }) => {
  useEffect(() => {
    onPageLoad();
  }, []);

  const [fileData, setFileData] = useState(null);

  const onFileUploaded = (data) => {
    setFileData(data);
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h4>Birim Ayarları</h4>
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
    dataField: "centralCallName",
    text: "SANTRAL ÇAĞRI ADI",
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

const mapStateToProps = (state) => {
  const locationsState = state.locations;
  return {
    ...locationsState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoad: () => {
      dispatch(fetchLocationsAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSettings);
