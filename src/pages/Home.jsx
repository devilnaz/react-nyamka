import { useState, useEffect, useContext, useRef } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Сategories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { sortList } from "../components/Sort";

import { useSelector, useDispatch } from "react-redux";
import { setSort, setPage, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector((state) => state.pizza);

  const { categoryId, sortSelected, currentPage } = useSelector((state) => state.filterReducer);

  const { searchValue } = useContext(SearchContext);

  const getPizzas = async () => {
    const category = categoryId === 0 ? "" : `category=${categoryId}`;
    const sortBy = `&sortBy=${sortSelected.property}&order=${sortSelected.order}`;
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        search,
        currentPage,
      })
    );
  };

  // Устанавливает параметры в url
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        currentPage,
        sortSelected: sortSelected.property,
        sortOrder: sortSelected.order,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortSelected, currentPage]);

  // Получает параметры с url
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => {
        return obj.property === params.sortSelected && obj.order === params.sortOrder;
      });

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortSelected, searchValue, currentPage]);

  const skeletons = new Array(6).fill(null).map((_, idx) => <Skeleton key={idx} />);
  const pizzas = items.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase())).map((obj, i) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort selected={sortSelected} onChangeSelected={(obj) => dispatch(setSort(obj))} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="cart cart--empty">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>К сожалению, не удалось получить питсы. Повторите попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={(number) => dispatch(setPage(number))} />
    </div>
  );
};

export default Home;
