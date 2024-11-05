using Microsoft.OpenApi.Models;
using OrganizationalStructure.DatabaseAcsses;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Organization Structure API",
        Version = "v1",
    });
});
builder.Services.AddScoped<OrgStructDBContext>();

// builder.Services.AddCors(options =>
// {
//     options.AddDefaultPolicy(policy =>
//     {
//         policy.WithOrigins("http://localhost:3000");
//         policy.AllowAnyHeader();
//         policy.AllowAnyMethod();
//     });
// });

var app = builder.Build();

using var scope = app.Services.CreateScope();
await using var dbContext = scope.ServiceProvider.GetRequiredService<OrgStructDBContext>();
await dbContext.Database.EnsureCreatedAsync();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseCors();
app.UseRouting();
app.UseStaticFiles();
app.MapControllers();
app.Run();
