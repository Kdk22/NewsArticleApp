using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewsArticle.Model
{
    public class    Article
    {
        public Article()
        {
        }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public DateTime DatePublished { get; set; } = DateTime.Now;

        [DataType(DataType.Upload)]
        [Display(Name = "Upload File")]
        [Required(ErrorMessage = "Please choose file to upload.")]
        public string ImageURL { get; set; }

    }
}
