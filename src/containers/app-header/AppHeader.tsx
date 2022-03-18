import { FC, useState } from 'react';
import { Typography } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { ReviewForm } from '../review-form';

import './AppHeader.less';

const { Title } = Typography;

const AppHeader: FC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
            <div className="app-header">
                <Title className="title">Dating Reviews App</Title>
                <PlusSquareOutlined className="icon" onClick={() => setVisible(true)} />
            </div>
            {visible && <ReviewForm type="create" setVisible={setVisible} />}
        </>
    );
};

export { AppHeader };
