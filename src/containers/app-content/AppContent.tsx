import { Col, Row } from 'antd';
import { FC, useCallback, useEffect, useState } from 'react';
import { getAllReviews } from '../../api/reviews';
import { Review } from '../../components';
import { IReview } from '../../models/Review';
import './AppContent.less';

const AppContent: FC = () => {
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(5);
    const [data, setData] = useState<IReview[]>([]);

    const fetchData = useCallback(async () => {
        const resp = await getAllReviews(page, size);
        setData(resp);
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="app-content">
            <Row>
                {data.map((item) => (
                    <Col span={24}>
                        <Review key={item.id} item={item} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export { AppContent };
