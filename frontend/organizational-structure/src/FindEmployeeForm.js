import * as React from "react";
import { TextField, Box } from "@mui/material";
import { buttonStyle } from "./ButtonStyle.js";

import { fetchEmployee } from "./HttpRequest.js";

function FindEmployeeForm() {
  const [Role_TextField, setRole_TextField] = React.useState();
  const [foundEmployee, setFoundEmployee] = React.useState([]); 
  const [foundEmployeeLeader, setFoundEmployeeLeader] = React.useState([]);
  const [employeeCode, setEmployeeCode] = React.useState("");
  const [employeeStr, setEmployeeStr] = React.useState("");
  const [employeeLeaderStr, setEmployeeLeaderStr] = React.useState("");
  let data = [];

  function toString(emp) {
    return `${emp.employeeCode} ${emp.firstName} ${emp.lastName} ${emp.middleName} ${emp.role}`;
  }

  async function getEmployee() {
    let response = await fetchEmployee(employeeCode);
    // setEmployeeStr(`${response[0].employeeCode} ${response[0].firstName} ${response[0].lastName} ${response[0].middleName} ${response[0].role} ${response[0].leaderId}`);
    // setEmployeeLeaderStr(`${response[1].employeeCode} ${response[1].firstName} ${response[1].lastName} ${response[1].middleName} ${response[1].role} ${response[1].leaderId}`);

    if (response.length > 1) {
      
      if (response[0].employeeCode === employeeCode) {
        console.log("then");
        setFoundEmployee(response[1]);
        setFoundEmployeeLeader(response[0]);
      } else {
        console.log("else");

        //setFoundEmployee(e => ([e, response[1]]))
        setFoundEmployee(response[1]);
        // console.log(foundEmployee);

        setFoundEmployeeLeader(response[0]);
        // console.log(foundEmployeeLeader);

      }
    }
  }

  function handleClick_AddEmployee() {
    getEmployee();
  }

  React.useEffect(() => {
    
    console.log(foundEmployee);
    console.log(foundEmployeeLeader);
    
  }, [foundEmployee,foundEmployeeLeader]);
  return (
    <div>
      <Box
        sx={{
          width: "450px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Код сотрудника"
          margin="normal"
          onChange={(event) => setEmployeeCode(event.target.value)}
        />

        <button onClick={handleClick_AddEmployee} style={buttonStyle}>
          Найти
        </button>
        <div><button style={{ margin: 20 }}> Уволить сотрудника</button>
        <button > Удалить запись</button>
        </div>
      </Box>
    </div>
  );
}

export default FindEmployeeForm;
