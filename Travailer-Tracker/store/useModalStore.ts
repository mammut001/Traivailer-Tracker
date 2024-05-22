import {create} from 'zustand'

type OnFocusStore = {
    onFocus: boolean,
    setOnFocus: (value: boolean) => void
}

export const useOnFocusStore = create<OnFocusStore>() ((set) => ({
    onFocus:false,
    setOnFocus: (value: boolean) => set({ onFocus: value })
}))


type validationStore = {
    validationCheck: boolean,
    setValidationCheckStatus: (input:boolean)=>void

}

export const useValidationCheckStatusStore = create<validationStore>() ((set)=>({
    validationCheck:false,
    setValidationCheckStatus:(input:boolean) => set((state) =>{
        console.log("Current State Check. is " + state.validationCheck)
        return{
            validationCheck:input
        }
    })
}))


type ModalStatusStore = {
    OnDisplay:boolean,
    updateModalStatus: (input:boolean) =>void,
    resetModalStatus: () => void,
}

export const useModalStatusStore = create<ModalStatusStore>() ((set)=> ({
    OnDisplay:false,
    updateModalStatus:(input:boolean) => set((state) => {
        console.log("Current ModalDisplay Status "+state.OnDisplay)
        return{
            OnDisplay:input
        }
    }),
    resetModalStatus: ()=> set(()=>({
        OnDisplay:false
    }))
}))

type sliderValueStore = {
    sliderValue:number[],
    updateSliderValue: (newVal: number[]) =>void


}

export const useSliderValueStore = create<sliderValueStore>() ((set)=> ({
    sliderValue:[0],
    updateSliderValue: (newVal: number[]) => set({sliderValue:newVal})
}))

