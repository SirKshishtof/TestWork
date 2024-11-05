import axios from "axios";

export async function createEmployee(newEmployee)
{
	try {
		let response = await axios.post("http://localhost:3000/hire", newEmployee);
		
		alert("Сотрудник успешно добавлен");
		return response.status;
		
	} catch (e) {
		alert("Сервер не отвечает");
	}
};
export async function fetchEmployee(employeeCode)
{
	try {
		let uri = "http://localhost:3000/employee?employeeCode="+employeeCode
	var response = await axios.get(uri);
	//console.log(response.data);
		return response.data;
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
		if (newLeaderCode!==undefined) uri ="http://localhost:3000/fire?employeeCode="+employeeCode+"&newLeaderCode="+newLeaderCode;
		else uri = "http://localhost:3000/fire?employeeCode="+employeeCode
		var response = await axios.patch(uri);
		return response.status;
	} 
	catch (e) {
		alert("Не удалось уволить сотрудника");
	}
};

export async function deleteEmplloye(employeeCode)
{
	try {
		let uri = "http://localhost:3000/delete?employeeCode="+employeeCode
		var response = await axios.delete(uri);
		return response.status;
	} 
	catch (e) {
		alert("Не удалось удалить сотрудника");
	}
};

export async function fetchAllEmployees()
{
	try {
	var response = await axios.get("http://localhost:3000/allemployee");
		return response.data;
	} 
	catch (e) {
		console.error(e);
	}
};

export async function fetchAllsubordinates(employeeCode)
{
	console.log(employeeCode)
	try {
		let uri = "http://localhost:3000/allsubordinates?employeeCode="+employeeCode
	var response = await axios.get(uri);
	console.log(response.data);
	
		return response.data;
	} 
	catch (e) {
		console.error(e);
	}
};

export async function CreateTestData()
{
	try {
		var response = await axios.get("http://localhost:3000/createTestData");
		console.log("Данные добавлены");
		alert("Данные добавлены")
		return response.status;
	} 
	catch (e) {
		alert("Данные уже существуют. Удалите для заполнения БД заного")
		console.error(e);
	}
};

