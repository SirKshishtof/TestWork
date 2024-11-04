import axios from "axios";

export async function createEmployee(newEmployee)
{
	try {
		let resposne = await axios.post("https://localhost:7146/hire", newEmployee);
		
		alert("Сотрудник успешно добавлен");
		return resposne.status;
		
	} catch (e) {
		alert("Сервер не отвечает");
	}
};
export async function fetchEmployee(employeeCode)
{
	try {
		let uri = "https://localhost:7146/employee?employeeCode="+employeeCode
	var resposne = await axios.get(uri);
	//console.log(resposne.data);
		return resposne.data;
	} 
	catch (e) {
		console.error(e);
	}
};

export async function fireEmplloye(employeeCode, newLeaderCode)
{
	console.log(employeeCode);
	console.log(newLeaderCode);
	try {
		let uri;
		if (newLeaderCode!==undefined) uri ="https://localhost:7146/fire?employeeCode="+employeeCode+"&newLeaderCode="+newLeaderCode;
		else uri = "https://localhost:7146/fire?employeeCode="+employeeCode
		var resposne = await axios.patch(uri);
		return resposne.status;
	} 
	catch (e) {
		alert("Не удалось уволить сотрудника");
	}
};

export async function deleteEmplloye(employeeCode)
{
	try {
		let uri = "https://localhost:7146/delete?employeeCode="+employeeCode
		var resposne = await axios.delete(uri);
		return resposne.status;
	} 
	catch (e) {
		alert("Не удалось удалить сотрудника");
	}
};

export async function fetchAllEmployees()
{
	try {
	var resposne = await axios.get("https://localhost:7146/allemployee");
		return resposne.data;
	} 
	catch (e) {
		console.error(e);
	}
};



export async function fetchAllsubordinates(employeeCode)
{
	try {
		let uri = "https://localhost:7146/allsubordinates?employeeCode="+employeeCode
	var resposne = await axios.get(uri);
	//console.log(resposne.data);
		return resposne.data;
	} 
	catch (e) {
		console.error(e);
	}
};




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
