using OrganizationalStructure.Request;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace OrganizationalStructure.Entities
{
    public class Employee
    {
        public Employee(string firstName, string lastName, string middleName, int leaderId, string role)
        {
            FirstName = firstName;
            LastName = lastName;
            MiddleName = middleName;
            LeaderId = leaderId;
            Role = role;
        }

        public Employee(CreateEmployeeRequest request)
        {
            FirstName = request.firstName;
            LastName = request.lastName;
            MiddleName = request.middleName;
            LeaderId = request.leaderId;
            Role = request.role;
        }

        [Key]
        public Guid Id { get; init; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeCode { get; init; }
        public string FirstName { get; init; }//Имя
        public string LastName { get; init; }//Фамилия
        public string MiddleName { get; init; }//Отчество
        public int LeaderId { get; init; }//Id Руководителя сотрудника
        public string Role { get; init; }//Должность
        public bool IsFire { get; init; } = false;// Уволеный сотрудник

    }
}
