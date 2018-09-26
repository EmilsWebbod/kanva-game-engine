import * as React from 'react';
import { FastLayer, Rect, Text } from 'react-konva';
import settings, { calculateXDistanceFromScreenWidth } from '../utils/settings';
import CollisionContainer from './CollisionContainer';

interface IState {
  points: number;
}

const margin = calculateXDistanceFromScreenWidth(5);

const calculateDistance = (n: number) => (m: number) => n * m + (15 * (m + 1 - m));

export default class GameBoard extends React.Component<object, IState> {

  public state = {
    points:    0,
    xDistance: margin
  };

  constructor(props: object) {
    super(props);
    this.handleClickSuccess = this.handleClickSuccess.bind(this);
  }

  public render() {
    const { points, xDistance } = this.state;
    const getDistance = calculateDistance(xDistance);
    return (
      <React.Fragment>
        <CollisionContainer x={getDistance(0)} onClickSuccess={this.handleClickSuccess}/>
        <CollisionContainer x={getDistance(1)} onClickSuccess={this.handleClickSuccess}/>
        <CollisionContainer x={getDistance(2)} onClickSuccess={this.handleClickSuccess}/>
        <CollisionContainer x={getDistance(3)} onClickSuccess={this.handleClickSuccess}/>
        <CollisionContainer x={getDistance(4)} onClickSuccess={this.handleClickSuccess}/>
        <FastLayer>
          <Rect
            x={0}
            y={0}
            width={settings.width}
            height={50}
            fill="red"
          />
          <Text text={`Points: ${points}`}/>
        </FastLayer>
      </React.Fragment>
    );
  }

  private handleClickSuccess(points: number) {
    this.setState({
      points: this.state.points + points
    });
  }
}
