import React from "react";
import "./insertFormModal.scss";
import {
  CModal,
  CModalHeader,
  CModalBody
} from "@coreui/react";

/**
 * @callThis <InsertFormModal
        title="Birlik Ekle"
        onModalToggle={onModalToggle}
        modalShow={modalShow}
      >
        <LocationInsertForm onSubmit={locationInsertFormSubmit} inputChangeHandler={inputChangeHandler} />
      </InsertFormModal>
 * @param {*} props {children, title, onModalToggle, modalShow}
 * @returns CModal Component
 */

const InsertFormModal = (props) => {

  const { children, title, onModalToggle, modalShow } = props;

  return (<CModal
    show={modalShow}
    onClose={onModalToggle}
    size="lg"
  >
    <CModalHeader closeButton>{title}</CModalHeader>
    <CModalBody>
      {children}
    </CModalBody>
  </CModal>)
}

export default InsertFormModal;
