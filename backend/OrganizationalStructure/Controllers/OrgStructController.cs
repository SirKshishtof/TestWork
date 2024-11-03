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
        public async Task<IActionResult> FireEmplloye([FromQuery] int employeeCode, int newLeaderCode)
        {
            return Ok();
        }

        [HttpDelete("/delete")]
        public async Task<IActionResult> DeleteEmplloye([FromQuery] int employeeCode)
        {


            return Ok();
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

    }


}
