export default class Snake{

    constructor(){

        this.body = [
            {x:10,y:10},
            {x:9,y:10},
            {x:8,y:10}
        ];

        this.dx = 1;
        this.dy = 0;
    }

    move(){

        const head = {
            x:this.body[0].x + this.dx,
            y:this.body[0].y + this.dy
        };

        this.body.unshift(head);
    }

    removeTail(){
        this.body.pop();
    }

    grow(){
    }

    setDirection(dx,dy){

        if(
            this.dx === -dx &&
            this.dy === -dy
        ){
            return;
        }

        this.dx = dx;
        this.dy = dy;
    }
}