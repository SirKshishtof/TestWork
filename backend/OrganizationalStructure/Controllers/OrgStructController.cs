using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizationalStructure.DatabaseAcsses;
using OrganizationalStructure.Entities;
using OrganizationalStructure.Request;
using System.ComponentModel;
using System.Data;

namespace OrganizationalStructure.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrgStructController : ControllerBase
    {
        private OrgStructDBContext dbContext;
        public OrgStructController(OrgStructDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("/hire")]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeRequest request)
        {
            
            try
            {
                Employee employee = new Employee(request);
                await dbContext.Employees.AddAsync(employee);
                await dbContext.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("/employee")]
        public IActionResult GetEmployee([FromQuery] int employeeCode)
        {

            var employee = dbContext.Employees
                .Where(e => e.EmployeeCode == employeeCode).ToList();



            var employeeAndLeader = dbContext.Employees
                .Where(e => e.EmployeeCode == employeeCode)
                .Union
                (
                   dbContext.Employees
                    .Where(e => e.EmployeeCode == employee[0].LeaderId))
                .Select(e => new
                {
                    e.EmployeeCode,
                    e.FirstName,
                    e.LastName,
                    e.LeaderId,
                    e.MiddleName,
                    e.Role,
                    e.IsFire
                });

            return Ok(employeeAndLeader);
        }

        [HttpPatch("/fire")]
        public async Task<IActionResult> FireEmplloye([FromQuery] int employeeCode, int? newLeaderCode)
        {
            //dbContext.Employees
            


            if (newLeaderCode is null)
            {
                var employee = dbContext.Employees.Where(e => e.EmployeeCode == employeeCode)
                    .ExecuteUpdate(e => e.SetProperty(upd => upd.IsFire, upd => true));
                return Ok();
            }
            else
            {
                var subordinates = dbContext.Employees
                .Where(e => e.LeaderId == employeeCode).ToList();

                if (subordinates.Count > 0)
                {
                    var fireEmployee = dbContext.Employees
                    .Where(e => e.EmployeeCode == employeeCode).ToList();

                    var employee = dbContext.Employees.Where(e => e.EmployeeCode == newLeaderCode)
                        .ExecuteUpdate(e => e.SetProperty(upd => upd.LeaderId, upd => fireEmployee[0].LeaderId));

                    employee = dbContext.Employees.Where(e => e.LeaderId == employeeCode)
                        .ExecuteUpdate(e => e.SetProperty(upd => upd.LeaderId, upd => newLeaderCode));

                    employee = dbContext.Employees.Where(e => e.EmployeeCode == employeeCode)
                        .ExecuteUpdate(e => e.SetProperty(upd => upd.IsFire, upd => true));
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }


                //    .Where(e => e.EmployeeCode == employeeCode)
                //    .ExecuteUpdate(e => e.SetProperty(upd => upd.IsFire, upd => true));
                //https://localhost:7146/fire?employeeCode=15&newLeaderCode=1
                //'https://localhost:7146/fire?employeeCode=15'
            }
        }
            [HttpDelete("/delete")]
        public async Task<IActionResult> DeleteEmplloye([FromQuery] int employeeCode)
        {
            var employee = dbContext.Employees
                .Where(e => e.EmployeeCode == employeeCode).ToList();

            if (employee[0].IsFire)
            {
                dbContext.Employees.Where(e => e.EmployeeCode == employeeCode).ExecuteDelete();
                await dbContext.SaveChangesAsync();
                return Ok();
            }

            return BadRequest();
            //Employee employee = (Employee)dbContext.Employees
            //    .Where(e => e.EmployeeCode == employeeCode);
            //if (employee.IsFire)
            //{
            //    dbContext.Employees.Remove(employee);
            //    await dbContext.SaveChangesAsync();
            //    return Ok();
            //}
            //else
            //{
            //    return Ok();
            //}

        }


        [HttpGet("/allemployee")]
        public IActionResult GetAllEmployees()
        {
            var notesQuery = dbContext.Employees
                .Where(e => !e.IsFire)
                .Select(e => new
                {
                    e.EmployeeCode,
                    e.FirstName,
                    e.LastName,
                    e.LeaderId,
                    e.MiddleName,
                    e.Role,
                });

            return Ok(notesQuery);
        }

        [HttpGet("/allsubordinates")]
        public IActionResult GetAllSubordinates([FromQuery] int employeeCode)
        {
            var notesQuery = dbContext.Employees
                .Where(e => !e.IsFire && e.LeaderId == employeeCode)
                .Select(e => new
                {
                    e.EmployeeCode,
                    e.FirstName,
                    e.LastName,
                    e.LeaderId,
                    e.MiddleName,
                    e.Role,
                });

            return Ok(notesQuery);
        }

        [HttpGet("/allallemployee")]
        public IActionResult GetAllAllEmployees()
        {
            var notesQuery = dbContext.Employees
                .Select(e => new
                {
                    e.EmployeeCode,
                    e.FirstName,
                    e.LastName,
                    e.LeaderId,
                    e.MiddleName,
                    e.Role,
                });

            return Ok(notesQuery);
        }

        [HttpPost("/hirefire")]
        public async Task<IActionResult> Dohirefire([FromBody] CreateEmployeeRequest request)
        {
            try
            {
                Employee employee = new Employee(request, true);
                await dbContext.Employees.AddAsync(employee);
                await dbContext.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }

        }

    }


}
