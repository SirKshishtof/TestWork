export function getAllOptionsFromResponse(data, response) {
    
        for (let i = 0; i < response.length; i++) {
          data.push(
            `${response[i].employeeCode} ${response[i].firstName} ${response[i].lastName} ${response[i].middleName}`
          );
        }
      return data; 
  }
  