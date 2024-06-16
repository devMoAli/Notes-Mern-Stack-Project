import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Categories from "../../Components/Categories/Categories";
import NoteList from "../../Components/Notes/NoteList";
import { fetchNotesByCategory } from "../../Redux/Apicalls/noteApicall";
import "../../Components/Categories/categories.css";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { notesCategories } = useSelector((state) => state.note);
  const { categories } = useSelector((state) => state.category);
  const { category } = useParams();

  useEffect(() => {
    if (category) {
      dispatch(fetchNotesByCategory(category));
      window.scrollTo(0, 0);
    }
  }, [dispatch, category]);

  return (
    <div className="category-notes">
      <div className="catSection">
        <Categories categories={categories} currentCategory={category} />
        <div className="catTitleDiv">
          <h4 className="noteCatTitle">
            Notes in <span className="catTitleC">{category}</span> Category
          </h4>
        </div>
      </div>

      <div>
        <NoteList notes={notesCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
