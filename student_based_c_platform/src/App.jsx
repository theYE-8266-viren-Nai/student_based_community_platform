import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import EmployeeManagement from './components/EmployeeManagement';
import AuthContent from './components/auth/AuthContent';
import SecondMessages from './components/test/secondMessages'
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Simple Navigation */}
        <nav className="p-4 mb-4 bg-gray-100">
          <div className="flex space-x-4">
            <Link to="/auth-page" className="text-blue-600 hover:text-blue-800">
              Auth Page
            </Link>
            <Link to="/employee-management" className="text-blue-600 hover:text-blue-800">
              Employee Management
            </Link>
            <Link to="/auth-content" className="text-blue-600 hover:text-blue-800">
              Auth Content
            </Link>
            <Link to="/messages" className="text-blue-600 hover:text-blue-800">
              Messages
            </Link>
            <Link to="/second-messages" className="text-blue-600 hover:text-blue-800">
              Second Messages
            </Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/auth-page" element={<AuthPage />} />
          <Route path="/employee-management" element={<EmployeeManagement />} />
          <Route path="/auth-content" element={<AuthContent title="Auth Content" />} />
          <Route path="/messages" element={<AuthContent endpoint="/messages" title="Messages" />} />
          <Route path="/second-messages" element={<SecondMessages />} />
          <Route path="/" element={<AuthContent />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;