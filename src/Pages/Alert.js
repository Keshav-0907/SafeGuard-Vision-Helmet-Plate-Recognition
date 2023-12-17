import React, { useState, useEffect } from 'react';
import AlertBox from '../Components/AlertBox';

const Alert = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://number-plate-31b93-default-rtdb.firebaseio.com/detected_things.json');

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

    return (
        <div className='h-screen w-screen bg-gray-600'>
            <div className='text-center text-white font-medium text-2xl py-2'>
                All Alerts
            </div>
            <div className='p-9 grid grid-cols-3'>
                {data.map((item, index) => (
                    <AlertBox
                        key={index}
                        vehicleNumber={item['Number Plate']}
                        date={item.Timestamp}
                        image={item.Image}
                    />
                ))}
            </div>
        </div>
    );
};

export default Alert;
