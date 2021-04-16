import React from 'react';

const Directory = React.lazy(() => import('./views/directory'));
const LocationSettings = React.lazy(() => import('./views/locationSettings'));
const SubLocationSettings = React.lazy(() => import('./views/subLocationSettings'));
const NumberSettings = React.lazy(() => import('./views/numberSettings'));
const HeaderSettings = React.lazy(() => import('./views/headerSettings'));

const routes = [
  { path: '/', exact: true, name: 'Santral' },
  { path: '/rehber', name: 'Rehber', component: Directory },
  { path: '/ayarlar/birim', name: 'Birim Ayarları', component: LocationSettings },
  { path: '/ayarlar/alt-birim', name: 'Alt Birim Ayarları', component: SubLocationSettings },
  { path: '/ayarlar/numara', name: 'Numara Ayarları', component: NumberSettings },
  { path: '/ayarlar/baslik', name: 'Başlık ve Açıklama Ayarları', component: HeaderSettings },
];

export default routes;
