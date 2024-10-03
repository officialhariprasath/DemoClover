import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Firestore imports
import { useNavigate } from 'react-router-dom'; // for redirection
import { db } from './firebase'; // Ensure correct import of db
import './OrderEntry.css'; // Assuming styles are correct

const OrderEntry = () => {
  const [layouts, setLayouts] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for redirecting

  // Fetch layouts from Firestore
  useEffect(() => {
    const fetchLayouts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'layouts'));
        const fetchedLayouts = [];
        querySnapshot.forEach((doc) => {
          fetchedLayouts.push({ id: doc.id, ...doc.data() });
        });
        setLayouts(fetchedLayouts);
        // Automatically set the first layout as selected by default
        if (fetchedLayouts.length > 0) {
          setSelectedLayout(fetchedLayouts[0]);
        }
      } catch (error) {
        console.error('Error fetching layouts: ', error);
      }
    };

    fetchLayouts();
  }, []);

  const handleLayoutClick = (layout) => {
    setSelectedLayout(layout);
  };

  const handleTableClick = (table) => {
    // Redirecting to the MenuItems page with table info
    navigate('/menuItems', { state: { table } });
  };

  return (
    <div className="order-entry">
      {/* Navigation Bar for Layout Names */}
      <div className="layout-bar">
        {layouts.map((layout) => (
          <button
            key={layout.id}
            onClick={() => handleLayoutClick(layout)}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor:
                selectedLayout && selectedLayout.id === layout.id
                  ? 'lightblue'
                  : 'white',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            {layout.name}
          </button>
        ))}
      </div>

      {/* Display the selected layout's tables */}
      <div className="layout-details">
        {selectedLayout && (
          <>
            <h3>Layout: {selectedLayout.name}</h3>
            <div className="tables">
              {selectedLayout.tables.map((table, index) => (
                <div
                  key={index}
                  className="table"
                  onClick={() => handleTableClick(table)}
                  style={{
                    display: 'inline-block',
                    margin: '10px',
                    padding: '10px',
                    borderRadius: table.type === 'circle' ? '50%' : '0%',
                    backgroundColor: 'lightblue',
                    width: '100px',
                    height: '100px',
                    textAlign: 'center',
                  }}
                >
                  <p>{table.name}</p>
                  <p>{`${table.maxMembers} members`}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderEntry;
