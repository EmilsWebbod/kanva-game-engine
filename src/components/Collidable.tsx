import Animated, { IAnimatedProps } from './Animated';

interface ICollidable {
  checkCollision: (x: number, y: number, w: number, h: number) => boolean;
  onClick?: () => void;
}

export default abstract class Collidable extends Animated implements ICollidable {
  
  protected constructor(props: IAnimatedProps) {
    super(props);
    this.checkCollision = this.checkCollision.bind(this);
  }
  
  public checkCollision (x: number, y: number, w: number, h: number) {
    return this.state.x < x + w &&
      this.state.x + this.props.width > x &&
      this.state.y < y + h &&
      this.props.height + this.state.y > y;
  }
}