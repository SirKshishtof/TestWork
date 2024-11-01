using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyNotes.Contracts;
using OrganizationalStructure.DatabaseAcsses;
using OrganizationalStructure.Entities;
using OrganizationalStructure.Request;

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
            Employee employee = new Employee(request);
            await dbContext.Employees.AddAsync(employee);
            await dbContext.SaveChangesAsync();
            return Ok();
            //if (request) 
            //{
            //    await dbContext.Employees.AddAsync(new Employee(request));
            //    await dbContext.SaveChangesAsync();
            //    return Ok();
            //}
            //else 
            //{
            //    return BadRequest();
            //}
        }

        [HttpGet("/employee")]
        public async Task<IActionResult> GetEmployees(/*[FromQuery] GetEmployeeRequest request*/)
        {
            var notesQuery = dbContext.Employees;
            ////.Where(n => !string.IsNullOrWhiteSpace(request.Search));

            //var notesQuery = dbContext.Employees
            //.Where(n => n.FirstName == request.Code);

            return Ok(notesQuery);
        }

        [HttpPatch("/fire")]
        public async Task<IActionResult> FireEmplloye([FromQuery] GetEmployeeRequest request)
        {
            return Ok();
        }

        [HttpDelete("/delete")]
        public async Task<IActionResult> DeleteEmplloye([FromQuery] GetEmployeeRequest request)
        {


            return Ok();
        }
    }
}
