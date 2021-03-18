import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdown = () => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/soldier.png'}
            className="c-avatar-img"
            alt="soldier"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-start">
        <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Çıkış Yap
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
