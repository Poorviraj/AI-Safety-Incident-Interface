import React, { useState } from 'react';
import { Incident } from '../data/incident';

interface DisplayDataProps {
  incidents: Incident[];
}

const DisplayData: React.FC<DisplayDataProps> = ({ incidents }) => {
  const [severityFilter, setSeverityFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [sortOrder, setSortOrder] = useState<'Newest' | 'Oldest'>('Newest');
  const [expandedIds, setExpandedIds] = useState<number[]>([]); 

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filtered = incidents.filter((incident) =>
    severityFilter === 'All' ? true : incident.severity === severityFilter
  );

  const sorted = filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'Newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className='w-full pt-5 pb-5'>
      <h1 className='text-xl font-bold text-center mb-4'>Incident Report</h1>

      {/* Filter & Sort Controls */}
      <div className='flex justify-center gap-4 mb-6'>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value as any)}
          className='border border-black p-2 rounded hover:border-blue-400 transition duration-300 ease-in-out cursor-pointer '
        >
          <option value="All">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as any)}
          className='border border-black p-2 rounded hover:border-blue-400 transition duration-300 ease-in-out cursor-pointer '
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>

      {/* Incident List */}
      <div className='w-full flex flex-col gap-5 items-center'>
        {sorted.length === 0 ? (
          <p>No incidents match your criteria.</p>
        ) : (
          sorted.map((incident) => (
            <div key={incident.id} className={`border border-gray-400 rounded-md p-4 w-[80%] transition duration-300 ease-in-out ${incident.severity === 'High' ? 'hover:border-red-500' : incident.severity === 'Medium' ? 'hover:border-yellow-500' : 'hover:border-green-500'}`}>
              <h3 className='font-bold text-lg'>{incident.title}</h3>
              <p className=' font-semibold ' >Severity: <span className='font-normal' >{incident.severity}</span></p>
              <p><span className=' font-semibold ' >Reported At:</span> {new Date(incident.date).toLocaleDateString()}</p>

              <button
                onClick={() => toggleExpand(incident.id)}
                className='border-blue-600 mt-2 cursor-pointer rounded-2xl border-2 p-1  text-blue-500  hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out'
              >
                {expandedIds.includes(incident.id) ? 'Hide Details' : 'View Details'}
              </button>

              {expandedIds.includes(incident.id) && (
                <p className='mt-2'>{incident.description}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayData;
