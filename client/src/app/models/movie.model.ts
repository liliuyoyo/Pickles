export class Movie {
    public _id: string;
    public title: string;
    public description: string;
    public smallImagePath: string;
    public imagePath: string;
    public year: number;
    public director: string[];
    public actors: string[];
    public geners: string[];
    public area: string;
    public length: number;
    public rating: number;
    public likes: number;
    public watched: number;
    public comments: any;



    constructor(id: string, title:string, desc: string, smallImagePath:string, imagePath: string, year:number,
                director: string[], actors:string[], gener:string[], area:string, length:number, rating: number,
                likes: number, watched: number, comments:any){

        this._id = id;
        this.title = title;
        this.description = desc;
        this.smallImagePath = smallImagePath;
        this.imagePath = imagePath;
        this.year = year;
        this.director = director;
        this.actors = actors;
        this.geners = gener;
        this.area = area;
        this.length = length;
        this.rating = rating;
        this.likes = likes;
        this.watched = watched;
        this.comments = comments;
    }
}
