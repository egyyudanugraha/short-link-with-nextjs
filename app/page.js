'use client';
import { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react';
import { ButtonWithClipboard } from '@/components';

export default function App() {
  const [data, setData] = useState('');
  const [destination, setDestination] = useState('');
  const [short, setShort] = useState('');

  const onSubmit = async () => {
    document.querySelector('#destination').setAttribute('disabled', 'disabled');
    document.querySelector('#short').setAttribute('disabled', 'disabled');
    const btnSubmit = document.querySelector('#btn-submit');
    btnSubmit.setAttribute('disabled', 'disabled');
    btnSubmit.textContent = 'Shorting...';
    const res = await fetch('/api/short', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        short,
        destination,
      }),
    });
    const resJson = await res.json();
    setData(resJson.data.short);
  };

  if(data.length > 0) {
    return (
      <div className="grid h-screen place-content-center justify-items-center">
        <Card className="w-96">
          <CardHeader variant="gradient" color="teal" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              {"Your link sorted!"}
            </Typography>
          </CardHeader>
          <CardBody>
          <Input label="Shorted link" size="lg" value={`${window.location.host}/${data}`} disabled/>
          </CardBody>
          <CardFooter className="pt-0 flex flex-col gap-2">
            <ButtonWithClipboard link={`${window.location.host}/${data}`} />
            <span className="text-xs mx-auto">
              Build by{' '}
              <a href="https://egyyudanugraha.site" target="_blank" rel="noreferrer" className="font-medium hover:underline">
                Yuda
              </a>
            </span>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid h-screen place-content-center justify-items-center">
      <form>
        <Card className="w-96">
          <CardHeader variant="gradient" color="blue" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              {"Let's short!"}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Destination ex: https://example.com" size="lg" value={destination} onChange={(e) => setDestination(e.target.value)} id="destination" minLength="4" required />
            <Input label="Short link ex: MY_LINK" size="lg" value={short} onChange={(e) => setShort(e.target.value)} id="short" minLength="4" required />
          </CardBody>
          <CardFooter className="pt-0 flex flex-col gap-2">
            <Button onClick={onSubmit} variant="gradient" id="btn-submit" fullWidth>
              Make it short!
            </Button>
            <span className="text-xs mx-auto">
              Build by{' '}
              <a href="https://egyyudanugraha.site" target="_blank" rel="noreferrer" className="font-medium hover:underline">
                Yuda
              </a>
            </span>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
