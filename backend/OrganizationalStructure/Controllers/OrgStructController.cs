using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizationalStructure.DatabaseAcsses;
using OrganizationalStructure.Entities;
using OrganizationalStructure.Request;
using System.ComponentModel;
using System.Data;
using System.Text.Json;

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
                var employee = new Employee(request);

                var employees = dbContext.Employees.ToList();

                if (employees.Count != 0 && request.leaderCode != -1)
                {
                    await dbContext.Employees.AddAsync(employee);
                }
                else 
                {
                    if (employees.Count == 0 && request.leaderCode == -1)
                    {
                        await dbContext.Employees.AddAsync(employee);
                    }
                    else 
                    {
                        return BadRequest("Директор уже существует");
                    }
                }
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
                    .Where(e => e.EmployeeCode == employee[0].LeaderCode))
                .Select(e => new
                {
                    e.EmployeeCode,
                    e.FirstName,
                    e.LastName,
                    e.LeaderCode,
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
                await dbContext.SaveChangesAsync();
            }
            else
            {
                var subordinates = dbContext.Employees
                .Where(e => e.LeaderCode == employeeCode).ToList();

                if (subordinates.Count > 0)
                {
                    var fireEmployee = dbContext.Employees
                    .Where(e => e.EmployeeCode == employeeCode).ToList();

                    var employee = dbContext.Employees.Where(e => e.EmployeeCode == newLeaderCode)
                        .ExecuteUpdate(e => e.SetProperty(upd => upd.LeaderCode, upd => fireEmployee[0].LeaderCode));

                    employee = dbContext.Employees.Where(e => e.LeaderCode == employeeCode)
                        .ExecuteUpdate(e => e.SetProperty(upd => upd.LeaderCode, upd => newLeaderCode));

                    employee = dbContext.Employees.Where(e => e.EmployeeCode == employeeCode)
                        .ExecuteUpdate(e => e.SetProperty(upd => upd.IsFire, upd => true));
                    return Ok();
                    await dbContext.SaveChangesAsync();
                }
                else
                {
                    return BadRequest();
                }

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
            var employees = dbContext.Employees
                .Where(e => !e.IsFire)
                .Select(e => new
                {
                    e.EmployeeCode,
                    e.FirstName,
                    e.LastName,
                    e.LeaderCode,
                    e.MiddleName,
                    e.Role,
                });

            var list = employees.ToList();
            return Ok(employees);
        }

        [HttpGet("/allsubordinates")]
        public IActionResult GetAllSubordinates([FromQuery] int employeeCode)
        {
            var employees = dbContext.Employees
                .Where(e => !e.IsFire && e.LeaderCode == employeeCode)
                .Select(e => new
                {
                    e.EmployeeCode,
                    e.FirstName,
                    e.LastName,
                    e.LeaderCode,
                    e.MiddleName,
                    e.Role,
                });
            
            return Ok(employees);
        }



        [HttpGet("/createTestData")]
        public async Task<IActionResult> CreateTestData()
        {
            try
            {
                var employees = dbContext.Employees.ToList();
                if (employees.Count == 0)
                {

                    await dbContext.Employees.AddAsync(new Employee(1, "Колоновская", "Алиса", "Давидовна", "Директор", -1));
                    await dbContext.Employees.AddAsync(new Employee(2, "Колоновская", "Василиса", "Давидовна", "Бухгалтер", 1));
                    await dbContext.Employees.AddAsync(new Employee(3, "Рыжий", "Алекс", "Константинович", "Слесарь", 1));
                    await dbContext.Employees.AddAsync(new Employee(4, "Лебедь", "Никита", "Владимирович", "Программист", 1));
                    await dbContext.Employees.AddAsync(new Employee(5, "Альминова", "Альбина", "Рамилевна", "Системный аналитик", 1));
                    await dbContext.Employees.AddAsync(new Employee(6, "Тарасов", "Михаил", "Петрович", "Тестировщик", 4));
                    await dbContext.Employees.AddAsync(new Employee(7, "Клюев", "Александр", "Владиславович", "Повар", 2));
                    await dbContext.Employees.AddAsync(new Employee(8, "Булатов", "Яков", "Ярославович", "Безопасник", 2));
                    await dbContext.Employees.AddAsync(new Employee(9, "Маркова", "Эмилия", "Михайловна", "Дизайнер", 3));
                    await dbContext.Employees.AddAsync(new Employee(10, "Назаров", "Михаил", "Михайлович", "Завхоз", 3));
                    await dbContext.Employees.AddAsync(new Employee(11, "Савина", "Милана", "Тимуровна", "Уборщица", 3));
                    await dbContext.Employees.AddAsync(new Employee(12, "Дьяконов", "Роман", "Семёнович", "Уборщик", 4));
                    await dbContext.Employees.AddAsync(new Employee(13, "Смирнов", "Максим", "Львович", "Ремонтник", 4));
                    await dbContext.Employees.AddAsync(new Employee(14, "Морозова", "Милана", "Егоровна", "Верстальщик", 5));
                    await dbContext.Employees.AddAsync(new Employee(15, "Горлова", "Элина", "Константиновна", "Бизнес аналитик", 6));
                    await dbContext.Employees.AddAsync(new Employee(16, "Геральт", "из", "Ривии", "Ведьмак", 5));
                    await dbContext.SaveChangesAsync();

                    return Ok();
                }
                else return BadRequest();
                
            }
            catch
            {
                return BadRequest();
            }
        }

       
    }
}
