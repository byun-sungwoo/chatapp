using System;
using ChatApp.Areas.Identity.Data;
using ChatApp.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(ChatApp.Areas.Identity.IdentityHostingStartup))]
namespace ChatApp.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<ChatDbContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("ChatDbContextConnection")));

                services.AddDefaultIdentity<ChatUser>(options =>
                {
                    options.SignIn.RequireConfirmedAccount = false; // set true if confirm email
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase= false;
                })
                    .AddEntityFrameworkStores<ChatDbContext>();
            });
        }
    }
}