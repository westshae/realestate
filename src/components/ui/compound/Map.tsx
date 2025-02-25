import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useClientStore } from '../../stores/client';
import router from 'next/router';
import { MapPopup } from '../basic/map-popup';
import { Coffee } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

const Map = () => {
  const { setMachine } = useClientStore();
  type Machine = {
    id: number;
    lat: number;
    long: number;
    name: string;
    version: string;
  };
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  useEffect(() => {
    const map = L.map('map', {
      center: [-41.2866, 174.7756], // Wellington coordinates
      zoom: 5,
      minZoom: 5,
      maxZoom: 20,
      maxBoundsViscosity: 1.0,
      attributionControl: false,
      zoomSnap: 3,
    });


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
    }).addTo(map);

    fetch('/api/machines')
      .then(response => response.json())
      .then(machines => {
        machines.forEach((machine: { lat: number; long: number; name: string; id: number; version: string; }) => {
          const CoffeeIcon = L.divIcon({
            html: ReactDOMServer.renderToString(<Coffee className='text-accent fill-secondary' />),
            className: '',
            iconSize: [36, 36],
            iconAnchor: [0, 18]
          })

          L.marker([machine.lat, machine.long], { icon: CoffeeIcon }).addTo(map).on('click', () => { setSelectedMachine(machine) });
        });
      })
      .catch(error => console.error('Error fetching machines:', error));

    return () => {
      map.remove();
    };
  }, [setMachine]);

  const handleConfirm = () => {
    if (selectedMachine) {
      setMachine({
        id: selectedMachine.id,
        lat: selectedMachine.lat,
        long: selectedMachine.long,
        name: selectedMachine.name,
        version: selectedMachine.version
      });
      setSelectedMachine(null);
      router.push('/selection');
    }
  };

  const handleCancel = () => {
    setSelectedMachine(null);
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
      {selectedMachine && (
        <MapPopup
          machineName={selectedMachine.name}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Map;
