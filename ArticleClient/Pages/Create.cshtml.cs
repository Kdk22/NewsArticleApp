using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ArticleClient.Pages
{
    public class CreateModel : PageModel
    {
        public void OnGet()
        {
        }
    }
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserId(this ClaimsPrincipal principal) =>
            principal.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}
