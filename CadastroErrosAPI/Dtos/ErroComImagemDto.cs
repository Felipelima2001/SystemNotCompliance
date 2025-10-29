using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CadastroErrosAPI.Dtos
{
    public class ErroComImagemDto
    {
        [FromForm] public string Descricao { get; set; } = string.Empty;
        [FromForm] public string Identificacao { get; set; } = string.Empty;
        [FromForm] public string Item { get; set; } = string.Empty;
        [FromForm] public string Lote { get; set; } = string.Empty;
        [FromForm] public string AcaoTomada { get; set; } = string.Empty;
        [FromForm] public DateTime DataRegistro { get; set; }
        [FromForm] public required IFormFile Imagem { get; set; }
    }
}
