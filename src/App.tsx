import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './Views/LoginPage/LoginPage';
//import {ReimbursementPage}
//import {ProfilePage}
//import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />}/>
        
      </Routes>
    </HashRouter>
  );
}

export default App;
