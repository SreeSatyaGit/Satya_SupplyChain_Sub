import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import CompanyList from './CompanyList';
import CompanyDetails from './CompanyDetails';


function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/companydetails/:id" element={<CompanyDetails />} />
            <Route path="/" element={<CompanyList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
