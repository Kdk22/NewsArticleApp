using System;
namespace NewsArticle.Model
{
    public class    Article
    {
        public Article()
        {
        }

            public long Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public DateTime DatePublished { get; set; } = DateTime.Now;
            public string ImageURL { get; set; }

    }
}
