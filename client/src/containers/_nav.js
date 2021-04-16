import React from 'react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Rehber',
    to: '/rehber',
    icon: <CIcon content={freeSet.cilAddressBook} customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Ayarlar']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Rehber Ayarları',
    icon: <CIcon content={freeSet.cilSettings} customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Birlik',
        to: '/ayarlar/birim',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Kısım/Şube',
        to: '/ayarlar/alt-birim',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Numara',
        to: '/ayarlar/numara',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Başlık ve Açıklama',
        to: '/ayarlar/baslik',
      },
    ],
  }
]

