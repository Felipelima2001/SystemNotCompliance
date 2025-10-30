using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CadastroErrosAPI.Data;
using CadastroErrosAPI.Models;

namespace CadastroErrosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SetoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SetoresController(AppDbContext context)
        {
            _context = context;
        }

        // ============================
        // GET: Listar todos os setores
        // ============================

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Setor>>> GetTodos()
        {
            return await _context.Setores.ToListAsync();
        }

        // ============================
        // GET: Buscar setor por ID
        // ============================

        [HttpGet("{id}")]
        public async Task<ActionResult<Setor>> GetPorId(int id)
        {
            var setor = await _context.Setores.FindAsync(id);
            return setor == null ? NotFound() : setor;
        }

        // ============================
        // POST: Criar novo setor
        // ============================

        [HttpPost]
        public async Task<ActionResult<Setor>> CriarSetor([FromBody] Setor setor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Retorna erros de validação
            }

            try
            {
                _context.Setores.Add(setor);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetPorId), new { id = setor.Id }, setor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno ao salvar setor: {ex.Message}");
            }
        }

        // ============================
        // PUT: Atualizar setor
        // ============================

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarSetor(int id, Setor setor)
        {
            if (id != setor.Id)
                return BadRequest("ID do setor não corresponde ao parâmetro.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Entry(setor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Setores.Any(s => s.Id == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // ============================
        // DELETE: Remover setor
        // ============================

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoverSetor(int id)
        {
            var setor = await _context.Setores.FindAsync(id);
            if (setor == null)
                return NotFound();

            _context.Setores.Remove(setor);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
