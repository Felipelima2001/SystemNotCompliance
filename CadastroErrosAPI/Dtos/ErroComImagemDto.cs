using Microsoft.AspNetCore.Http;

namespace CadastroErrosAPI.Dtos
{
    public class ErroComImagemDto
    {
        public string Descricao { get; set; } = string.Empty;
        public string Identificacao { get; set; } = string.Empty;
        public string Item { get; set; } = string.Empty;
        public string Lote { get; set; } = string.Empty;
        public string AcaoTomada { get; set; } = string.Empty;
        public DateTime DataRegistro { get; set; }
        public IFormFile? Imagem { get; set; }  
    }
}
