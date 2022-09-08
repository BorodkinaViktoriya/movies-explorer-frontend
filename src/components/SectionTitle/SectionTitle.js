import React from 'react';
import './SectionTitle.css'

function SectionTitle(props) {

  return (
    <p className="section__title">{props.title}</p>
  )
}

export default SectionTitle;