


import React from "react";
import "../css/sidebar.css";

const Sidebar = ({ category, setCategory,onClose }) => {
  const categories = [
    "All",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const handleCategoryClick = (item)=>{
    setCategory(item);

    // for mobile -- drawer
    if(onClose){
      onClose()
    }
  }

  return (
    <aside className="sidebar">

      <div className="sidebar-header">
        <h2>Categories</h2>
        <span>{categories.length} Items</span>
      </div>

      <div className="category-list">

        {categories.map((item) => (
          <button
            key={item}
            className={`category-btn ${
              category === item ? "active-category" : ""
            }`}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </button>
        ))}

      </div>

    </aside>
  );
};

export default Sidebar;