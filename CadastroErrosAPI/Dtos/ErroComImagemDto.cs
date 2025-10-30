using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace CadastroErrosAPI.Dtos
{
    public class ErroComImagemDto
    {
        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public string Identificacao { get; set; } = string.Empty;

        [Required]
        public string Item { get; set; } = string.Empty;

        [Required]
        public string Lote { get; set; } = string.Empty;

        public string AcaoTomada { get; set; } = string.Empty;

        public DateTime DataRegistro { get; set; } = DateTime.Now;

        public IFormFile? Imagem { get; set; }

        [Required]
        public int SetorId { get; set; }  // ⚠️ obrigatória para relacionar com Setor
    }
}
