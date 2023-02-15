



export const useStorage = (storage: string = 'local')=>{
    const sdb = storage === 'local' ? localStorage : sessionStorage
    const get = (key:string)=>{
       return sdb.getItem(key)
    }

    const set = (key:string,value:any)=>{
        sdb.setItem(key,JSON.stringify(value))

    }

   function clear(){
        sdb.clear()
    }

   function remove(key:string){
        sdb.removeItem(key)
    }

    return {
        set,
        get,
        clear,
        remove
    }
}


