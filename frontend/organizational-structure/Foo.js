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

import { useEffect } from "react";
import { fetchNotes } from "./HttpRequest.js";



const buttonStyle = {
  width: "450px",
  height: "35px",
  fontSize: "17px",
  marginTop: "10px",
  marginRight: "5px",
};


const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const allOptions = ["5 Маша Аминова", "10 Даша Алилова", "20 Маршал Жуков", "30 Валентин Стрыкало", "3 Валентин Стрыкало"];


function CreateEmployeeForm() {

  useEffect(() => {
    // const fetchData = async () => {
    //   await fetchNotes();
    // };
    // fetchData();
  });


  const [firstName_TextField, setFirstName_TextField] = React.useState("");
  const [lastName_TextField, setLastName_TextField] = React.useState("");
  const [middleName_TextField, setMiddleName_TextField] = React.useState("");
  const [Role_TextField, setRole_TextField] = React.useState("");

  const [selectedOption, setSelectedOption] = React.useState("");

  const [searchText, setSearchText] = React.useState("");

  const displayedOptions = React.useMemo(
    () => allOptions.filter((option) => containsText(option, searchText)),
    [searchText]
  );

    const [count, setCount] = React.useState(0);

  function handleClick_AddEmployee() {
    setCount(count + 1);
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
        <TextField label="Фамилия" margin="normal" onChange={(event) => setFirstName_TextField(event.target.value)}/>
        <TextField label="Имя" margin="normal" onChange={(event) => setLastName_TextField(event.target.value)}/>
        <TextField label="Отчество" margin="normal" onChange={(event) => setMiddleName_TextField(event.target.value)}/>
        <TextField label="Должность" margin="normal" onChange={(event) => setRole_TextField(event.target.value)}/>
        <FormControl margin="normal" >
        <InputLabel id="search-select-label">Руководитель</InputLabel>
        <Select
          MenuProps={{ autoFocus: false }}
          labelId="search-select-label"
          id="search-select"
          value={selectedOption}
          label="Руководитель"
          onChange={(e) => setSelectedOption(e.target.value)}
          onClose={() => setSearchText("")}
          renderValue={() => selectedOption}
        >
          <ListSubheader>
            <TextField
              size="small"
              placeholder="Введите для поиска..."
              fullWidth
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {if (e.key !== "Escape") {e.stopPropagation();}
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
          Добавить {count} {firstName_TextField}
        </button>
        {firstName_TextField} {lastName_TextField} {middleName_TextField} {Role_TextField} 
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



  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     let = await fetchNotes();
  //     return
  //   };
  //   fetchData();
  // });

  // React.useInsertionEffect(() => {
  //   const fetchData =  () => {
  //     allOptions =[];
  //     for (let i = 0; i<arrObjects.length; i++)
  //     {
  //       // let obj = arrObjects[i];
  //       // let str = "{obj.Code} {obj.firstName} {obj.lastName} {obj.middleName} ";
  //       allOptions.push(i +"");
  //     }
  //     console.log(allOptions);
  //   };
  //   fetchData();
  // });
