import axios from "axios";

// export const fetchNotes = async (filter) => {
// 	try {
// 		var resposne = await axios.get("http://194.76.173.38:5432/notes", {
// 			params: {
// 				search: filter?.search,
// 				sortItem: filter?.sortItem,
// 				sortOrder: filter?.sortOrder,
// 			},
// 		});

// 		return resposne.data.notes;
// 	} catch (e) {
// 		console.error(e);
// 	}
// };


export async function createEmployees(newEmployee)
{
	try {
		let resposne = await axios.post("http://localhost:5003/notes", newEmployee);
		return resposne.status;
	} catch (e) {
		console.error(e);
	}
};

export async function fetchEmployees()
{
	try {
	var resposne = await axios.get("https://localhost:7146/allemployee");
	
		return resposne.data;
	} 
	catch (e) {
		console.error(e);
	}
};

// axios.post('/user', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });





// export const fetchNotes = async (filter) => {
// 	try {
// 		var resposne = await axios.get("http://localhost:5003/notes", {
// 			params: {
// 				search: filter?.search,
// 				sortItem: filter?.sortItem,
// 				sortOrder: filter?.sortOrder,
// 			},
// 		});

// 		return resposne.data.notes;
// 	} catch (e) {
// 		console.error(e);
// 	}
// };

// export const createNote = async (note) => {
// 	try {
// 		var resposne = await axios.post("http://localhost:5003/notes", note);

// 		return resposne.status;
// 	} catch (e) {
// 		console.error(e);
// 	}
// };
