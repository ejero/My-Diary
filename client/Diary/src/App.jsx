// import './App.css'
import Login from './pages/Login';
import TextEditorField from './components/TextEditorField';
import SideNavBar from './components/SideNavBar';
import Paper from './components/Paper';
import PageLayout from './pages/PageLayout';
function App() {
  return (
    <div className="App">
      <div className="appcontainer">
        <div className="leftColumn">
          {/* <SideNavBar /> */}
        </div>
        <div className="rightColumn">
          {/* <TextEditorField /> */}
        </div>
      </div>
      {/* <Login /> */}
      {/* <Paper /> */}
      <PageLayout />
    </div>
  )
}

export default App
