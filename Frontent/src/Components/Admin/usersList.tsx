import React, { useEffect, useState } from "react";
import TabelFrame from "../../Components/tableFrame";
import { useDispatch } from "react-redux";
import { addUsers } from "../../redux/admin/userSlice";
import { userActionAPI, usersData } from "../../api/adminApi";

function UserListTable() {
  const [usersList, setUserList] = useState([]);
  const [update, setUpdate] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);

  useEffect(() => {
    getUserData();
  }, [update, page]);

  const getUserData = async () => {
    const { userData, size } = await usersData(page);
    setUserList(userData);
    setSize(size);
    setUpdate("");
    dispatch(addUsers(userData));
  };

  const handleAction = async (id: string, action: string, message: string) => {
    await userActionAPI(id, action);
    setUpdate("update");
  };

  const filterPagination = (value) => {
    setPage(value);
  };

  const heading = "Users";

  return (
    <TabelFrame
      heading={heading}
      data={usersList}
      handleAction={handleAction}
      role="users"
      filterPagination={filterPagination}
      currentPage={page}
      size={size}
    />
  );
}

export default UserListTable;
