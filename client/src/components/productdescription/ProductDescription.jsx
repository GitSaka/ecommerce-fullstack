import { useState } from "react";
import './productdesc.css'

export default function ProductDescription({ text = "" }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_LENGTH = 150;

  const showSeeMore = text?.length > MAX_LENGTH;

  const displayText = isExpanded
    ? text
    : text.substring(0, MAX_LENGTH) + (showSeeMore ? "..." : "");

  return (
    <div className="description-container">
      <p className="description-text">
        {displayText}
      </p>

      {showSeeMore && (
        <button
          className="toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Voir moins" : "Voir plus"}
        </button>
      )}
    </div>
  );
}

