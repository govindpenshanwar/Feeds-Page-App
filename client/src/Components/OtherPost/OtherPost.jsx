import axios from 'axios';
import React, { useEffect, useState } from 'react'

function OtherPost() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = await axios.get('http://localhost:4000/otherPost');
                const res = api.data;
                console.log("Other Posts => ", res);
                setData(res.message)

            } catch (error) {
                console.error("Err at other post page => ", error.message);
            }
        }
        fetchData();
    }, [])
    return (
        <div className='mt-20'>
            {data.map((item) => (
                <ul
                    className='text-lg font-semibold flex flex-col mb-5 text-center '
                    key={item.id}>
                    <li>{item.post}</li>
                    <li>Created by : {item.username}</li>
                </ul>
            ))}

        </div>
    )
}

export default OtherPost
