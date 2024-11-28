import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import UserView from './userView';
import ActorsPage from './actorsPage';
import MoviePages from './moviesPage';
import TvPage from './tvPage';
import { useEffect, useState, useRef } from 'react';
import { updateIndex, renderItems, unrenderItems, updateHistory, } from './dataHistory';
import { useAppDispatch, useAppSelector } from './store';

const NavigationHandler = ({ children }: { children: React.ReactNode }) => {
  const [historyIndex, setHistoryIndex] = useState(window.history.state?.idx || 0);
  const history = useAppSelector(state => state.dataHistory.historySize)
  const index = useAppSelector(state => state.dataHistory.currentIndex)
  const items = useAppSelector(state => state.dataHistory.renderItem)
  const stackhistory = useAppSelector(state => state.dataHistory.stackhistory)


  const location = useLocation(); 
  const prevHistoryIndex = useRef(historyIndex); 
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('the component mounterd')
    const handlePopState = () => {
      console.log('window size is: ', window.history.state.idx, 'stack size is: ', stackhistory)
      const currentIndex:any =   window.history.state?.idx -stackhistory -1 || 0;
    
      console.log('current index is: ',currentIndex, 'satackHistory size is: ', stackhistory)
    
      if (currentIndex > -1){
        dispatch(updateIndex(currentIndex))
        dispatch(unrenderItems())
      }
     
        if(currentIndex > history) {
          dispatch(updateHistory(currentIndex))
        } 
        else if( history > currentIndex){
          dispatch(renderItems())
        }
        else console.log('currentIndex: ', currentIndex, 'history: ', history)

       // console.log('satckvar: ',stackVar, 'currentIndex', currentIndex, 'history', history, 'items:', items)

      //console.log('prevHistoryIndex:', prevHistoryIndex.current);
      //console.log('currentIndex:', currentIndex);
      
      /*if (currentIndex < prevHistoryIndex.current) {
        handleBackNavigation(currentIndex);
      } else if (currentIndex > prevHistoryIndex.current) {
        handleForwardNavigation(currentIndex);
      }*/
      prevHistoryIndex.current = currentIndex;
    };

    setHistoryIndex(window.history.state?.idx || 0);
    prevHistoryIndex.current = window.history.state?.idx || 0;

    window.addEventListener('popstate', handlePopState); 

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [items, history, window]);

  useEffect(() => {
    setHistoryIndex(window.history.state?.idx || 0); 
  }, [location]);

  return <>{children}</>;

};

const AppRouter = () => {
  return (
  
        <NavigationHandler>
          <Routes>
            <Route path="UserView" element={<UserView />} />
            <Route path="/actors" element={<ActorsPage />} />
            <Route path="/movies" element={<MoviePages />} />
            <Route path="/tv" element={<TvPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NavigationHandler>

  );
};

export default AppRouter;