import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState,useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('currentPage') || 'login';
  });

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login navigate={setCurrentPage} />;
      case 'home':
        return <Home navigate={setCurrentPage} />;
      default:
        return <Login navigate={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;

