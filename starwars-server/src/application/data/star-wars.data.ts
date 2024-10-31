import {CharacterInterface} from "../interfaces/character.interface";

class StarWarsData {
    async getPeople(): Promise<{
        count: number,
        next: string,
        previous: string,
        results: CharacterInterface[]
     }
    > {
        const response = await fetch('https://swapi.dev/api/people');
        return await response.json();
    }
}

const starWarsData = new StarWarsData();
export default starWarsData;