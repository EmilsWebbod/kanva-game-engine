import * as React from 'react';
import { Circle } from 'react-konva';
import * as v4 from 'uuid/v4';
import { ICenter } from '../interfaces/shapes';
import { calculateCenter, calculateRadius } from './math';
import settings from './settings';

interface ICollidable {
  update: () => void;
  render: () => React.ReactNode;
  isOutOfBounds: () => boolean;
  checkCollision: (x: number, y: number, w: number, h: number) => boolean;
}

export default class Collidable implements ICollidable {

  private center: ICenter;
  private radius: number;

  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
    private fill: string = 'black',
    private id: string = v4()
  ) {
    this.center = calculateCenter(x, y, width, height);
    this.radius = calculateRadius(x, y, width, height);
  }

  public update() {
    this.y += 5;
  }

  public render() {
    const { id, x, y, height, width, fill } = this;
    return (
      <Circle
        key={id}
        x={x + (width / 2)}
        y={y}
        fill={fill}
        radius={height / 2}
      />
    )
  }

  public isOutOfBounds() {
    return settings.height < this.y;
  }

  public checkCollision(x: number, y: number, w: number, h: number) {
    return this.x < x + w &&
      this.x + this.width > x &&
      this.y < y + h &&
      this.height + this.y > y;
  }

  public getCenter() {
    this.center = calculateCenter(this.x, this.y, this.width, this.height);
  }

  public calculateScore(center: ICenter) {
    this.getCenter();
    const scoreX = Math.abs(center.x - this.center.x);
    const scoreY = Math.abs(center.y - this.center.y);
    return Math.abs((this.radius * 2) - (scoreX + scoreY));
  }
}
