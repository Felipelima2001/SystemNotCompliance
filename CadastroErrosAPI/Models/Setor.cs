using System.ComponentModel.DataAnnotations;

namespace CadastroErrosAPI.Models
{
    public class Setor
    {
        [Key]
        public int Id { get; set; } // chave primária correta

        [Required]
        public string Nome { get; set; } = string.Empty;

        public string Responsavel { get; set; } = string.Empty;

        // Relacionamento reverso
        public ICollection<Erro>? Erros { get; set; }
    }
}
