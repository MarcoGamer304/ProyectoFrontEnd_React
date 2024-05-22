import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';
import '../sources/MainPage.css';

import carrousel1 from '../Assets/carrousel1.png';
import carrousel2 from '../Assets/carrousel2.png';
import carrousel3 from '../Assets/carrousel3.png';

import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, Button, Offcanvas, OffcanvasBody, OffcanvasHeader, Carousel, CarouselCaption,
  CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';

const items = [
  {
    src: carrousel1,
    altText: 'Slide 1',
    caption: 'Slide 1',
    key: 1,
  },
  {
    src: carrousel2,
    altText: 'Slide 2',
    caption: 'Slide 2',
    key: 2,
  },
  {
    src: carrousel3,
    altText: 'Slide 3',
    caption: 'Slide 3',
    key: 3,
  },
];

export default function About(args) {
  const [isOpen, setIsOpen] = useState(false);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleOffcanvas = () => setOffcanvasOpen(!offcanvasOpen);

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });


  return (

    <div className='navbarBootstrap'>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Mi Proyecto</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact">Contact</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem href="/option1">
                  Option 1
                </DropdownItem>
                <DropdownItem href="/option2">
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/reset">
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Button color="ligth" onClick={toggleOffcanvas} className="me-2">
              &#9776;
            </Button>
          </Nav>
        </Collapse>
      </Navbar>

      <Offcanvas isOpen={offcanvasOpen} toggle={toggleOffcanvas} direction="start">
        <OffcanvasHeader toggle={toggleOffcanvas}>
          Menú
        </OffcanvasHeader>
        <OffcanvasBody>
          <Nav vertical>
            <NavItem>
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact">Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/option1">Option 1</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/option2">Option 2</NavLink>
            </NavItem>
          </Nav>
        </OffcanvasBody>
      </Offcanvas>
      <div className='carrousel'>
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          {...args}
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      </div>
    </div>




  );
};

