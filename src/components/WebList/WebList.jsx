import React, { useEffect, useState } from 'react';
import './weblist.css'

const WebList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState('');
  const [appList, setAppList] = useState([]);

  const openDocumentPanel = (url) => {
    setSelectedApp(url);
    setIsOpen(true);
  };

  const closeDocumentPanel = () => {
    setSelectedApp('');
    setIsOpen(false);
  };

  const handleAppChange = (event) => {
    setSelectedApp(event.target.value);
  };


useEffect(() => {
    const fetchAppList = async () => {
      try {
        const response = await fetch("./apps.json");
        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
        const data = await response.json();
        setAppList(data);
      } catch (error) {
        console.error("Ошибка при загрузке списка приложений:", error);
      }
    };

    fetchAppList();
  }, []);


  return (
    <div className='wallet'>
      <div className="wallet-content">
        <div className="weblist">
          <select onChange={handleAppChange}>
            <option value="">Select a Site</option>
            {appList.map((app, index) => (
              <option key={index} value={app.url}>
                {app.label}
              </option>
            ))}
          </select>
          <div className="wallet-btn">
            <button onClick={() => openDocumentPanel(selectedApp)} disabled={!selectedApp}>
              Open
            </button>
          </div>

          {isOpen && (
            <div className="document-panel">
              <div className="close-btn wallet-btn" onClick={closeDocumentPanel}>
                <button>
                  Close
                </button>
              </div>
              <div className="iframe-container">
                <iframe
                  src={selectedApp}
                  style={{ width: '100%', height: 'calc(100vh - 50px)', border: 'none' }}
                  title="Selected App"
                />
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default WebList;
