export default class Food{

    constructor(gridSize){
        this.gridSize = gridSize;
        this.randomize();
    }

    randomize(){

        this.x =
            Math.floor(
                Math.random() *
                this.gridSize
            );

        this.y =
            Math.floor(
                Math.random() *
                this.gridSize
            );
    }
}