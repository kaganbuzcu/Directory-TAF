import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { DataTable } from "../components/dataTable";
import { FileUpload } from "../components/fileUpload";

const NumberSettings = () => {
  const [fileData, setFileData] = useState(null);

  const columns = [
    {
      dataField: "ID",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "name",
      text: "BİRLİK/KURUM ADI",
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
      dataField: "gsm",
      text: "HARİCİ TEL.",
    },
  ];

  const onFileUploaded = (data) => {
    setFileData(data);
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Excel Üzerinden Kaydetme(BETA)</CCardHeader>
          <CCardBody>
            <FileUpload onFileUploaded={onFileUploaded} />
            {fileData !== null ? (
              <div style={{ marginTop: 20 }}>
                <p>
                  Dosyanızın içerisindeki verileri, aşağıdaki tablodan kontrol
                  edebilir, düzenleyebilir ve kaydedebilirsiniz.
                </p>
                <DataTable
                  rows={fileData}
                  columns={columns}
                  isCellEditActive={true}
                />
              </div>
            ) : null}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default NumberSettings;
