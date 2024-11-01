namespace OrganizationalStructure.Request
{
    public record CreateEmployeeRequest(string firstName, string lastName, string middleName, Guid leaderId, string role);
}
