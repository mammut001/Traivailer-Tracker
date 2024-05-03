import {create} from 'zustand'
type SliderStore = {
    hourRange: number[],
    setSliderVal: (start:number, end:number)=>void
}
export const useSliderStore = create<SliderStore>() ((set) => ({
    hourRange:[0.0,24],
    setSliderVal:(start:number, end:number)=> set({hourRange:[start,end]})

}))

type ModalStatusStore = {
    OnDisplay:boolean,
    updateModalStatus: () =>void
}

export const useModalStatusStore = create<ModalStatusStore>() ((set)=> ({
    OnDisplay:false,
    // updateModalStatus: () => set((state)=>({
    //     OnDisplay: !state.OnDisplay
        
    // }))
    updateModalStatus:() => set((state) => {
        console.log("Current ModalDisplay Status "+state.OnDisplay)
        return{
            OnDisplay:!state.OnDisplay
        }
    })

}))