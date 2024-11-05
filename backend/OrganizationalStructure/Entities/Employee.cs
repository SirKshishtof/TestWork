using OrganizationalStructure.Request;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace OrganizationalStructure.Entities
{
    public class Employee
    {
        static int directorCode = -1;// Значение -1 означает, что сотрудник является диретором


        [Key]
        public Guid Id { get; init; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeCode { get; init; }
        public string FirstName { get; init; }//Имя
        public string LastName { get; init; }//Фамилия
        public string MiddleName { get; init; }//Отчество
        public int LeaderCode { get; init; }//Код Руководителя сотрудника. Значение -1 означает, что сотрудник является директором 
        public string Role { get; init; }//Должность
        public bool IsFire { get; init; } = false;// Уволеный сотрудник


        public Employee(string firstName, string lastName, string middleName, string role, int leaderCode)
        {
            FirstName = firstName;
            LastName = lastName;
            MiddleName = middleName;
            LeaderCode = leaderCode;
            Role = role;
        }

        public Employee(CreateEmployeeRequest request)
        {
            FirstName = request.firstName;
            LastName = request.lastName;
            MiddleName = request.middleName;
            LeaderCode = request.leaderCode;
            Role = request.role;
        }

        public Employee(int employeeCode, string firstName, string lastName, string middleName, string role, int leaderCode)
        {
            EmployeeCode = employeeCode;
            FirstName = firstName;
            LastName = lastName;
            MiddleName = middleName;
            LeaderCode = leaderCode;
            Role = role;
        }

    }
}
