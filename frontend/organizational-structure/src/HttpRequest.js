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

export const fetchNotes = async (note) => 
{
	var resposne = await axios.get("https://localhost:7146/employee");
	console.log(resposne);
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
