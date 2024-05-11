import {create} from 'zustand'
export type Item = {
    date:string,
    hours:string
}
type DataListStore = {
    dataList: Item[],
    addItem: (item: Item) =>void,
    cleanList: () =>void
}

export const useDataListStore = create<DataListStore>() ((set)=> ({
    dataList: [],
    addItem: (item:Item) => set((state) =>{
        const newDataList = [
            ...state.dataList,
            item
        ]
        console.log(newDataList)

        return {dataList:newDataList}
    }),
    cleanList: () => set(() =>({
        dataList :[]
    }))

}))
