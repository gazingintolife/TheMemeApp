import React from 'react';
import Sidebar from '../sidebar/sidebar';
import Topbar from '../topbar/topbar';

export default function Layout(props) {
  return(
    <div className='h-screen grid grid-cols-12'>
    <div className='col-span-9'>
      <Topbar/>
      <main>{props.content}</main>
    </div>
    <div className='col-span-3'>
        <Sidebar/>
    </div>
  </div>
  );
}
