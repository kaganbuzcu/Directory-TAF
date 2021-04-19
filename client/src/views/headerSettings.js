import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { connect } from "react-redux";
import {
  fetchAction,
  changeHeaderText,
  insertAction,
  clearApiCallStatus
} from "../store/ducks/customize/actions";
import 'react-quill/dist/quill.snow.css';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
import { Alert } from "../components/alert";

const HeaderSettings = (props) => {
  const {
    onPageLoad,
    onChangeHeaderText,
    onHeaderSubmit,
    onChangeAlertShow,
  } = props.methods;

  const {
    headerText,
    apiCallStatus,
    apiCallStatusMessage
  } = props.states;

  /**get */
  useEffect(() => {
    onPageLoad();
  }, []);

  /**set */
  const onButtonClick = () => {
    onHeaderSubmit(headerText);
  }

  return (
    <>
      <Alert
        content={apiCallStatusMessage}
        color={apiCallStatus}
        onShowChange={e => onChangeAlertShow(e)}
        show={apiCallStatus === '' ? false : 3} />
      <CRow className="header-settings">
        <CCol>
          <CCard>
            <CCardHeader>
              <h6>
                Başlık Ayarları
            </h6>
            </CCardHeader>
            <CCardBody>
              <ReactQuill theme="snow" className="text-editor" value={headerText} onChange={onChangeHeaderText} />
              <div className="button-wrapper">
                <CButton
                  color="success"
                  className="m-2"
                  onClick={onButtonClick}
                >
                  <CIcon content={freeSet.cilCheck} className="button-icon" />
                  <span>Kaydet</span>
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    states: { ...state.customize }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    methods: {
      onPageLoad: () => {
        dispatch(fetchAction());
      },
      onChangeHeaderText: (header) => {
        dispatch(changeHeaderText(header));
      },
      onHeaderSubmit: (params) => {
        dispatch(insertAction(params));
      },
      onChangeAlertShow: (alertTimeout) => {
        if (alertTimeout === 0) {
          dispatch(clearApiCallStatus());
        }
      },
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSettings);
