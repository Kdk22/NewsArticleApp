using System;
using Microsoft.EntityFrameworkCore;

namespace NewsArticle.Model
{
    public class ArticleContext : DbContext
    {
        public ArticleContext(DbContextOptions<ArticleContext> options)
            : base(options)
        {
        }
        public DbSet<Article> Articles { get; set; }
    }
}
