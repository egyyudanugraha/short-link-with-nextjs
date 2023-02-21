'use client';
import { useState, useEffect } from 'react';
import { Typography } from '../../components';

const getDestination = async (short) => {
  const res = await fetch(`/api/go/${short}`)

  return await res.json();
}

function Page({ params: { short }}) {
  const [error, setError] = useState(false);
  const [destination, setDestination] = useState();
  const [count, setCount] = useState(3);
  getDestination(short).then(link => {
    if(!link.data.destination){
      setError(true);
    }

    setDestination(link.data.destination);
  });

  useEffect(() => {
    const counter = setTimeout(() => {
      if(count === 0){
        window.location.href = destination;
        return;
      }
      setCount(prev => prev - 1);
    }, 1000);

    if(error) {
      clearTimeout(counter);
    }

    return () => clearTimeout(counter)
  }, [count])

  if (error) {
    return (
      <span className="grid h-screen place-content-center justify-items-center">
        <span className="grid justify-items-center">
          Link tidak ditemukan! 
        </span>
      </span>
    )
  }

  if (destination){
    return (
      <span className="grid h-screen place-content-center justify-items-center">
        <span className="grid justify-items-center">
          In {count} you will redirect to{' '}
          <Typography className="hover:underline" color="blue" as="a" href={destination}>
            {destination}
          </Typography> 
        </span>
      </span>
    )
  };

  return (
    <span className="grid h-screen place-content-center justify-items-center">
      <span className="grid justify-items-center">
        Getting link... 
      </span>
    </span>
  )
}

export default Page;