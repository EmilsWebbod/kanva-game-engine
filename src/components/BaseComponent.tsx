import * as React from 'react';
import { Rect } from 'react-konva';
import BaseObject from './BaseObject';

interface IProps {
  onClick?: () => void;
}

export default class BaseComponent extends BaseObject<IProps> {

  public render() {
    const { width, height, color, onClick } = this.props;
    const { x, y } = this.state;
    
    return (
      <Rect x={x} y={y} width={width} height={height} fill={color} onClick={onClick} />
    )
  }
}