import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function App() {

  const [data, setData] = useState([])

  const getdata = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/posts');
      setData(res.data);
    }catch(err){
      console.log9(err)
    }
  }

  useEffect(() => {
    getdata();
  })

  return (
    <div className='bg-gray-500'>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
