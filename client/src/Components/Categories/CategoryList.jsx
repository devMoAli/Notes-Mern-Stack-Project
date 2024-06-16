import React from "react";
import CategoryItem from "./CategoryItem";
import { Link, useParams } from "react-router-dom";
import "./categories.css";

const CategoryList = ({ categories }) => {
  const { category } = useParams();

  return (
    <ul className="category-list">
      {categories.map((cat) => (
        <li className="category-list-item" key={cat._id}>
          <Link
            className="category-list-link"
            to={`/notes/category/${cat.title}`}
          >
            <CategoryItem category={cat} isActive={cat.title === category} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
