import {create} from 'zustand'

type OnFocusStore = {
    onFocus: boolean,
    setOnFocus: () => void
}

export const useOnFocusStore = create<OnFocusStore>() ((set) => ({
    onFocus:false,
    setOnFocus: ()=> set((state) =>({onFocus:!state.onFocus}))
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
    updateModalStatus: () =>void,
    resetModalStatus: () => void,
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
    }),
    resetModalStatus: ()=> set(()=>({
        OnDisplay:false
    }))
}))