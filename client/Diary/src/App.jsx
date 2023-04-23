// import './App.css'
import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import TextEditorField from './components/TextEditorField';
import SideNavBar from './components/SideNavBar';
import Paper from './components/Paper';
import PageLayout from './pages/PageLayout';
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  return (
    <div className="App">
      <Login />
      {/* <Paper /> */}
      {/* <PageLayout /> */}
    </div>
  )
}

export default App
