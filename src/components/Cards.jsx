import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardSubtitle, Button } from 'reactstrap';
import '../sources/MainPage.css'

const CardComponent = ({Title, subtitle,textExample}) => {
  return (
    <div className='containerCardsAll'>
      <div className='etiqueta-superior'></div>
    <Card className='cardItem' body style={{ maxWidth: '200px', margin: 'auto' }}> <img alt="Sample" src="https://picsum.photos/200/100" />
      <CardBody>
        <div className='marcoCards'>
        <CardTitle tag="h5"> {Title} </CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6"> {subtitle} </CardSubtitle>
        <CardText className='card-description'>
         {textExample} 
        </CardText>
        </div>
        <Button className='buttonCard'> Ingresar </Button>
      </CardBody>
    </Card>
    </div>

  );
}

export default CardComponent;