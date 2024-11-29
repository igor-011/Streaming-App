import { BrowserRouter, Route, Routes, useLocation,Navigate} from 'react-router-dom';
import App from './App';
import AppRouter from './appRouter';
import { useAppDispatch, useAppSelector } from './store';
import { useEffect } from 'react';
import { setStackHistory } from './dataHistory';

const ParentRouter = () => {
    const dispatch = useAppDispatch()
    
    useEffect(() =>{
        console.log('the window size is this',window.history.state.idx)
        dispatch(setStackHistory(window.history.state.idx +1))
    })
  return (
    <BrowserRouter basename='Streaming-App'> 
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/*" element={<AppRouter />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
  );
};

export default ParentRouter;