import 'raf/polyfill';
import 'typeface-roboto';
import '@fortawesome/fontawesome-free/css/all.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
