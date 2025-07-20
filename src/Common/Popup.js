import "./common.css";

function Popup({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content mx-2">
        <button className="popup-close" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
