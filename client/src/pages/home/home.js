import React from 'react';
import Layout from '../../components/layout/layout';
import Notification from '../../components/notification/notification';
import Settings from '../../components/settings/settings';
import Timeline from '../../components/timeline/timeline';
import SavedMeme from '../../components/savedMeme/savedMeme';
import Profile from '../../components/profile/profile';

const Home = () => {

  const state = "Settings";

  return (
      <div>
        {
          state === "Timeline" && <Layout content = {<Timeline/>}/>
        }
        {
          state === "Notification" && <Layout content = {<Notification/>}/>
        }
        {
          state === "SavedMeme" && <Layout content = {<SavedMeme/>}/>
        }
        {
          state === "Settings" && <Layout content = {<Settings/>}/>
        }
        {
          state === "Profile" && <Layout content = {<Profile/>}/>
        }
        {
          state === "Messages" && <Layout content = {<Settings/>}/>
        }
      </div>
      );
};

export default Home;
