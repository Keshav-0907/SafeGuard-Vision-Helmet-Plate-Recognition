import React from 'react';
import { useState } from 'react';

const Addnew = () => {


    const [name, setname] = useState('');
    const [vehicleNumber, setvehicleNumber] = useState('');
    const [vehicleType, setVehicalType] = useState('');
    const [rollNumber, setrollNumber] = useState('');
    const [adminEmail, setadminEmail] = useState('')

    const data = {
        name: name,
        vehicleType: vehicleType,
        rollNumber: rollNumber,
        adminEmail: adminEmail,
        vehicleNumber: vehicleNumber
    }

    const HandlePost = async (e) => {
        e.preventDefault();

        await fetch('https://number-plate-31b93-default-rtdb.firebaseio.com/riders.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
    }
    return (
        <div className="bg-gray-600 text-white min-h-screen flex justify-center items-center">
            <div className="w-1/2 p-8">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Add a rider</h1>
                    <form onSubmit={HandlePost} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                placeholder="Enter your name"
                                className="px-4 py-2 rounded-md bg-gray-800 text-white"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="vehicleType" className="mb-1">Vehicle Type</label>
                            <select
                                id="vehicleType"
                                name="vehicleType"
                                value={vehicleType}
                                onChange={(e) => setVehicalType(e.target.value)}
                                className="px-4 py-2 rounded-md bg-gray-800 text-white"
                            >
                                <option value="">--- Select ---</option>
                                <option value="scooty">Scooty</option>
                                <option value="bike">Bike</option>
                                <option value="car">Car</option>
                                <option value="bycycle">Bycycle</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="vehicleNumber" className="mb-1">Vehicle Number</label>
                            <input
                                type="text"
                                id="vehicleNumber"
                                name="vehicleNumber"
                                value={vehicleNumber}
                                onChange={(e) => setvehicleNumber(e.target.value)}
                                placeholder="Enter vehicle number"
                                className="px-4 py-2 rounded-md bg-gray-800 text-white"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="vehicleNumber" className="mb-1">Admin Email</label>
                            <input
                                type="email"
                                id="vehicleNumber"
                                name="vehicleNumber"
                                value={adminEmail}
                                onChange={(e) => setadminEmail(e.target.value)}
                                placeholder="Enter Admin Email Number"
                                className="px-4 py-2 rounded-md bg-gray-800 text-white"
                            />
                        </div>


                        <div className="flex flex-col">
                            <label htmlFor="rollNumber" className="mb-1">Roll Number</label>
                            <input
                                type="text"
                                id="rollNumber"
                                value={rollNumber}
                                onChange={(e) => setrollNumber(e.target.value)}
                                name="rollNumber"
                                placeholder="Enter roll number"
                                className="px-4 py-2 rounded-md bg-gray-800 text-white"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Addnew;