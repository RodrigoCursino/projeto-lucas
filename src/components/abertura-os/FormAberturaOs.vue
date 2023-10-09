<template>
    <div>
        <form action="">
                <div class="modal-card" style="">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Cadastrar OS</p>
                        <button
                            type="button"
                            class="delete"
                            @click="$emit('close')"/>
                    </header>
                    <section class="modal-card-body">
                        <div class="columns">
                            <b-field label="Número da OS" class="column">
                                <b-input
                                    type="text"
                                    :value="os"
                                    placeholder="Número da OS"
                                    required>
                                </b-input>
                            </b-field>
                            <b-field label="Safra" class="column">
                                <b-datepicker :value="safra" 
                                              required
                                              :unselectable-days-of-week="[0, 6]">
                                </b-datepicker>
                            </b-field>
                            <b-field label="Processo" class="column">
                                <b-input
                                    type="text"
                                    :value="id_processo"
                                    placeholder="Processo"
                                    required>
                                </b-input>
                            </b-field>
                        </div>
                        <div class="columns">
                            <b-field label="Produto" class="column">
                                <b-input
                                    type="text"
                                    :value="os"
                                    placeholder="Produto"
                                    required>
                                </b-input>
                            </b-field>
                        </div>
                        <div class="columns">
                            <b-field label="Arquivo SPLD" class="column">
                                <b-input
                                    type="text"
                                    :value="id_arquivo_spld"
                                    placeholder="Arquivo SPLD"
                                    required>
                                </b-input>
                            </b-field>
                            <b-field label="Arquivo P360" class="column">
                                <b-input
                                    type="text"
                                    :value="id_arquivo_p360_1"
                                    placeholder="Arquivo P360"
                                    required>
                                </b-input>
                            </b-field>
                            <b-field label="Arquivo P360 2" class="column">
                                <b-input
                                    type="text"
                                    :value="id_arquivo_p360_2"
                                    placeholder="Arquivo P360"
                                    required>
                                </b-input>
                            </b-field>
                        </div>
                            <b-field label="Observação">
                                <b-input maxlength="200" :value="obs" type="textarea"></b-input>
                            </b-field>
                       
                            <b-field label="Detalhes">
                                <b-input maxlength="200" :value="descricao" type="textarea"></b-input>
                            </b-field>
                        
                    </section>
                    <footer class="modal-card-foot">
                        <b-button
                            label="Salvar"
                            type="is-primary" 
                            @click="$emit('save')"
                        />
                        <b-button
                            label="Fechar"
                            @click="$emit('close')" />
                    </footer>
                </div>
            </form>
    </div>
</template>

<script>
    import FormOs from '@/components/abertura-os/FormOs.js'
    export default {
        name: 'form-abertura-os',
        props: [
        'uuid',
        'id_processo',
        'produto',
        'safra',
        'os',
        'qtd_envolvidos',
        'descricao',
        'obs',
        'id_arquivo_spld',
        'id_arquivo_p360_1',
        'id_arquivo_p360_2'
        ],
        data: () => ({
            formOs : new FormOs({})
        })
    }
</script>

<style lang="scss" scoped>

</style>