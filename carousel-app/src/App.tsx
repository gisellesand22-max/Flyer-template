import { Carousel } from './components/Carousel';

function App() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Image Carousel</h1>
      <div className="w-full max-w-4xl">
        <Carousel autoPlayInterval={4000} />
      </div>
    </main>
  );
}

export default App;
