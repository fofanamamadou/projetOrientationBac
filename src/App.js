// src/App.js
import 'antd/dist/reset.css';

import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import StudentForm from './pages/StudentForm';
import OrientationVideo from './pages/OrientationVideo';
import Careers from './pages/Careers';
import Feedback from './pages/Feedback';
import AdminHome from './adminPages/AdminHome';
import VideoManager from './adminPages/Video';
import CareerManager from './adminPages/Careers';
import FeedbackManager from './adminPages/Feedback';


export default function App() {

      return (
        <>
            <div>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/formulaire" element={<StudentForm />} />
                <Route path="/orientation-video" element={<OrientationVideo />} />
                <Route path="/carrieres" element={<Careers />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/videos" element={<VideoManager />} />
                <Route path="/admin/careers" element={<CareerManager />} />
                <Route path="/admin/feedbacks" element={<FeedbackManager />} />
              </Routes>
            </div>
        </>
      );
      
}