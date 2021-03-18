import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

const TheHeaderDropdownNotes = () => {
  const itemsCount = 4;
  return (
    <CDropdown inNav className="c-header-nav-item mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon content={freeSet.cilNotes} style={{ width: 20, height: 20 }} />
        <CBadge shape="pill" color="danger">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light">
          <strong>{itemsCount} adet aktif not var.</strong>
        </CDropdownItem>
        <CDropdownItem href="#">
          <div className="message">
            <div className="note-header">
              <span className="text-muted">Jane Dovve</span>
              <small className="text-muted float-right mt-1">
                5 minutes ago
              </small>
            </div>
            <p className="small">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do...
            </p>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="note-header">
              <span className="text-muted">Jane Dovve</span>
              <small className="text-muted float-right mt-1">
                5 minutes ago
              </small>
            </div>
            <p className="small">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do...
            </p>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="note-header">
              <span className="text-muted">Jane Dovve</span>
              <small className="text-muted float-right mt-1">
                5 minutes ago
              </small>
            </div>
            <p className="small">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do...
            </p>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="note-header">
              <span className="text-muted">Jane Dovve</span>
              <small className="text-muted float-right mt-1">
                5 minutes ago
              </small>
            </div>
            <p className="small">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              do...
            </p>
          </div>
        </CDropdownItem>
        <CDropdownItem href="#" className="text-center border-top">
          <CIcon
            content={freeSet.cilNoteAdd}
            customClasses="c-sidebar-nav-icon"
          />
          <strong>Yeni Not Oluştur</strong>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotes;
