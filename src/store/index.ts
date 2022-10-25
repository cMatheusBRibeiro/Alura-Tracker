import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { InjectionKey } from 'vue';
import { ADICIONAR_PROJETO, ADICIONAR_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, EXCLUIR_PROJETO, EXCLUIR_TAREFA } from "./tipo-mutacoes";
import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";


interface Estado {
    projetos: IProjeto[];
    tarefas: ITarefa[];
    notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: [
            {
                id: 1,
                texto: 'Uma notificação de sucesso.',
                titulo: 'Sucesso!',
                tipo: TipoNotificacao.SUCCESSO
            },
            {
                id: 2,
                texto: 'Uma notificação de atenção.',
                titulo: 'Atenção!',
                tipo: TipoNotificacao.ATENCAO
            },
            {
                id: 3,
                texto: 'Uma notificação de falha.',
                titulo: 'Falha!',
                tipo: TipoNotificacao.FALHA
            },
            {
                id: 4,
                texto: 'Uma notificação de sucesso.',
                titulo: 'Sucesso!',
                tipo: TipoNotificacao.SUCCESSO
            }
        ]
    },
    mutations: {
        [ADICIONAR_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            }
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id === projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id !== id)
        },
        [ADICIONAR_TAREFA](state, tarefa: ITarefa) {
            tarefa.id = new Date().toISOString()
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id === tarefa.id)
            state.tarefas[index] = tarefa
        },
        [EXCLUIR_TAREFA](state, id: string) {
            state.tarefas = state.tarefas.filter(t => t.id !== id)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}