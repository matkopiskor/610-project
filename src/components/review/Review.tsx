import { DeleteOutlined, EditOutlined, LikeFilled } from '@ant-design/icons';
import { Card, Col, Comment, Descriptions, Rate, Row, Tooltip } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { FC, useState } from 'react';
import { ReviewForm } from '../../containers';
import { useReviewContext } from '../../context/ReviewContext';
import { IReview } from '../../models/Review';

import './Review.less';

interface IProps {
    item: IReview;
}

export const Review: FC<IProps> = ({ item }) => {
    const { app, date_Time, id, name, rating, review, thumbsUp } = item;
    const { deleteReviewAction } = useReviewContext();
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
            <Card
                title={`Review: ${id}`}
                bordered={false}
                actions={[
                    <Tooltip title="Edit">
                        <EditOutlined key="edit" onClick={() => setVisible(true)} />
                    </Tooltip>,
                    <Tooltip title="Delete">
                        <DeleteOutlined key="delete" onClick={() => deleteReviewAction(id!)} />
                    </Tooltip>,
                ]}
            >
                <Row gutter={[20, 20]}>
                    <Col sm={12} xs={24}>
                        <Descriptions title={app}>
                            <Descriptions.Item>
                                <Comment
                                    author={name}
                                    content={review}
                                    datetime={<span>{date_Time}</span>}
                                    actions={[
                                        <div className="comment">
                                            <LikeFilled className="icon" />
                                            <span className="label">{thumbsUp}</span>
                                        </div>,
                                    ]}
                                />
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col sm={12} xs={24}>
                        <Paragraph>Rating: </Paragraph>
                        <Rate allowHalf defaultValue={rating} disabled />
                    </Col>
                </Row>
            </Card>
            {visible && <ReviewForm type="edit" setVisible={setVisible} initialValues={item} />}
        </>
    );
};
