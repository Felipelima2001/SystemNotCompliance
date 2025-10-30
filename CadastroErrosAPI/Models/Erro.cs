using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        // Caminho da imagem salva no servidor
        public string ImagePath { get; set; } = string.Empty;

        public DateTime DataRegistro { get; set; } = DateTime.Now;

        public int SetorId { get; set; }
        public Setor Setor { get; set; } = null!;

        // Campo apenas para uso interno (não mapeado no banco)
        [NotMapped]
        public object? Imagem { get; set; }
    }
}
