using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CadastroErrosAPI.Data;
using CadastroErrosAPI.Models;
using CadastroErrosAPI.Dtos;


namespace CadastroErrosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ErrosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ErrosController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // ============================
        // GET: Consultas
        // ============================

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Erro>>> GetTodos()
        {
            return await _context.Erros.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Erro>> GetPorId(int id)
        {
            var erro = await _context.Erros.FindAsync(id);
            return erro == null ? NotFound() : erro;
        }

        [HttpGet("por-lote/{lote}")]
        public async Task<ActionResult<IEnumerable<Erro>>> GetPorLote(string lote)
        {
            return await _context.Erros
                .Where(e => e.Lote == lote)
                .ToListAsync();
        }

        [HttpGet("ordenado")]
        public async Task<ActionResult<IEnumerable<Erro>>> GetOrdenado()
        {
            return await _context.Erros
                .OrderByDescending(e => e.DataRegistro)
                .ToListAsync();
        }

        [HttpGet("por-data/{data}")]
        public async Task<ActionResult<IEnumerable<Erro>>> GetPorData(DateTime data)
        {
            return await _context.Erros
                .Where(e => e.DataRegistro.Date == data.Date)
                .ToListAsync();
        }

        [HttpGet("pagina")]
        public async Task<ActionResult<IEnumerable<Erro>>> GetPaginado(int pagina = 1, int tamanho = 10)
        {
            return await _context.Erros
                .Skip((pagina - 1) * tamanho)
                .Take(tamanho)
                .ToListAsync();
        }

        // ============================
        // POST: Criação
        // ============================
[HttpPost("com-imagem")]
public async Task<IActionResult> PostErroComImagem([FromForm] ErroComImagemDto dto)
{
    string imagePath = "";

    if (dto.Imagem != null && dto.Imagem.Length > 0)
    {
        var webRoot = _env?.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        var pasta = Path.Combine(webRoot, "imagens");

        if (!Directory.Exists(pasta))
            Directory.CreateDirectory(pasta);

        var caminho = Path.Combine(pasta, dto.Imagem.FileName);

        using var stream = new FileStream(caminho, FileMode.Create);
        await dto.Imagem.CopyToAsync(stream);

        imagePath = $"/imagens/{dto.Imagem.FileName}";
    }

    var erro = new Erro
    {
        Descricao = dto.Descricao,
        Identificacao = dto.Identificacao,
        Item = dto.Item,
        Lote = dto.Lote,
        AcaoTomada = dto.AcaoTomada,
        DataRegistro = dto.DataRegistro,
        ImagePath = imagePath
    };

    _context.Erros.Add(erro);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetPorId), new { id = erro.Id }, erro);
}



        // ============================
        // PUT: Atualização
        // ============================

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarErro(int id, Erro erro)
        {
            if (id != erro.Id)
                return BadRequest();

            _context.Entry(erro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Erros.Any(e => e.Id == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // ============================
        // DELETE: Remoção
        // ============================

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoverErro(int id)
        {
            var erro = await _context.Erros.FindAsync(id);
            if (erro == null)
                return NotFound();

            _context.Erros.Remove(erro);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
