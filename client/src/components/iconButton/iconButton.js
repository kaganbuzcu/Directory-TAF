import React from "react";
import "./iconButton.scss";
import {
  CButton
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

/**
 * @callThis <IconButton
            color="danger"
            onClick={onRemoveButtonClick}
            icon={freeSet.cilTrash}
          />
 * @param {*} props { id, color, onClick, icon }
 * @returns Icon Button Component
 */

const IconButton = (props) => {
  const { color, onClick, icon } = props;
  return (
    <CButton
      color={color}
      className="icon-button"
      onClick={onClick}
    >
      <CIcon content={icon} style={{ width: 20, height: 20 }} />
    </CButton>
  )
}

export default IconButton;
