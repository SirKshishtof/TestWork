import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import LabTabs from "./Components/Tab.js";
import TreeView from "./Components/EmployeeTree.js";
import {Button} from "@mui/material";
import {CreateTestData} from "./HttpRequest.js";

function App() {
  
  
  function handleClick_CreateTestData() 
  {
    CreateTestData()
  }
  return (
    <div className="App">
      <Grid container spacing={10}>
        <Grid item xs={6} md={5}>
          <Item>
            <LabTabs />
          </Item>
        </Grid>
        <Grid item xs={6} md={7}>
          <Item>
            <label  >Код сотрудника | Фамилия | Имя | Отчество | Роль </label>
            <br></br><br></br>
            <TreeView/>
            </Item>
        </Grid>
      </Grid>
      <Button onClick={handleClick_CreateTestData}>
                    
                    Создать тестовые данные
                </Button>
    </div>
  );
}

export default App;
