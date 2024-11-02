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

import { fetchEmployees,createEmployees } from "./HttpRequest.js";

const buttonStyle = {
  width: "450px",
  height: "35px",
  fontSize: "17px",
  marginTop: "10px",
  marginRight: "5px",
};
const containsText = (text, searchText) =>
  text.toLowerCase().includes(searchText.toLowerCase());

function CreateEmployeeForm() {
  const [allOptions, setAllOptions] = React.useState([""]);
  const [firstName_TextField, setFirstName_TextField] = React.useState();
  const [lastName_TextField, setLastName_TextField] = React.useState();
  const [middleName_TextField, setMiddleName_TextField] = React.useState();
  const [Role_TextField, setRole_TextField] = React.useState();

  const [selectedOption, setSelectedOption] = React.useState("");
  const [displayedOptions, setDisplayedOptions] = React.useState([]);

  async function UpdateData() {
    let response = await fetchEmployees();
    console.log(response)
    let data = [];
    for (let i = 0; i < response.length; i++) {
      data.push(`${response[i].employeeCode}  ${response[i].firstName} ${response[i].lastName} ${response[i].middleName}`);
    }
    setAllOptions(data);
    setDisplayedOptions(data);
  }

  React.useEffect(() => {
    UpdateData();
  }, []);

  function onChange_SearchText(searchText) {
    setDisplayedOptions(
      allOptions.filter((option) => containsText(option, searchText))
    );
  }



  function handleClick_AddEmployee() {
    let employee = {
      firstName: firstName_TextField,
      lastName: lastName_TextField,
      middleName: middleName_TextField,
      role: Role_TextField,
      leaderId: parseInt("0")
    }
    createEmployees(employee);
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
          Добавить {selectedOption}
        </button>
      </Box>
    </div>
  );
}

export default CreateEmployeeForm;

// {/*
//  const [leader, setAge] = React.useState("");
//           function handleChangeSelect(event) {
//     setAge(event.target.value);
//   }

//         <FormControl width="200px" margin="normal">
//           <InputLabel id="demo-simple-select-label">Руководитель</InputLabel>
//           <Select
//             id="selectBoss"

//             labelId="demo-simple-select-label"
//             label="Руководитель"
//             width="450px"
//             value={leader}
//             onChange={handleChangeSelect}
//           >
//             <MenuItem value={"Валентин"}>Валентин</MenuItem>
//             <MenuItem value={"Генадий"}>Генадий</MenuItem>
//             <MenuItem value={"Маршал"}>Маршал</MenuItem>
//           </Select>
//         </FormControl> */}
