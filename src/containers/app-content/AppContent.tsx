import { Button, Col, Input, Pagination, Row } from 'antd';
import { ChangeEvent, FC, useState } from 'react';
import { Review } from '../../components';
import { useReviewContext } from '../../context/ReviewContext';
import './AppContent.less';

const AppContent: FC = () => {
    const { data, total, size, page, updateFilter, changePage, setDataSize } = useReviewContext();
    const [localFilter, setLocalFilter] = useState<string>('');

    return (
        <div className="app-content">
            <Row gutter={[0, 20]}>
                <Col span={24}>
                    <div className="flex">
                        <Input
                            value={localFilter}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setLocalFilter(e.target.value);
                            }}
                            className="filter"
                        />
                        <Button
                            onClick={() => {
                                updateFilter(localFilter);
                            }}
                        >
                            Filter by review
                        </Button>
                    </div>
                </Col>
                <Col span={24}>
                    <div className="flex">
                        <Pagination
                            onChange={changePage}
                            onShowSizeChange={(_, value: number) => setDataSize(value)}
                            current={page}
                            pageSize={size}
                            total={total}
                        />
                    </div>
                </Col>
                <Col span={24}>
                    <Row gutter={[20, 20]}>
                        {data.map((item) => (
                            <Col key={item.id} span={24}>
                                <Review item={item} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export { AppContent };
