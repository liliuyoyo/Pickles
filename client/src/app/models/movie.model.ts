export class Movie {
    public title: string;
    public description: string;
    public imagePath: string;
    public year: number;
    public director: string;
    public actors: string[];
    public gener: string;
    public area: string;
    public length: number;
    public rating: number;

    
    constructor(title:string, desc: string, imagePath: string, year:number, 
                director: string, actors:string[], gener:string, area:string, length:number, rating: number){
        this.title = title;
        this.description = desc;
        this.imagePath = imagePath;
        this.year = year;
        this.director = director;
        this.actors = actors;
        this.gener = gener;
        this.area = area;
        this.length = length;
        this.rating = rating;
    }
}