using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using OrganizationalStructure.Entities;


namespace OrganizationalStructure.DatabaseAcsses
{
    public class OrgStructDBContext: DbContext
    {
        private readonly IConfiguration _configuration;

        public OrgStructDBContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<Employee> Employees => Set<Employee>(); 

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Database"));
        }
    }
}
