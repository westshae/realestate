import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/ui/compound/Map'), { ssr: false });

const LocationPage: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Map />
    </div>
  );
};

export default LocationPage;
