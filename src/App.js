import { AgeGroupPriceList } from './pages/AgeGroupPriceList';

function App() {
  const handleAgePriceChange = (result) => {
    console.log('result: ', result);
  };
  return (
    <div className='App'>
      <AgeGroupPriceList onChange={handleAgePriceChange} />
    </div>
  );
}

export default App;
