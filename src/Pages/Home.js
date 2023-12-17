import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://number-plate-31b93-default-rtdb.firebaseio.com/riders.json', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                const responseData = await response.json();
                if (Array.isArray(responseData)) {
                    setData(responseData);
                } else {
                    const dataArray = Object.keys(responseData).map(key => responseData[key]);
                    setData(dataArray);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // const handleDelete = (index) => {
    //     const newData = [...data];
    //     newData.splice(index, 1);
    //     setData(newData);
    // };

    // const handleSearch = (event) => {
    //     setSearchTerm(event.target.value);
    // };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phoneNumber.includes(searchTerm) ||
        item.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="bg-gray-600 text-white min-h-screen">
            <div className="p-8">
                <div className='text-center py-5 text-lg flex justify-around gap-10 '>
                    <div className='bg-gray-800 w-full h-40 rounded-xl'>
                        <div className='flex p-2 flex-col'>
                            <div className='text-left'>
                                Total Riders
                            </div>
                            <div className='text-7xl'>
                                547
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-800 w-full h-40 rounded-xl'>
                        <div className='flex p-2 flex-col'>
                            <div className='text-left'>
                                Total Alert ( last 24 hrs )
                            </div>
                            <div className='text-7xl'>
                                20
                            </div>
                        </div>
                    </div>
                    {/* <div className='bg-gray-800 w-full h-40 rounded-xl'>
                        <div className='flex p-2 flex-col'>
                            <div className='text-left'>
                                Fine Collected
                            </div>
                            <div className='text-7xl'>
                                ₹ 9,070
                            </div>
                        </div>
                    </div> */}
                    <div className='bg-gray-800 w-full h-40 rounded-xl'>
                        <div className='flex p-2 flex-col'>
                            <div className='text-left'>
                                Total Alert
                            </div>
                            <div className='text-7xl'>
                                754
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto shadow-md rounded-lg bg-gray-800 p-4">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Vehicle Type

                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Vehicle Number

                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Student ID

                                    </div>
                                </th>

                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(filteredData) && filteredData.map((item, index) => (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.name}
                                    </th>
                                    <td class="px-6 py-4">
                                        {item.vehicleType}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.vehicleNumber}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.rollNumber}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home