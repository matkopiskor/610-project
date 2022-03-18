import ReactDOM from 'react-dom';
import { App } from './App';
import ReviewContextProvider from './context/ReviewContext';

ReactDOM.render(
    <ReviewContextProvider>
        <App />
    </ReviewContextProvider>,
    document.getElementById('root')
);
