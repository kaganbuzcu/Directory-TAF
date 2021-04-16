import React from "react";
import { CCol, CRow } from "@coreui/react";
import { useDropzone } from "react-dropzone";
import readXlsxFile from "read-excel-file";
import "./fileUpload.scss";

const FileUpload = (props) => {
  const { onFileUploaded } = props;

  const schema = {
    "BİRLİK/KURUM ADI": {
      prop: "name",
      required: true,
    },
    "ERİŞİM NO": {
      prop: "tafics",
      required: true,
    },
    "OPERATÖR ERİŞİM NO": {
      prop: "operatorAccessNumber",
      required: true,
    },
    "HARİCİ TEL.": {
      prop: "gsm",
      required: true,
    },
  };

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: ".xlsx",
    onDropAccepted: (files) => {
      readXlsxFile(files[0], { schema }).then((rows) => {
        let data = [];
        rows.rows.forEach((row, key) => {
          if (row.tafics !== undefined && row.name !== undefined) {
            console.log(row.name.toString());
            row.name = row.name.toString().toLocaleLowerCase("tr-TR");
            row.ID = key;
            data.push(row);
          }
        });
        onFileUploaded(data);
      });
    },
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <CRow>
      <CCol>
        <section className="container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Dosyanızı bu alana sürükleyip bırakın veya tıklayarak seçin.</p>
            <em>(Sadece .xlsx dosya uzantısı kabul edilir.)</em>
          </div>
          <aside>
            <ul>{acceptedFileItems}</ul>
            <ul>{fileRejectionItems}</ul>
          </aside>
        </section>
      </CCol>
    </CRow>
  );
};

export default FileUpload;
