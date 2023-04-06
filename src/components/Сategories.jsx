import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice";

function Categories() {
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  const categoryId = useSelector((state) => state.filterReducer.categoryId);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, idx) => {
          return (
            <li key={idx} onClick={() => dispatch(setCategory(idx))} className={categoryId === idx ? "active" : ""}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
