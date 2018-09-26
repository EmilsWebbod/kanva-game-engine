import * as React from 'react';
import { FastLayer, Layer, Rect } from 'react-konva';
import { Subscription } from 'rxjs';
import * as v4 from 'uuid/v4';
import Animation from '../utils/Animation';
import Collidable from '../utils/Collidable';
import { getRandomDelay } from '../utils/random';
import settings from '../utils/settings';
import BaseComponent from './BaseComponent';

interface IProps {
  x: number;
  onClickSuccess: (points: number) => void;
}

interface IState {
  components: Collidable[];
  renderFrame: number;
}

export default class CollisionContainer extends React.Component<IProps, IState> {

  public state = {
    components:  new Array(),
    renderFrame: 0
  };

  private randomSpawn: Subscription;
  private animation: Animation;
  private clickable: BaseComponent;

  constructor(props: IProps) {
    super(props);

    this.checkCollision = this.checkCollision.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.update = this.update.bind(this);
    this.spawnBoxes = this.spawnBoxes.bind(this);

    this.animation = new Animation();
    this.animation.interval$.subscribe(this.update)
  }

  public componentDidMount() {
    this.spawnBoxes().then();
  }

  public componentWillUnmount() {
    if (this.randomSpawn) {
      this.randomSpawn.unsubscribe();
    }
  }

  public render() {
    const { x } = this.props;
    return (
      <React.Fragment>
        <FastLayer>
          <BaseComponent
            ref={r => {
              if (r) {
                this.clickable = r;
              }
            }}
            x={x}
            y={settings.height - 50}
            width={50}
            height={50}
          />
          {this.state.components.map(
            collidable => collidable.render()
          )}
        </FastLayer>
        <Layer>
          <Rect
            x={x}
            y={settings.height - 50}
            width={50}
            height={50}
            onClick={this.handleOnClick}
          />
        </Layer>
      </React.Fragment>

    )
  }

  private update(renderFrame: number) {
    const { components } = this.state;
    this.setState({
      components: components.filter(component => {
        component.update();
        return !component.isOutOfBounds();
      })
    });
  }

  private async spawnBoxes() {
    const { x } = this.props;
    this.randomSpawn = getRandomDelay().subscribe(() => {
      const { components } = this.state;
      components.push(new Collidable(x, 0, 50, 50, 'red', v4()));
      this.setState({ components });
    });
  }

  private handleOnClick() {
    const { onClickSuccess } = this.props;
    const { components } = this.state;
    const { state: { center } } = this.clickable;
    const collision = components.findIndex(this.checkCollision);
    if (collision > -1) {
      onClickSuccess(components[collision].calculateScore(center))
      this.destroy(collision);
    }
  }

  private checkCollision(ref: Collidable): boolean {
    const { state: { x, y }, props: { width, height } } = this.clickable;
    return ref.checkCollision(x, y, width, height);
  }

  private async destroy(index: number) {
    const { components } = this.state;

    components.splice(index, 1);

    await this.setState({
      components
    });
  }
}