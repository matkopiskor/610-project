import axios from 'axios';
import { mockAll } from '../mock/mockAll';
import { IReview } from '../models/Review';

const BASE_URL = 'http://localhost:8080/review';

export const getAllReviews = async (page: number, size: number): Promise<IReview[]> => {
    try {
        const response = await axios.get<IReview[]>(BASE_URL + '/all' + '?page=' + page + '&size=' + size);
        return response.data;
    } catch (error) {
        return mockAll;
    }
};
