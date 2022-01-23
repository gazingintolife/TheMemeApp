import React from 'react';

export default function ProfileSidebar() {
  return(
    <div className='h-full grid grid-rows-10 justify-items-center'>
    <div className='row-span-4'>
        Profile Pic
    </div>
    <div className='row-start-5'>
        Messages
    </div>
    <div className='row-start-6'>
        Notifications
    </div>
    <div className='row-start-7'>
        Saved Memes
    </div>
    <div className='row-start-8'>
        Settings
    </div>
    <div className='row-span-2'>
        Log Out
    </div>
    </div>
  );
}
