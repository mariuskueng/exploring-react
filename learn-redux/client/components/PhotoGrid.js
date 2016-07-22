import React from 'react';
import Photo from './Photo';


const PhotoGrid = (props) => (
  <div className="photo-grid">
    {props.posts.map((post, index) => <Photo key={index} index={index} post={post} {...props} />)}
  </div>
);

export default PhotoGrid;
