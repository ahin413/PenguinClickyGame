
import React from 'react';
import './style.css';
import Penguins from '../Penguins';


const Container = props => (
  
  <div
    className={
      props.shake
        ? 'container d-flex flex-wrap justify-content-center shake'
        : 'container d-flex flex-wrap justify-content-center'
    }
  >
    {props.Penguins.map((a, i) => <Penguins name={a} key={i} clickEvent={props.clickEvent} />)}
  </div>
);

export default Container;