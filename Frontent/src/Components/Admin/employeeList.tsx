import React, { useEffect, useState } from "react";
import TabelFrame from "../../Components/tableFrame";
import { useDispatch } from "react-redux";
import { addEmployees } from "../../redux/admin/employeeSlice";
import { employeesData, employeesActionAPI } from "../../api/adminApi";

function EmployeeListTable() {
  const [employeeList, setEmployeeList] = useState([]);
  const [update, setUpdate] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);

  useEffect(() => {
    getEmployeeData();
  }, [update, page]);

  const getEmployeeData = async () => {
    const { employeeData, size } = await employeesData(page);

    setEmployeeList(employeeData);
    setSize(size);
    setUpdate("");
    dispatch(addEmployees(employeeData));
  };

  const handleAction = async (id: string, action: string, message: string) => {
    await employeesActionAPI(id, action);
    setUpdate("update");
  };
  const filterPagination = (value) => {
    setPage(value);
  };
  const heading = "Employee";
  return (
    <TabelFrame
      heading={heading}
      data={employeeList}
      handleAction={handleAction}
      role="employees"
      filterPagination={filterPagination}
      currentPage={page}
      size={size}
    />
  );
}

export default EmployeeListTable;
