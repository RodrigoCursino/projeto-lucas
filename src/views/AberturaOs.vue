<template>
  <div>
    <div class="columns content-search">
      <b-field class="column is-three-fifths">
        <b-input placeholder="Buscar"
                 type="search"
                 icon="magnify"
                 rounded
                 @input="keyPushSearch($event)"
                 icon-clickable>
        </b-input>
      </b-field>
      <b-field class="column">
        <b-button type="is-light"
                  size="is-small"
                  @click="resetPriority"
        >
          Limpar Ordenação
        </b-button>
      </b-field>
      <b-field class="column align-button">
        <b-button type="is-primary"
                  size="is-small"
                  @click="showModal=!showModal"
        >
          Cadatrar OS
        </b-button>
      </b-field>
    </div>
    <b-table
      :data="DataList"
      ref="multiSortTable"
      @sort="sortPressed"
      @sorting-priority-removed="sortingPriorityRemoved"
      :sort-multiple="multiColumnSortingEnabled"
      :sort-multiple-data="sortingPriority"
      :sort-multiple-key="'ctrlKey'"
      :paginated="true"
      detailed
      detail-key="uuid"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :pagination-rounded="isPaginationRounded"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="user.first_name"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      pagination-size="is-small"
      :page-input="hasInput"
      :pagination-order="paginationOrder"
      :page-input-position="inputPosition"
      :debounce-page-input="inputDebounce"
    >
        <b-table-column field="os" label="OS" sortable v-slot="props">
            {{ props.row.os }}
        </b-table-column>
        <b-table-column field="produto" label="Produto" sortable v-slot="props">
            {{ props.row.produto }}
        </b-table-column>
        <b-table-column field="qtd_envolvidos" label="Qtd. Envolvidos" sortable v-slot="props">
            {{ props.row.qtd_envolvidos }}
        </b-table-column>
        <b-table-column field="data_criacao" label="Usuário" sortable v-slot="props">
            {{ props.row.usuario }}
        </b-table-column>
        <b-table-column field="id_arquivo_spld" label="SPLD ID" sortable v-slot="props">
            {{ props.row.id_arquivo_spld }}
        </b-table-column>
        <b-table-column field="id_arquivo_p360_1" label="P360 ID" sortable v-slot="props">
            {{ props.row.id_arquivo_p360_1 }}
        </b-table-column>
        <b-table-column field="id_arquivo_p360_2" label="P360 2 ID" sortable v-slot="props">
            {{ props.row.id_arquivo_p360_2 }}
        </b-table-column>
        <b-table-column field="data_criacao" label="Dt. Criação" sortable v-slot="props">
            {{ props.row.data_criacao }}
        </b-table-column>
        <b-table-column field="" label="" v-slot="props">
            <b-button type="is-primary"
                      size="is-small"
                      title="Editar"
                      @click="editar(props.row)"
                      icon-right="update">
            </b-button>
            <b-button type="is-danger"
                      size="is-small"
                      title="Deletar"
                      class="mx-1"
                       @click="deletar(props.row)"
                      icon-right="delete">
            </b-button>
        </b-table-column>
              <template #detail="props">
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="/static/img/placeholder-128x128.png">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <strong>OS: {{ props.row.os }} - {{ props.row.produto }}</strong>
                            <p>{{ props.row.descricao }}</p>
                            <p>{{ props.row.obs }}</p>
                            <br>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                              Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                              Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                            </p>
                        </div>
                    </div>
                </article>
            </template>
        </b-table>
        <b-modal
            v-model="showModal"
            has-modal-card
            trap-focus
            scroll="clip"
            size="is-medium"
            :on-cancel="clearForm()"
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-label="Example Modal"
            close-button-aria-label="Close"
            aria-modal>
            <template #default="props">
                <FormAberturaOs v-bind="formOs" 
                                @save="salvar()"
                               @close="props.close"/>
            </template>
        </b-modal>
      </div>
</template>

<script>
import { PaginationMixin } from '@/mixins/paginationMixin.js'
import FormAberturaOs      from '@/components/abertura-os/FormAberturaOs'
import {orderBy, cloneDeep} from 'lodash'
const dataSource = [
  { 
   'uuid': 1,
   'id_processo': 1,
   'produto': 'Produto  1',
   'safra': '2023-10-05 17:23:48',
   'os': '7128882023',
   'qtd_envolvidos': 425,
   'descricao': 'teste tsets',
   'obs': 'obs',
   'ativo': 1,
   'id_arquivo_spld': 1,
   'id_arquivo_p360_1': 60,
   'id_arquivo_p360_2': 18,
   'usuario': 'lentolu',
   'data_criacao': '2023-10-05 17:23:48'
  },
  { 
   'uuid': 2,
   'id_processo': 1,
   'produto': 'Produto 2',
   'safra': '2023-10-05 17:23:48',
   'os': '7121232023',
   'qtd_envolvidos': 456,
   'descricao': 'teste tsets',
   'obs': 'obs',
   'ativo': 1,
   'id_arquivo_spld': 152,
   'id_arquivo_p360_1': 123,
   'id_arquivo_p360_2': 85,
   'usuario': 'lentolu',
   'data_criacao': '2023-10-05 17:23:48'
  },
  { 
   'uuid': 3,
   'id_processo': 1,
   'produto': 'Produto 3',
   'safra': '2023-10-05 17:23:48',
   'os': '7122222023',
   'qtd_envolvidos': 456,
   'descricao': 'teste tsets',
   'obs': 'obs',
   'ativo': 1,
   'id_arquivo_spld': 118,
   'id_arquivo_p360_1': 12,
   'id_arquivo_p360_2': 13,
   'usuario': 'lentolu',
   'data_criacao': '2023-10-05 17:23:48'
  }
]
  import FormOs from '@/components/abertura-os/FormOs.js'
  export default { 
    mixins: [PaginationMixin],
      components: {
        FormAberturaOs
      },
      computed: {
        DataList() {
          return this.filterDataPagination(this.filterDataListBySearch(this.data))
        }
      },
      data() {
          return {
            formOs: new FormOs({}),
            showModal: false,
            filter: '',
            perPage: 5,
            activeOnly: false,
            txtSearch: [],
            totalRows: 0,
            toggleOrder: false,
            keyOrder: {
                value: ''
            }, 
            timerSearch: () => {},
            isPaginated: true,
            isPaginationSimple: false,
            isPaginationRounded: false,
            paginationPosition: 'bottom',
            defaultSortDirection: 'asc',
            sortIcon: 'arrow-up',
            sortIconSize: 'is-small',
            currentPage: 1,
            hasInput: false,
            paginationOrder: '',
            inputPosition: '',
            inputDebounce: '',
            customKey: null,
            backendSortingEnabled: false,
            multiColumnSortingEnabled: true,
            data: [],
            sortingPriority: []
          }
      },
      methods: {
        editar(row) {
          this.formOs = new FormOs(row)
          this.showModal = true
        },  
        salvar() {
          console.info(this.formOs)
          this.showModal = false
          this.data.push(cloneDeep(this.formOs))
        },  
        clearForm() {
          this.formOs = new FormOs({})
        },  
        resetPriority(){
          this.$refs.multiSortTable.resetMultiSorting()

          // reset local backend sorting
          if(this.backendSortingEnabled) {
            this.sortingPriority = []
            this.loadAsyncData()
          }
        },

        // Backend sorting
        sortingPriorityRemoved(field){
          this.sortingPriority = this.sortingPriority.filter(
            (priority) => priority.field !== field)
          this.loadAsyncData(this.sortingPriority)
        },

        sortPressed(field, order, event) {
          if(this.backendSortingEnabled) {
            if(this.multiColumnSortingEnabled){
              if((this.customKey && event[this.customKey]) || !this.customKey) {
                let existingPriority = this.sortingPriority.filter(i => i.field === field)[0]
                if(existingPriority) {
                  existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc'
                } else {
                  // request sorted data from backend
                  this.sortingPriority.push({field, order})
                }
                this.loadAsyncData(this.sortingPriority)
              } else {
                // request regular sorted data from backend
                this.sortingPriority = [] // [{field, order}]
                this.loadAsyncData([{field, order}])
              }
            }
          }
        },

        // "API request" for data
        async loadAsyncData(sortingPriority = []) {
          let mockdata = JSON.parse(JSON.stringify(dataSource));
          // get data already sorted from the backend using sortingPriority
          this.data = orderBy(mockdata, sortingPriority.map(i => i.field), sortingPriority.map(i => i.order))
        }
      },
      created () {
        this.data = JSON.parse(JSON.stringify(dataSource));
      }
  }
</script>

<style lang="scss" scoped>
 .content-search {
    display: flex;
    align-items: center;
    .align-button {
      display: flex;
      justify-content: flex-end;
    }
 }

</style>