import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {StarWarsService} from "./src/application/services/star-wars.service";

const starWarsService = new StarWarsService();

export const getStarWarsPeople = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const response = await starWarsService.getPeople();
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        }
    } catch (e: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: e.message,
            }),
        }
    }

}