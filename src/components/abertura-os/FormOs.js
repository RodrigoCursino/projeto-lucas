class FormOs {
    constructor(data) {
        this.uuid              = data?.uuid              ? data.uuid              : '',
        this.id_processo       = data?.id_processo       ? data.id_processo       : '',
        this.produto           = data?.produto           ? data.produto           : '',
        this.safra             = data?.safra             ? new Date()             : null,
        this.os                = data?.os                ? data.os                : '',
        this.qtd_envolvidos    = data?.qtd_envolvidos    ? data.qtd_envolvidos    : '',
        this.descricao         = data?.descricao         ? data.descricao         : '',
        this.obs               = data?.obs               ? data.obs               : '',
        this.id_arquivo_spld   = data?.id_arquivo_spld   ? data.id_arquivo_spld   : '',
        this.id_arquivo_p360_1 = data?.id_arquivo_p360_1 ? data.id_arquivo_p360_1 : '',
        this.id_arquivo_p360_2 = data?.id_arquivo_p360_2 ? data.id_arquivo_p360_2 : ''
    }
}
export default FormOs