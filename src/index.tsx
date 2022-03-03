import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import FirebaseProvider from './contextAPI/FirebaseProvider';

ReactDOM.render(
  <FirebaseProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseProvider>,
  document.getElementById('root')
);
