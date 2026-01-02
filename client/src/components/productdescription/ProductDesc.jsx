import { useState } from "react";
import './productdesc.css'

function ProductDesc({ text = "" }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="description-wrapper">
      <div className={`description-text ${expanded ? "expanded" : ""}`}>
        {text}
      </div>

      {!expanded && (
        <div className="fade-overlay"></div>
      )}

      <div className="see-more-container">
        <button
          className="see-more-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Voir moins" : "Voir plus"}
        </button>
      </div>
    </div>
  );
}

export default ProductDesc;
