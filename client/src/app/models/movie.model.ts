export class Movie {
    public _id: string;
    public title: string;
    public description: string;
    public imagePath: string;
    public year: number;
    public director: string[];
    public actors: string[];
    public geners: string[];
    public area: string;
    public length: number;
    public rating: number;

<<<<<<< HEAD

    constructor(id: string, title:string, desc: string, imagePath: string, year:number,
                director: string, actors:string[], gener:string, area:string, length:number, rating: number){
=======
    
    constructor(id: string, title:string, desc: string, imagePath: string, year:number, 
                director: string[], actors:string[], gener:string[], area:string, length:number, rating: number){
>>>>>>> a7bb004ad4c3905a3203655f1847a6770b7199ef
        this._id = id;
        this.title = title;
        this.description = desc;
        this.imagePath = imagePath;
        this.year = year;
        this.director = director;
        this.actors = actors;
        this.geners = gener;
        this.area = area;
        this.length = length;
        this.rating = rating;
    }
}