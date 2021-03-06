import { FC } from 'react';
import { Typography } from 'antd';
import './AppFooter.less';

const { Text } = Typography;

const AppFooter: FC = () => {
    return (
        <div className="app-footer">
            <Text className="text">Dating Reviews App</Text>
            <Text className="text">2022</Text>
            <Text className="text">Made by Matko Piskor and Otto Goldschmidt</Text>
        </div>
    );
};

export { AppFooter };
