import {create} from 'zustand'

type selectedDateStore = {
    date:string,
    updateDate: (date:string) =>void
}

export const useSelectedDateStore = create<selectedDateStore>() ((set)=> ({
    date:'',
    updateDate: (newDate: string) => set({date:newDate})
}))
