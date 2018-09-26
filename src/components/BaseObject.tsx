import * as React from 'react';
import * as v4 from 'uuid/v4';
import { calculateCenter } from '../utils/math';

interface IBaseObject {
  id: string;
}

export interface IBaseObjectProps {
  color: string;
  height: number;
  width: number;
  x: number;
  y: number;
  onClick?: () => void;
}

export interface IBaseObjectState {
  x: number;
  y: number;
  center: {
    x: number;
    y: number;
  };
  id: string;
}

export default abstract class BaseObject<T = {}, U = {}> extends React.Component<T & IBaseObjectProps, U & IBaseObjectState> implements IBaseObject {
  public static defaultProps = {
    color:  'black',
    height: 50,
    width:  50,
    x:      0,
    y:      0
  };

  public static defaultState<T, U>(props: IBaseObjectProps): any {
    return {
      center: calculateCenter(props.x, props.y, props.height, props.width),
      id:     v4(),
      x:      props.x,
      y:      props.y
    }
  };

  public id: string = v4();

  public state = BaseObject.defaultState(this.props);
}