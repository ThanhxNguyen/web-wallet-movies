import { Genre } from './genre';

export class Movie {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    status: string;
    voteAverage: number;
    posterPath: string;
    backdropPath: string;
    genres: Array<Genre>;
    budget: number;
    productionCountries: Array<string>;
    productionCompanies: Array<string>;
    revenue: number;
    runtime: number;
}