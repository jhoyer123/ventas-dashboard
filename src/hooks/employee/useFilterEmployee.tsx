import { useState } from "react";

type EmployeeType = "todos" | "con_acceso" | "sin_acceso";

const useFilterEmployee = () => {
  const [typeEmployee, setTypeEmployee] = useState<EmployeeType>("todos");
  const changeTypeEmployee = (type: EmployeeType) => {
    setTypeEmployee(type);
  };

  return {
    typeEmployee,
    changeTypeEmployee,
  };
};

export default useFilterEmployee;
