import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import './global.css';

const rootEl = document.getElementById('app');


render(<App />, rootEl);

// if (module.hot) {
//     module.hot.accept('./containers/App', function () {
//         // Require the new version and render it instead
//         var NextApp = require('./containers/App')
//         ReactDOM.render(<NextApp />, rootEl)
//       })
// }
