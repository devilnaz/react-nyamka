import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Categories from "../components/Сategories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

import { useSelector, useDispatch } from "react-redux";
import { setSort, setPage } from "../redux/slices/filterSlice";

const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();
  const { categoryId, sortSelected, currentPage } = useSelector((state) => state.filterReducer);

  const { searchValue } = useContext(SearchContext);

  const skeletons = new Array(6).fill(null).map((_, idx) => <Skeleton key={idx} />);
  const pizzas = items.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase())).map((obj, i) => <PizzaBlock key={obj.id} {...obj} />);

  useEffect(() => {
    const category = categoryId === 0 ? "" : `category=${categoryId}`;
    const sortBy = `&sortBy=${sortSelected.property}&order=${sortSelected.order}`;
    const search = searchValue ? `&search=${searchValue}` : "";

    setLoading(true);

    axios.get(`https://642ae9e700dfa3b547525e2c.mockapi.io/items?${category}${search}&page=${currentPage}&limit=4${sortBy}`).then((res) => {
      setItems(res.data);
      setLoading(false);
    });

    window.scrollTo(0, 0);
  }, [categoryId, sortSelected, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort selected={sortSelected} onChangeSelected={(obj) => dispatch(setSort(obj))} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>

      <Pagination currentPage={currentPage} onChangePage={(number) => dispatch(setPage(number))} />
    </div>
  );
};

export default Home;
