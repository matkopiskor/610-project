import axios from 'axios';
import { IReview, IReviewsResponse } from '../models/Review';

const BASE_URL = 'http://localhost:8080/review';

export const getAllReviews = async (page: number, size: number): Promise<IReviewsResponse> => {
    try {
        const response = await axios.get<IReviewsResponse>(BASE_URL + '/all?page=' + page + '&size=' + size);
        return response.data;
    } catch (error) {
        return { review: [], totalSize: 0 };
    }
};

export const getAllFilteredReviews = async (page: number, size: number, filter: string): Promise<IReviewsResponse> => {
    try {
        const response = await axios.get<IReviewsResponse>(
            BASE_URL + '/pattern/' + filter + '?page=' + page + '&size=' + size
        );
        return response.data;
    } catch (error) {
        return { review: [], totalSize: 0 };
    }
};

export const createReview = async (review: Partial<IReview>): Promise<IReview | null> => {
    try {
        const response = await axios.post<IReview>(BASE_URL + '/new', review);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const editReview = async (review: Partial<IReview>): Promise<IReview | null> => {
    try {
        const response = await axios.put<IReview>(BASE_URL + '/update/' + review.id!, review);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const deleteReview = async (id: string): Promise<boolean> => {
    try {
        await axios.delete<IReview>(BASE_URL + '/delete/' + id);
        return true;
    } catch (error) {
        return false;
    }
};
