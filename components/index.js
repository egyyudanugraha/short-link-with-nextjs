'use client';
import { Card, CardBody, CardFooter, CardHeader, Input, Typography, Button } from '@material-tailwind/react';

function ButtonWithClipboard({ link }) {
  function copyLink(e) {
    e.target.textContent = 'Copied!';
    navigator.clipboard.writeText(link);
  }
  return (
    <Button variant="filled" color="teal" onClick={(e) => copyLink(e)} onMouseLeave={(e) => (e.target.textContent = 'Copy this link!')} fullWidth>
      Copy this link!
    </Button>
  );
}
export { Card, CardBody, CardFooter, CardHeader, Input, Typography, Button, ButtonWithClipboard };
