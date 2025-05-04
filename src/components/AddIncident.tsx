import React, { useState } from 'react';
import { Incident } from '../data/incident';

interface Props {
    onAdd: (incident: Incident) => void;
    incidents: Incident[];
}

const AddIncident: React.FC<Props> = ({ onAdd, incidents }) => {

    const [showForm, setShowForm] = useState<boolean>(false);

    const [form, setForm] = useState<Omit<Incident, 'id'>>({
        title: '',
        description: '',
        severity: 'Low',
        date: new Date().toISOString().slice(0, 10),
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newIncident: Incident = {
            ...form,
            id: incidents.length ? incidents[incidents.length - 1].id + 1 : 1,
        };
        onAdd(newIncident);
        setForm({ title: '', description: '', severity: 'Low', date: '' });
    };

    return <div className=' ' >

        <div className=' w-[70%] mx-auto bg-white rounded-2xl ' >

            <div className=' bg-white flex mt-[20px] pt-[20px] pb-[20px] rounded-2xl w-[100%] mx-auto items-center  ' >
                <h1 className=' text-5xl ml-[30px] ' >AI Safety Incident Interface</h1>
                <button onClick={() => setShowForm(!showForm)} className=' bg-blue-500 text-white rounded-md px-4 mr-[10px] py-2 ml-auto  hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer ' >
                    {showForm ? 'Hide Form' : 'Add Incident'}
                </button>
            </div>

            {
                showForm && (
                    <form className=' w-[100%] bg-white pb-[20px] rounded-2xl mx-auto flex flex-col gap-5 items-center pt-[10px] ' onSubmit={handleSubmit} >
                        <input type="text" placeholder='Title' value={form.title} onChange={handleChange} className=' w-[80%] h-[40px] border-2 border-black rounded-md ' name='title' required />

                        <textarea placeholder='Description' value={form.description} onChange={handleChange} className=' w-[80%] h-[100px] border-2 border-black rounded-md ' name='description' required ></textarea>

                        <select value={form.severity} name="severity" onChange={handleChange} className=' w-[80%] h-[40px] border-2 border-black rounded-md ' >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        <input type="date" name='date' value={form.date} onChange={handleChange} className=' w-[80%] h-[40px] border-2 border-black rounded-md ' />

                        <button type="submit" className=' w-[80%] h-[40px] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer ' >Add Incident</button>
                    </form>
                )

            }

        </div>

    </div>
};

export default AddIncident;
