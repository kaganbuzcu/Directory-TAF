import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const HeaderSettings = () => {
  const [value, setValue] = useState('');
console.log(value);
  return (
    <div>
      Başlık Ayarları
      <ReactQuill theme="snow" value={value} onChange={setValue}/>
    </div>
  )
}

export default HeaderSettings
