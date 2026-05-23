// store/demandStore.ts

import { create } from 'zustand';
import { api } from '../services/api';
import { Demand, CreateDemandDTO } from '@shared/types/Demand';
import { DemandStatus } from '@shared/types/Status';
import { useAuthStore } from './authStore';

interface DemandState {
  demandas: Demand[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchDemandas: () => Promise<void>;
  addDemanda: (data: CreateDemandDTO) => Promise<void>;
  updateStatusDemanda: (id: string, newStatus: DemandStatus) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useDemandStore = create<DemandState>((set, get) => ({
  demandas: [],
  isLoading: false,
  error: null,

  // =====================================
  // ACTION: BUSCAR DEMANDAS (Usa a api.getDemandas)
  // =====================================
  fetchDemandas: async () => {
    set({ isLoading: true, error: null });
    try {
      // Chama a SUA Fake API
      const dados = await api.getDemandas();
      
      set({ demandas: dados, isLoading: false });
    } catch (err) {
      console.error("Falha ao buscar demandas:", err);
      set({ error: 'Erro ao carregar demandas', isLoading: false });
    }
  },

  // =====================================
  // ACTION: ADICIONAR DEMANDA (Usa a api.addDemanda)
  // =====================================
  addDemanda: async (dados) => {
    set({ isLoading: true, error: null });
    try {
      // Puxa o usuário logado do AuthStore
      const { user } = useAuthStore.getState();

      if (!user) {
        throw new Error("Usuário não está logado");
      }

      // Chama a Fake API para criar passando o userId
      const novaDemandaCriada = await api.addDemanda(dados, user.id);

      // Pela as demandas atuais e adiciona a nova no começo
      set((state) => ({
        demandas: [novaDemandaCriada, ...state.demandas],
        isLoading: false
      }));
    } catch (err) {
      console.error("Falha ao criar demanda:", err);
      set({ error: 'Erro ao criar demanda', isLoading: false });
    }
  },

  // =====================================
  // ACTION: ATUALIZAR STATUS (Usa a api.updateStatus)
  // =====================================
  updateStatusDemanda: async (id, newStatus) => {
    set({ isLoading: true, error: null });
    try {
      // Chama a Fake API para atualizar o status
      const demandaAtualizada = await api.updateStatus(id, newStatus);

      // Atualiza a lista na tela
      set((state) => ({
        demandas: state.demandas.map((demanda) =>
          demanda.id === id ? demandaAtualizada : demanda
        ),
        isLoading: false
      }));
    } catch (err) {
      console.error("Falha ao atualizar status:", err);
      set({ error: 'Erro ao atualizar status', isLoading: false });
    }
  }
}));