import { APIGatewayProxyEvent } from 'aws-lambda';
import { hello, getStarWarsPeople } from './handler';
import starWarsService from './src/application/services/star-wars.service';

jest.mock('./src/application/services/star-wars.service');

describe('Handler Tests', () => {
    it('should return a successful response for hello', async () => {
        const event = {} as APIGatewayProxyEvent;
        const result = await hello(event);
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).message).toBe("Go Serverless v4! Your function executed successfully!");
    });

    it('should return a successful response for getStarWarsPeople', async () => {
        const event = {} as APIGatewayProxyEvent;
        (starWarsService.getPeople as jest.Mock).mockResolvedValue([{ name: 'Luke Skywalker' }]);
        const result = await getStarWarsPeople(event);
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toEqual([{ name: 'Luke Skywalker' }]);
    });

    it('should handle errors in getStarWarsPeople', async () => {
        const event = {} as APIGatewayProxyEvent;
        (starWarsService.getPeople as jest.Mock).mockRejectedValue(new Error('Service error'));
        const result = await getStarWarsPeople(event);
        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.body).message).toBe('Service error');
    });
});