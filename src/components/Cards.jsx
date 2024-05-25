import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardSubtitle, Button } from 'reactstrap';
import '../sources/MainPage.css'

const CardComponent = () => {
  return (
    
    <Card className='cardItem' body style={{ maxWidth: '300px', margin: 'auto' }}> <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5"> Card title </CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6"> Card subtitle </CardSubtitle>
        <CardText>
         text example build 
        </CardText>
        <Button className='buttonCard'> Button </Button>
      </CardBody>
    </Card>

  );
}

export default CardComponent;