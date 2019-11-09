import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// Components
// import Join from './components/Join/Join'
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    <BrowserRouter>
        <Route path='/' exact component={Join} />
        <Route path='/chat' exact component={Chat} />
    </BrowserRouter>
)


export default App;