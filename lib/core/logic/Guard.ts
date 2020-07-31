
export class Guard {

    static againstInvalidTimestamp(timestamp?: number){
        if(!timestamp || ((new Date(timestamp)).getTime() <= 0)){
            throw new Error("Invalid timestamp: "+timestamp);
        }
    }

    static againstEmptyOrNoneArrays(arr?: any[]){
        if(!Array.isArray(arr)){
            throw new Error("Value is not an array: "+arr);
        }
        if(arr.length === 0){
            throw new Error("Array is empty but should not be");
        }
    }
}