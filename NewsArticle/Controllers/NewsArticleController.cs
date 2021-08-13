using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsArticle.Model;

namespace NewsArticle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsArticleController : ControllerBase
    {
        private readonly ArticleContext _context;

        public NewsArticleController(ArticleContext context)
        {
            _context = context;
        }

        // GET: api/NewsArticle
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
            return await _context.Articles.ToListAsync();
        }

        // GET: api/NewsArticle/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(long id)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            return article;
        }

        // PUT: api/NewsArticle/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(long id, Article article)
        {
            if (id != article.Id)
            {
                return BadRequest();
            }

            _context.Entry(article).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/NewsArticle
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle(Article article)
        {
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetArticle", new { id = article.Id }, article);
            return CreatedAtAction(nameof(GetArticle), new { id = article.Id }, article);

        }

        // DELETE: api/NewsArticle/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(long id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArticleExists(long id)
        {
            return _context.Articles.Any(e => e.Id == id);
        }
    }
}
