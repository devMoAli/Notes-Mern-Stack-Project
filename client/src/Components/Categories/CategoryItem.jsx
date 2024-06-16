import React from "react";
import "./categories.css";

function CategoryItem({ category, isActive }) {
  return (
    <div className={`category-item ${isActive ? "active" : ""}`}>
      <p className="categoryListTitle">{category?.title}</p>
    </div>
  );
}

export default CategoryItem;
