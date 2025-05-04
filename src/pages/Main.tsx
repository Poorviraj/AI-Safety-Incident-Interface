import React, { useState } from 'react';
import AddIncident from '../components/AddIncident';
import DisplayData from '../components/DisplayData';
import incidentData, { Incident } from '../data/incident';

const Main: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(incidentData);

  const handleAdd = (newIncident: Incident) => {
    setIncidents(prev => [...prev, newIncident]);
  };

  return (
    <div className='flex flex-col justify-center bg-[#E6F4FE]'>
      <AddIncident onAdd={handleAdd} incidents={incidents} />
      <DisplayData incidents={incidents} />
    </div>
  );
};

export default Main;
