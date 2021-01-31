class priorityQueue{
    constructor(){
        this.arr=[];
    }
    heapifyUp(index){

        if (index===0)
            return;

        const parentIndex=Math.floor((index-1)/2);
        const parentNode=this.arr[parentIndex];
        const currNode=this.arr[index];

        if (currNode[0]<parentNode[0]){
            this.arr[parentIndex]=currNode;
            this.arr[index]=parentNode;
            this.heapifyUp(parentIndex);
        }
    }
    heapifyDown(index){
        const curr=this.arr[index];
        const arrLength=this.arr.length;
        const leftChild=(2*index+1 < arrLength)?this.arr[2*index+1]:-1;
        const rightChild=(2*index+2 < arrLength)?this.arr[2*index+2]:-1;

        //no children
        if (leftChild===-1){
            return;
        }//one child, sorted 
        else if (curr[0]<leftChild[0] && rightChild===-1){
            return;
        }//two children, sorted
        else if (curr[0]<leftChild[0] && curr[0]<rightChild[0]){
            return;
        }

        //deciding which of the remaining child (or children) is the smaller for a swap
        var smallerChild=0;
        var smallerIndex=0;
        if (rightChild===-1){
            smallerChild=leftChild;
            smallerIndex=2*index+1;
        }else{
            smallerChild=(leftChild[0]>rightChild[0])?rightChild:leftChild;
            smallerIndex=(leftChild[0]>rightChild[0])?(2*index+2):(2*index+1);
        }

        this.arr[index]=smallerChild;
        this.arr[smallerIndex]=curr;

        this.heapifyDown(smallerIndex);
    }
    push(data){
        this.arr.push(data);
        this.heapifyUp(this.arr.length-1);
    }
    pop(){
        const lastNode=this.arr.pop();
        if (this.arr.length===0)
            return;
            
        this.arr[0]=lastNode;
        this.heapifyDown(0);
    }
    top(){
        return this.arr[0];
    }
    empty(){
        return (this.arr.length===0)?true:false;
    }
    size(){
        return this.arr.length;
    }
    cleanQueue(){
        this.arr=[];
    }
}

export default priorityQueue