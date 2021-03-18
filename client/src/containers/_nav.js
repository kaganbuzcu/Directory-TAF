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
        name: 'Birim',
        to: '/ayarlar/birim',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Alt Birim',
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
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Kullanıcı Ayarları',
    to: '/ayarlar/kullanici',
    icon: <CIcon content={freeSet.cilUser} customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Login',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500',
      },
    ],
  }
]

