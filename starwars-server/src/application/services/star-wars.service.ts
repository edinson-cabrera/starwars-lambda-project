import starWarsData from "../data/star-wars.data";
import {GetPeopleResponse} from "../responses/get-people.response";

export class StarWarsService {
    constructor() {}

    async getPeople() {
        const {results} = await starWarsData.getPeople()
        return results.map(
            (data) => {
                return new GetPeopleResponse(
                    data.name,
                    data.height,
                    data.mass,
                    data.hair_color,
                    data.skin_color,
                    data.eye_color,
                    data.birth_year,
                    data.gender,
                    data.homeworld,
                    data.films,
                    data.species,
                    data.vehicles,
                    data.starships,
                    data.created,
                    data.edited,
                    data.url
                );
            }
        )
    }
}