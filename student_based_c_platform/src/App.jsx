import React from 'react';
import AuthPage from './pages/AuthPage';
import EmployeeManagement from './components/EmployeeManagement';
import  AuthContent from './components/auth/AuthContent';
import './index.css'; // Your Tailwind CSS imports

function App() {
  return (
    <div className="App">
       <AuthContent/>
    </div>
  );
}
export default App;