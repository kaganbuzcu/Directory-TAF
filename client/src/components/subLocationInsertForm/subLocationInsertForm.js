import React from "react";
import "./subLocationInsertForm.scss";
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
 * @callThis <SubLocationInsertForm
          onSubmit={insertFormSubmit}
          inputChangeHandler={inputChangeHandler}
          values={insertInputValues} />
 * @param {*} props { inputChangeHandler, onSubmit, values }
 * @returns Component
 */

const SubLocationInsertForm = (props) => {

  const { inputChangeHandler, onSubmit, values } = props;

  return (
    <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CForm>
            <CFormGroup>
              <CLabel htmlFor="name">Kısım/Şube Adı</CLabel>
              <CInput
                type="text"
                name="name"
                placeholder="Kısım/Şube adı giriniz..."
                onChange={inputChangeHandler}
                value={values.name}
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

export default SubLocationInsertForm;
