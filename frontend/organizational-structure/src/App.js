// import { useEffect } from "react";
// import { fetchNotes } from "./HttpRequest.js";
import LabTabs from "./tab.js";


function App() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchNotes();
  //   };
  //   fetchData();
  // }, []);
  
  return (
    <div className="App">
      <LabTabs />
    </div>
  );
}

export default App;
