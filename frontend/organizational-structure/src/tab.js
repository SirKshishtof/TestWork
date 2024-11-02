import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CreateEmployeeForm from "./CreateEmployeeForm.js";

function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <Tab label="Добавить сотрудника" value="1" />
              <Tab label="Найти сотрудника" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CreateEmployeeForm/>
          </TabPanel>

          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
export default LabTabs;
