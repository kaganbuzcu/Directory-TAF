import React from "react";
import "./locationInsertForm.scss";
import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
  CInputCheckbox,
  CFormText
} from "@coreui/react";

/**
 * @callThis <LocationInsertForm
          onSubmit={locationInsertFormSubmit}
          inputChangeHandler={inputChangeHandler}
          values={locationInsertInputValues} />
 * @param {*} props { inputChangeHandler, onSubmit, values }
 * @returns Component
 */

const LocationInsertForm = (props) => {

  const { inputChangeHandler, onSubmit, values } = props;

  return (
    <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CForm>
            <CFormGroup>
              <CLabel htmlFor="name">Birlik/Kurum Adı</CLabel>
              <CInput
                type="text"
                name="name"
                placeholder="Birlik adı giriniz..."
                onChange={inputChangeHandler}
                value={values.name}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="tafics">Erişim No</CLabel>
              <CInput
                type="text"
                name="tafics"
                placeholder="Tafics numarasını giriniz."
                onChange={inputChangeHandler}
                value={values.tafics}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="operatorAccessNumber">Operatör Erişim No</CLabel>
              <CInput
                type="text"
                name="operatorAccessNumber"
                placeholder="Dahili numarayı giriniz."
                onChange={inputChangeHandler}
                value={values.operatorAccessNumber}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="externalNumber">Harici Numara</CLabel>
              <CInput
                type="text"
                name="externalNumber"
                placeholder="Harici numarayı giriniz."
                onChange={inputChangeHandler}
                value={values.externalNumber}
              />
            </CFormGroup>
            <CFormGroup className="checkbox-group">
              <CLabel htmlFor="isGeneral">Alt birlikler ve numaralar tanımlamak <span>istiyorum.</span></CLabel>
              <CInputCheckbox
                className="checkbox-group-input"
                name="isGeneral"
                label="Birlik genel tafics içerisinde mi yer alacak?"
                onClick={inputChangeHandler}
                value={values.isGeneral}
              />
              <CFormText className="help-block">"Birlik genel tafics içerisinde yer almayacaksa, alt birlikler ve numara tanımlamaları yapılacaksa seçilmelidir."</CFormText>
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

export default LocationInsertForm;
