import React from 'react';
import './App.css';

import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HomeApp from './components/HomeApp'
import System_auth from './components/system_auth'
import System_schema from './components/system_schema'
import System_distributed from './components/system_distributed'
import System from './components/system'
import Testkeyspace from './components/testkeyspace'
import Mykey from './components/mykey'
import System_traces from './components/system_traces'
import Keyspaces from './components/Keyspaces'
import Tables from './components/tables'
import Sidebar from './components/sidebar'

function App() {
  return (
    <div className='App'>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeApp />} />
          <Route exact path="/home" element={<HomeApp />} />
          <Route exact path="/keyspaces" element={<Keyspaces />} />
          <Route exact path="/system_auth" element={<System_auth />} />
          <Route exact path="/system_schema" element={<System_schema />} />
          <Route exact path="/system_distributed" element={<System_distributed />} />
          <Route exact path="/system" element={<System />} />
          <Route exact path="/testkeyspace" element={<Testkeyspace />} />
          <Route exact path="/mykey" element={<Mykey />} />
          <Route exact path="/tables" element={<Tables />} />
          <Route exact path="/system_traces" element={<System_traces />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;