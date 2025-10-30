namespace CadastroErrosAPI.Dtos
{
    public class ErroDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public string Identificacao { get; set; } = string.Empty;
        public string Item { get; set; } = string.Empty;
        public string Lote { get; set; } = string.Empty;
        public string AcaoTomada { get; set; } = string.Empty;
        public DateTime DataRegistro { get; set; }
        public string? ImagePath { get; set; }
        public int SetorId { get; set; }
        public string SetorNome { get; set; } = string.Empty;
    }
}
