import * as React from 'react';
import { Rect } from 'react-konva';
import Collidable from './Collidable';

export default class MovingObject extends Collidable {
  
  public render () {
    const { color, width, height, onClick } = this.props;
    const { x, y } = this.state;
    
    return (
      <Rect
        x={ x }
        y={ y }
        fill={ color }
        width={ width }
        height={ height }
        onClick={ onClick }
      />
    )
  }
}