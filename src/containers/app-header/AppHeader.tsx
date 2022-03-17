import { FC } from 'react';
import { Typography } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

import './AppHeader.less';

const { Title } = Typography;

const AppHeader: FC = () => {
    return (
        <div className='app-header'>
            <Title className='title'>Dating Reviews App</Title>
            <PlusSquareOutlined className='icon' />
        </div>
    );
};

export { AppHeader };
