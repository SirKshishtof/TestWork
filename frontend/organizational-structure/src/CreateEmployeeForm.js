import * as React from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  Button,
} from "@mui/material";

import { fetchAllEmployees, createEmployee } from "./HttpRequest.js";
import { bigButtonStyle } from "./styles.js";
import { containsText} from "./ContainsText.js"
import {getAllOptionsFromResponse} from "./GetAllOptionsFromResponse.js"


export default function CreateEmployeeForm() {

  const [firstName_TextField, setFirstName_TextField] = React.useState();
  const [lastName_TextField, setLastName_TextField] = React.useState();
  const [middleName_TextField, setMiddleName_TextField] = React.useState();
  const [Role_TextField, setRole_TextField] = React.useState();

  const [allOptions, setAllOptions] = React.useState([]);//""
  const [selectedOption, setSelectedOption] = React.useState("");
  const [displayedOptions, setDisplayedOptions] = React.useState([]);

  function onChange_SearchText(searchText) {
    setDisplayedOptions(
      allOptions.filter((option) => containsText(option, searchText))
    );
  }

  async function updateData() {
    let response = await fetchAllEmployees();
    let data = [];
    if (response !== undefined) {
      if (response !== undefined) {
        getAllOptionsFromResponse(data, response)
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

        <Button
          style={ bigButtonStyle}
          onClick={handleClick_AddEmployee}
        >
          Добавить сотрудника
        </Button>
      </Box>
    </div>
  );
}

//export default CreateEmployeeForm;
