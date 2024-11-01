import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function MyButton() {
    const [count, setCount] = React.useState(0);
  
    function handleClick() {
      setCount(count + 1);
    }
  
    return (
      <button onClick={handleClick} className="button">
        Кликнули {count} раз
      </button>
    );
  }

function CreateEmployeeForm() {
//   const [value, setValue] = React.useState("1");

//   const handleChangeSelect = (event, newValue) => {
//     setValue(newValue);
//   };

//   const [count, setCount] = React.useState(0);

//   function handleChangeAddEmployee() {
//     setCount(count + 1);
  //}

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
          id="firstName"
          className="TextField"
          label="Фамилия"
          margin="normal"
          value=""
        />
        <TextField className="TextField" label="Имя" margin="normal" />
        <TextField className="TextField" label="Отчество" margin="normal" />
        <TextField className="TextField" label="Должность" margin="normal" />
        <FormControl width="200px">
          <InputLabel id="demo-simple-select-label">Руководитель</InputLabel>
          <Select
            id="selectBoss"
            labelId="demo-simple-select-label"
            label="Руководитель"
            width="450px"
            // onChange={handleChangeSelect}
          >
            <MenuItem>Валентин</MenuItem>
            <MenuItem>Генадий</MenuItem>
            <MenuItem>Маршал</MenuItem>
          </Select>
        </FormControl>
        <div>
            <MyButton className="button" ></MyButton>
          {/* <button className="button" onChange={handleChangeAddEmployee}>
            Добавить{count}
          </button> */}
        </div>
      </Box>
    </div>
  );
}

export default CreateEmployeeForm;
