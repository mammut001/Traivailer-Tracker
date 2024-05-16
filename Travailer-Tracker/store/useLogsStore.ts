import {create} from 'zustand'
export type Item = {
    date:string,
    hours:string,
    minute:string
}
type DataListStore = {
    dataList: Item[],
    addItem: (item: Item) =>void,
    deteleItem: (key:string) =>void
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
            deteleItem:(key:string) => set((state )=>{
                const updatedDataList = state.dataList.filter(item =>item.date !== key)
                console.log('After deleting an item:', updatedDataList);
                return { dataList: updatedDataList };
            }),

    cleanList: () => set(() =>({
        dataList :[]
    }))

}))
