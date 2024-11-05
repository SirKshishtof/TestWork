namespace OrganizationalStructure.Request
{
    public record CreateEmployeeRequest(string firstName, string lastName, string middleName, string role, int leaderCode);
}
