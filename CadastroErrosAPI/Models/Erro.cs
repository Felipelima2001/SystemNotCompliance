using System.ComponentModel.DataAnnotations;

namespace CadastroErrosAPI.Models
{
    public class Erro
    {
        public int Id { get; set; }

        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public string Identificacao { get; set; } = string.Empty;

        [Required]
        public string Item { get; set; } = string.Empty;

        [Required]
        public string Lote { get; set; } = string.Empty;

        public string AcaoTomada { get; set; } = string.Empty;

        public string ImagePath { get; set; } = string.Empty;

        public DateTime DataRegistro { get; set; } = DateTime.Now;
    }
}
