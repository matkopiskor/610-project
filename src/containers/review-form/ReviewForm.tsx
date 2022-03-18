import { Button, Form, Input, InputNumber, Modal, Rate } from 'antd';
import { FC } from 'react';
import { useReviewContext } from '../../context/ReviewContext';
import { IReview } from '../../models/Review';
import './ReviewForm.less';

const { Item } = Form;

interface IProps {
    type: 'create' | 'edit';
    setVisible: any;
    initialValues?: IReview;
}

const getDate = (): string => {
    return new Date().toLocaleString('en-GB').substring(0, 17).replaceAll('/', '-').replace(',', '');
};

export const ReviewForm: FC<IProps> = ({ type, setVisible, initialValues }) => {
    const { createReviewAction, editReviewAction } = useReviewContext();
    const onFinish = async (values: Partial<IReview>) => {
        const review: Partial<IReview> = {
            app: values.app!,
            date_Time: getDate(),
            name: values.name!,
            rating: values.rating!,
            review: values.review!,
            thumbsUp: values.thumbsUp!,
        };
        if (type === 'create') {
            createReviewAction(review);
        } else {
            review.id = initialValues?.id;
            editReviewAction(review);
        }
        setVisible(false);
    };
    return (
        <Modal
            title={type === 'create' ? 'Create' : 'Edit'}
            visible={true}
            footer={null}
            onCancel={() => setVisible(false)}
        >
            <Form name="review-form" onFinish={onFinish} initialValues={initialValues}>
                <Item name="name" label="Name" rules={[{ required: true, message: 'Required' }]}>
                    <Input />
                </Item>
                <Item name="review" label="Review" rules={[{ required: true, message: 'Required' }]}>
                    <Input />
                </Item>
                <Item name="app" label="App" rules={[{ required: true, message: 'Required' }]}>
                    <Input />
                </Item>
                <Item name="rating" label="Rating" rules={[{ required: true, message: 'Required' }]}>
                    <Rate />
                </Item>
                <Item name="thumbsUp" label="Thumbs Up" rules={[{ required: true, message: 'Required' }]}>
                    <InputNumber min={0} />
                </Item>
                <div className="form-actions">
                    <Button htmlType="button" onClick={() => setVisible(false)}>
                        Cancel
                    </Button>
                    <Button htmlType="submit">Save</Button>
                </div>
            </Form>
        </Modal>
    );
};
