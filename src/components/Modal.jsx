import React from "react";

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white text-blue-900 rounded-lg p-6 w-[90%] max-w-md shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">☂️ Rain Prediction</h2>
        <p className="text-lg">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
