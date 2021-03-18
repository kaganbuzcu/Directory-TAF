import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://www.tsk.tr/" target="_blank" rel="noopener noreferrer">TSK</a>
        <span className="ml-1">&copy; 2020 MEBS.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="#" target="_blank" rel="noopener noreferrer">6'INCI MKNZ.P.TÜM.K.LIĞI (EKY) ÇILDIROBA ÜS BÖLGE KOMUTANLIĞI</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
