import { useSelector } from 'react-redux';
import { Detail } from '../pages/Detail';

import { Index } from '../pages/Index';
import { selectPager } from '../redux/modules/currentPage';
import { ResetStyle } from '../styles/reset';

export function App() {
  const currentPage = useSelector(selectPager);

  return (
    <main className="App">
      <ResetStyle />
      {currentPage === 'index' ? <Index /> : <Detail />}
    </main>
  );
}
