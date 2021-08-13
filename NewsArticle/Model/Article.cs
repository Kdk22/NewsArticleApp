using System;
namespace NewsArticle.Model
{
    public class Article
    {
        public Article()
        {
        }

            public long Id { get; set; }
            public string Name { get; set; }
            public bool Description { get; set; }
            public DateTime datePublished { get; set; }
            public string ImageURL { get; set; }

    }
}
