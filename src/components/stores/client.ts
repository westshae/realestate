import { create } from 'zustand'

interface ClientState {
  _clientId: number | null
  _orderId: number
  _orderStage: number
  machineId: number | null
  machineLat: number | null
  machineLong: number | null
  machineName: string | null
  machineVersion: string | null
  clientId: number | null
  orderId: number
  orderStage: number
  getOrGenerateClientId: () => number
  setOrderId: (id: number) => void
  setOrderStage: (stage: number) => void
  setMachine: (machine: {
    id: number,
    lat: number,
    long: number,
    name: string,
    version: string
  }) => void
}

export const useClientStore = create<ClientState>((set, get) => ({
  _clientId: null,
  _orderId: 0,
  _orderStage: 0,
  clientId: null,
  orderId: 0,
  orderStage: 0,
  machineId: null,
  machineLat: null,
  machineLong: null,
  machineName: null,
  machineVersion: null,
  getOrGenerateClientId: () => {
    const currentId = get().clientId;
    if (currentId !== null) return currentId;
    const newId = Math.floor(Math.random() * 100000000);
    set({ clientId: newId });
    return newId;
  },
  setOrderId: (id: number) => set({ orderId: id }),
  setOrderStage: (stage: number) => set({ orderStage: stage }),
  setMachine: (machine) => set({
    machineId: machine.id,
    machineLat: machine.lat,
    machineLong: machine.long,
    machineName: machine.name,
    machineVersion: machine.version
  })
}))
