import React from "react";
import "./numberInsertForm.scss";
import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CButton
} from "@coreui/react";

/**
 * @callThis <NumberInsertForm
          onSubmit={insertFormSubmit}
          inputChangeHandler={inputChangeHandler}
          values={insertInputValues} />
 * @param {*} props { inputChangeHandler, onSubmit, values }
 * @returns Component
 */

const NumberInsertForm = (props) => {

  const { inputChangeHandler, onSubmit, values } = props;

  return (
    <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CForm>
            <CFormGroup>
              <CLabel htmlFor="rank">Makam<span style={{color:'red'}}>*</span></CLabel>
              <CInput
                type="text"
                name="duty"
                placeholder="Makam adı giriniz..."
                onChange={inputChangeHandler}
                value={values.duty}
                required
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="tafics">Dahili Numara<span style={{color:'red'}}>*</span></CLabel>
              <CInput
                type="text"
                name="internalNumber"
                placeholder="Dahili numarayı giriniz."
                onChange={inputChangeHandler}
                value={values.internalNumber}
                required
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="operatorAccessNumber">Ad Soyad</CLabel>
              <CInput
                type="text"
                name="nameSurname"
                placeholder="Ad Soyad giriniz."
                onChange={inputChangeHandler}
                value={values.nameSurname}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="externalNumber">Rütbe</CLabel>
              <CInput
                type="text"
                name="rank"
                placeholder="Rütbe giriniz."
                onChange={inputChangeHandler}
                value={values.rank}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="externalNumber">Gsm Numarası</CLabel>
              <CInput
                type="text"
                name="gsm"
                placeholder="Cep numarası giriniz."
                onChange={inputChangeHandler}
                value={values.gsm}
              />
            </CFormGroup>
            <CFormGroup style={{ display: "flex" }}>
              <CButton
                color="success"
                style={{ marginLeft: "auto" }}
                onClick={onSubmit} >Kaydet</CButton>
            </CFormGroup>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default NumberInsertForm;
