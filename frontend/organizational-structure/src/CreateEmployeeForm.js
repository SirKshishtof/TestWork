import * as React from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
} from "@mui/material";

import { fetchAllEmployees, createEmployee } from "./HttpRequest.js";
import { buttonStyle } from "./ButtonStyle.js";

// const buttonStyle = {
//   width: "450px",
//   height: "35px",
//   fontSize: "17px",
//   marginTop: "10px",
//   marginRight: "5px",
// };

// const containsText = (text, searchText) =>
//   text.toLowerCase().includes(searchText.toLowerCase());

function containsText(text, searchText) {
  return text.toLowerCase().includes(searchText.toLowerCase());
}

export default function CreateEmployeeForm() {
  const [allOptions, setAllOptions] = React.useState([""]);

  const [firstName_TextField, setFirstName_TextField] = React.useState();
  const [lastName_TextField, setLastName_TextField] = React.useState();
  const [middleName_TextField, setMiddleName_TextField] = React.useState();
  const [Role_TextField, setRole_TextField] = React.useState();

  const [selectedOption, setSelectedOption] = React.useState("");
  const [displayedOptions, setDisplayedOptions] = React.useState([]);

  function onChange_SearchText(searchText) {
    setDisplayedOptions(
      allOptions.filter((option) => containsText(option, searchText))
    );
  }

  async function updateData() {
    let response = await fetchAllEmployees();
    // console.log(response)
    let data = [];

    if (response.length > 0) {
      for (let i = 0; i < response.length; i++) {
        data.push(
          `${response[i].employeeCode} ${response[i].firstName} ${response[i].lastName} ${response[i].middleName}`
        );
      }
    }
    
    setAllOptions(data);
    setDisplayedOptions(data);
  }

  React.useEffect(() => {
    updateData();
  }, []);

  function handleClick_AddEmployee() {
    let employee = {
      firstName: firstName_TextField,
      lastName: lastName_TextField,
      middleName: middleName_TextField,
      role: Role_TextField,
      leaderId: parseInt(
        selectedOption.slice(0, selectedOption.indexOf(" ", 0))
      ),
    };
    createEmployee(employee);
    // if (createEmployee(employee) === 200) alert("Сотрудник добавлен");
    // else alert("Что-то пошло не так");
    //console.log(createEmployee(employee) );
    //if (createEmployee(employee).PromiseResult === 200 )console.log("Сотрудник добавлен");
  }

  return (
    <div className="container">
      <Box
        sx={{
          width: "450px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Фамилия"
          margin="normal"
          onChange={(event) => setFirstName_TextField(event.target.value)}
        />
        <TextField
          label="Имя"
          margin="normal"
          onChange={(event) => setLastName_TextField(event.target.value)}
        />
        <TextField
          label="Отчество"
          margin="normal"
          onChange={(event) => setMiddleName_TextField(event.target.value)}
        />
        <TextField
          label="Должность"
          margin="normal"
          onChange={(event) => setRole_TextField(event.target.value)}
        />
        <FormControl margin="normal">
          <InputLabel id="search-select-label">Руководитель</InputLabel>
          <Select
            MenuProps={{ autoFocus: false }}
            labelId="search-select-label"
            id="search-select"
            value={selectedOption}
            label="Руководитель"
            onChange={(e) => setSelectedOption(e.target.value)}
            renderValue={() => selectedOption}
          >
            <ListSubheader>
              <TextField
                size="small"
                placeholder="Введите для поиска..."
                fullWidth
                onChange={(e) => onChange_SearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Escape") {
                    e.stopPropagation();
                  }
                }}
              />
            </ListSubheader>
            {displayedOptions.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <button onClick={handleClick_AddEmployee} style={buttonStyle}>
          Добавить сотрудника
        </button>
      </Box>
    </div>
  );
}

//export default CreateEmployeeForm;
