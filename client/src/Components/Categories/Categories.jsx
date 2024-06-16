import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../Redux/Apicalls/categoryApicall";
import "./categories.css";
import CategoryList from "./CategoryList";

function Categories() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <div className="categories-container">
      <div className="category-list">
        <CategoryList categories={categories} />
      </div>
    </div>
  );
}

export default Categories;
