using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NewsArticle;
using NewsArticle.API.IntegrationTests;
using NewsArticle.Controllers;
using NewsArticle.Model;
using Xunit;

namespace NewsArticle.API.IntegrationTests
{
     public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureAppConfiguration((hostingContext, configurationBuilder) =>
            {
                var type = typeof(TStartup);
                var path = @"C:\\OriginalApplicationWebAPI";

                configurationBuilder.AddJsonFile($"{path}\\appsettings.json", optional: true, reloadOnChange: true);
                configurationBuilder.AddEnvironmentVariables();
            });
        }
    }
}

public class DepartmentAppServiceTest : IClassFixture<CustomWebApplicationFactory<NewsArticle.Startup>>

{
    public ArticleContext context;
    private readonly HttpClient _client;

    public DepartmentAppServiceTest(CustomWebApplicationFactory<NewsArticle.Startup> factory)
    {
        _client = factory.CreateClient();
    }



    public class NewsArticleTest : IClassFixture<CustomWebApplicationFactory<Startup>>
    {


        public NewsArticleTest()
        {
        }

        private IConfiguration GetConfig()
        {
            var builder = new ConfigurationBuilder()
              .SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("appsettings.json", true, true)
              .AddEnvironmentVariables();

            return builder.Build();
        }
    }


        [Fact]
        public async Task TestGetStockItemsAsync()
        {
            // Arrange
            var request = "/api/v1/NewsArticle";

            // Act
            //var response = await Client.GetAsync(request);

            // Assert
            //response.EnsureSuccessStatusCode();
        }

        //[Fact]
        //public async Task Post_DeleteAllMessagesHandler_ReturnsRedirectToRoot()
    //{
    //    // Arrange
    //    //var defaultPage = await _client.GetAsync("/");
    //    //var content = await HtmlHelper.GetDocumentAsync(defaultPage);

        //    //Act
        //    //var response = await _client.SendAsync(
        //    //    (IHtmlFormElement)content.QuerySelector("form[id='messages']"),
        //    //    (IHtmlButtonElement)content.QuerySelector("button[id='deleteAllBtn']"));

        //    // Assert
        //    Assert.Equal(HttpStatusCode.OK, defaultPage.StatusCode);
        //    Assert.Equal(HttpStatusCode.Redirect, response.StatusCode);
        //    Assert.Equal("/", response.Headers.Location.OriginalString);
        //}

    //}



