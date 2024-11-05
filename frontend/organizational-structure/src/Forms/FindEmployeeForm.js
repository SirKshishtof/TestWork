import * as React from "react";
import {
    bigButtonStyle,
    labelStyle,
    littleButtonStyle,
} from "../Styles/styles.js";
import {
    TextField,
    Box,
    Button,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    ListSubheader,
} from "@mui/material";

import {
    fetchEmployee,
    fetchAllsubordinates,
    deleteEmplloye,
    fireEmplloye,
} from "../HttpRequest.js";
import { containsText } from "../Metods/ContainsText.js";
import { getAllOptionsFromResponse } from "../Metods/GetAllOptionsFromResponse.js";

function FindEmployeeForm() {
    const [foundEmployee, setFoundEmployee] = React.useState([]);

    const [employeeCode, setEmployeeCode] = React.useState("");
    const [employeeStr, setEmployeeStr] = React.useState("");
    const [employeeLeaderStr, setEmployeeLeaderStr] = React.useState("");

    const [allOptions, setAllOptions] = React.useState([]);
    const [selectedOption, setSelectedOption] = React.useState("");
    const [displayedOptions, setDisplayedOptions] = React.useState([]);

    function employeToString(emp) {
        let isFireStr;
        if (emp.isFire) isFireStr = "Уволен";
        else isFireStr = "В штате";
        return `${emp.employeeCode} ${emp.firstName} ${emp.lastName} ${emp.middleName} ${emp.role} ${isFireStr}`;
    }

    function setData(firsResponse, secondResponse) {
        setFoundEmployee(firsResponse);
        setEmployeeStr(employeToString(firsResponse));

        setEmployeeLeaderStr(employeToString(secondResponse));
    }

    async function getEmployee() {
        let response = await fetchEmployee(employeeCode);
        setSelectedOption("");
        if (response !== undefined) {
            if (response.length > 1) {
                if (response[0].employeeCode == employeeCode)
                    setData(response[0], response[1]);
                else setData(response[1], response[0]);
            } else {
                setFoundEmployee(response[0]);
                setEmployeeStr(employeToString(response[0]));
                setEmployeeLeaderStr("");
            }

            response = await fetchAllsubordinates(employeeCode);
            let data = [];
            if (response !== undefined) {
                getAllOptionsFromResponse(data, response);
            }
            // console.log("response");
            // console.log(response);
            // console.log("data");
            // console.log(data);

            setAllOptions(data);
            setDisplayedOptions(data);
        } else {
            setEmployeeStr("");
            setEmployeeLeaderStr("");
            alert("По запросу ничего не найдено");
        }
    }

    async function deletSelectEmployee() {
        if (employeeStr != null && employeeStr != "") {
            console.log(foundEmployee.isFire);
            if (foundEmployee.isFire) {
                await deleteEmplloye(employeeCode);
                alert("Сотрудник успешно удален");
            } else {
                alert("Перед удалением необходимо уволить сотрудника");
            }
        } else {
            alert("Выберете сотрудника");
        }
    }

    async function fireSelectEmployee() {
        if (employeeStr != null && employeeStr != "") {
            if (allOptions.length == 0) {
                await fireEmplloye(employeeCode);
                alert("Сотрудник уволен");
            } else {
                if (selectedOption != "" && selectedOption != null) {
                    console.log(selectedOption);
                    await fireEmplloye(
                        employeeCode,
                        selectedOption.slice(0, selectedOption.indexOf(" ", 0))
                    );
                    alert("Сотрудник уволен");
                } else {
                    alert("Выберете нового руководителя");
                }
            }
        } else {
            alert("Выберете сотрудника");
        }
    }
    function onChange_SearchText(searchText) {
        setDisplayedOptions(
            allOptions.filter((option) => containsText(option, searchText))
        );
    }

    function handleClick_FindEmployee() {
        getEmployee();
    }

    function handleClick_FireEmployee() {
        fireSelectEmployee();
        // console.log(selectedOption)
    }

    function handleClick_DeleteEmployee() {
        deletSelectEmployee();
    }

    React.useEffect(() => {
        //console.log(foundEmployee)
    }, [foundEmployee, employeeStr, employeeLeaderStr]);

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

                <Button
                    style={bigButtonStyle}
                    onClick={handleClick_FindEmployee}
                >
                    Найти сотрудника
                </Button>

                <label style={labelStyle}>
                    Найденный сотрудник: {employeeStr}
                </label>
                <label style={labelStyle}>
                    Руководитель сотрудника: {employeeLeaderStr}
                </label>

                <FormControl
                    sx={{
                        marginTop: "30px",
                    }}
                >
                    <InputLabel id="search-select-label">
                        Подчиненные сотрудника
                    </InputLabel>
                    <Select
                        MenuProps={{ autoFocus: false }}
                        labelId="search-select-label"
                        id="search-select"
                        value={selectedOption}
                        label="Подчиненные сотрудника"
                        onChange={(e) => setSelectedOption(e.target.value)}
                        renderValue={() => selectedOption}
                    >
                        <ListSubheader>
                            <TextField
                                size="small"
                                placeholder="Введите для поиска..."
                                fullWidth
                                onChange={(e) =>
                                    onChange_SearchText(e.target.value)
                                }
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

                <div>
                    <Button
                        style={littleButtonStyle}
                        onClick={handleClick_FireEmployee}
                    >
                        Уволить сотрудника
                    </Button>

                    <Button
                        style={littleButtonStyle}
                        onClick={handleClick_DeleteEmployee}
                    >
                        Удалить запись
                    </Button>
                </div>
            </Box>
        </div>
    );
}

export default FindEmployeeForm;
