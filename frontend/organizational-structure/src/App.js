import './App.css';
import { useEffect } from 'react';
import { fetchNotes } from "./HttpRequest.js";

// function MyButton() {
//   let text;
//   function handleClick() 
//   {
//       text = createNote;w
//   }

//   return (
//     <button onClick={handleClick}>
      
//           </button>
//   );

//   // const [count, setC] = useState(0);

//   // function handleClick() {
//   //   setC(count + 1);
//   // }

//   // return (
//   //   <button onClick={handleClick}>
//   //     {count} 
//   //         </button>
//   // );
// }

function App() {
  useEffect(()=> {
    const fetchData = async()=>{
      await fetchNotes();
    };
    fetchData();
  },[])
  return (
    <div className="App">
      <header className="App-header">
        Организационная структура
      </header>
      <body>
      <div>
        Фамилия<textarea></textarea>
      </div >
      <div>
        Имя<textarea></textarea>
      </div>
      <div>
        Отчество<textarea></textarea>
      </div>
      <div>
        Должность<textarea></textarea>
      </div>
      <select name="pets" id="pet-select">
  <option value="">--Please choose an option--</option>
  <option value="dog">Dog</option>
  <option value="cat">Cat</option>
  <option value="hamster">Hamster</option>
  <option value="parrot">Parrot</option>
  <option value="spider">Spider</option>
  <option value="goldfish">Goldfish</option>
</select>
</body>
    </div>
    
    
  );
}

export default App;
