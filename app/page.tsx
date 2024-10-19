import './globals.css';
import PlanetsList from './components/PlanetsList'

const Home: React.FC = () => {

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col flex-grow gap-8 items-center sm:items-start">
          <PlanetsList />
        </main>
      </div>
    </div>
  );
}

export default Home;