import React, { useEffect, useState } from "react";
import TabelFrame from "../../Components/tableFrame";
import { useDispatch } from "react-redux";
import {  addRestaurents } from "../../redux/admin/restaurentSlice";
import { restaurentsData, restaurentActionAPI } from "../../api/adminApi";

function RestaurentListTable() {
  const [restaurentsList, setRestaurentList] = useState([]);
  const [update, setUpdate] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);

  useEffect(() => {
    getRestaurentData();
  }, [update, page]);

  const getRestaurentData = async () => {

    const { restaurentData , size } = await restaurentsData(page)

    setRestaurentList(restaurentData);
    setSize(size);
    setUpdate("");
    dispatch(addRestaurents(restaurentData));
  };

  const handleAction = async (id: string, action: string, message: string) => {
    await restaurentActionAPI(id, action);
    setUpdate("update");
  };

  const filterPagination = (value) => {
    setPage(value);
  };

  const heading = "Restaurents";

  return (
    <TabelFrame
      heading={heading}
      data={restaurentsList}
      handleAction={handleAction}
      role="restaurents"
      filterPagination={filterPagination}
      currentPage={page}
      size={size}
    />
  );
}

export default RestaurentListTable;
