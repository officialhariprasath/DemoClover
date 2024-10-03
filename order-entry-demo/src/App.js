import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TableManagement from './TableManagement';
import OrderEntry from './OrderEntry';
import AddItem from './AddItem';
import MenuItems from './MenuItems'; // Import MenuItems component

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/table-management">Table Management</Link>
            </li>
            <li>
              <Link to="/order-entry">Order Entry</Link>
            </li>
            <li>
              <Link to="/add-item">Items</Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/table-management" element={<TableManagement />} />
            <Route path="/order-entry" element={<OrderEntry />} />
            <Route path="/menuItems" element={<MenuItems />} /> {/* Ensure route for MenuItems */}
            <Route path="/add-item" element={<AddItem />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
