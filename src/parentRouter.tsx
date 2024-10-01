import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import App from './App';
import AppRouter from './appRouter';
import { useAppDispatch, useAppSelector } from './store';
import { useEffect } from 'react';
import { setStackHistory } from './dataHistory';

const ParentRouter = () => {
    const dispatch = useAppDispatch()
    const stackhistory = useAppSelector(state => state.dataHistory.stackhistory)
    
    useEffect(() =>{
        console.log('the window size is this',window.history.state.idx)
        dispatch(setStackHistory(window.history.state.idx +1))
    })
  return (
    <BrowserRouter basename='Streaming-App'> 
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/*" element={<AppRouter />} />
        </Routes>
    </BrowserRouter>
  );
};

export default ParentRouter;