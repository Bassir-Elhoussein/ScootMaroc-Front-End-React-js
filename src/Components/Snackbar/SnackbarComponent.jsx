import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';// Import the MdClose icon

const SnackbarComponent = ({ open, message, handleClose }) => {
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          handleClose();
        }, 500);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, handleClose]);

  return (
    <>
      {open && (
       <div
       className={`fixed bottom-4 left-4 w-80 p-4 rounded-lg shadow-lg bg-gradient-to-r from-[#000000] to-[#D6AD60] text-white transition-transform transition-opacity duration-500 ease-in-out ${
         isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
       }`}
     >
          <div className="flex items-center justify-between">
            <p className="font-semibold">{message}</p>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(handleClose, 500);
              }}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close"
            >
              <CloseIcon size={20} /> {/* Add the close icon */}
            </button>
          </div>
          <div className="mt-2 w-full bg-white bg-opacity-30 rounded-full h-1">
            <div
              className="bg-white h-1 rounded-full transition-all duration-5000 ease-linear"
              style={{ width: isVisible ? '100%' : '0%' }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SnackbarComponent;
