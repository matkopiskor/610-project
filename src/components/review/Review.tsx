import { Card } from 'antd';
import { FC } from 'react';
import { IReview } from '../../models/Review';

interface IProps {
    item: IReview;
}

export const Review: FC<IProps> = ({ item }) => {
    const { app, date_Time, id, name, num, rating, review, thumbsUp } = item;
    return (
        <Card title={`Review: ${id}`} bordered={false}>
            <p>App: {app}</p>
            <p>date_Time: {date_Time}</p>
            <p>name: {name}</p>
            <p>num: {num}</p>
            <p>rating: {rating}</p>
            <p>review: {review}</p>
            <p>thumbsUp: {thumbsUp}</p>
        </Card>
    );
};
