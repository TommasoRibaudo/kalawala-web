import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/style.css'
import '../src/styles/bootstrap.min.css'
import '../src/styles/_mixins.scss'
import '../src/styles/_typography.scss'
import '../src/styles/_variables.scss'
import '../src/styles/scss/_color.scss'
import '../src/styles/scss/_common.scss'
import '../src/styles/scss/_mixins.scss'
import '../src/styles/scss/_variables.scss'
import '../src/styles/scss/style.scss'

import '../src/styles/scss/templates/_about_us.scss'
import '../src/styles/scss/templates/_backgrounds.scss'
import '../src/styles/scss/templates/_blog.scss'
import '../src/styles/scss/templates/_call-to-action.scss'
import '../src/styles/scss/templates/_contact.scss'

import '../src/styles/scss/templates/_counter.scss'
import '../src/styles/scss/templates/_footer.scss'
import '../src/styles/scss/templates/_header.scss'
import '../src/styles/scss/templates/_hero-area.scss'
import '../src/styles/scss/templates/_navigation.scss'
import '../src/styles/scss/templates/_portfolio.scss'
import '../src/styles/scss/templates/_pricing.scss'

import '../src/styles/scss/templates/_services.scss'
import '../src/styles/scss/templates/_single-post.scss'
import '../src/styles/scss/templates/_skills.scss'
import '../src/styles/scss/templates/_team.scss'
import '../src/styles/scss/templates/_testimonials.scss'
import '../src/styles/scss/templates/_typography.scss'

import './styles/maps/style.css.map'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
