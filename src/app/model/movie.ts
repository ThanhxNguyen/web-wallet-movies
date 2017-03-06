export class Movie {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    status: string;
    voteAverage: number;
    posterPath: string;
    genres: Array<string>;
    budget: number;
    productionCountries: Array<string>;
    productionCompanies: Array<string>;
    revenue: number;
    runtime: number;
}