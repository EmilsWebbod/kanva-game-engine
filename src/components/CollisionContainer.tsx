import * as React from 'react';
import { Layer } from 'react-konva';
import { Subscription } from 'rxjs';
import * as v4 from 'uuid/v4';
import Animation from '../utils/Animation';
import { getRandomDelay } from '../utils/random';
import BaseComponent from './BaseComponent';
import Collidable from './Collidable';
import MovingObject from './MovingObject';

interface IProps {
  x: number;
  startComponent: React.ReactElement<BaseComponent>;
}

interface IState {
  clickComponent: BaseComponent;
  components: Array<React.ReactElement<typeof Collidable>>;
  refs: any[];
  renderFrame: number;
}

export default class CollisionContainer extends React.Component<IProps, IState> {
  
  public state = {
    clickComponent: React.cloneElement(this.props.startComponent, {
      // @ts-ignore
      onClick: this.handleOnClick.bind(this)
    }),
    components: new Array(),
    refs: new Array(),
    renderFrame: 0
  };
  
  private randomSpawn: Subscription;
  private animation: Animation;
  
  constructor(props: IProps) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnDestroy = this.handleOnDestroy.bind(this);
    this.animation = new Animation();
    this.animation.interval$.subscribe(x => {
      this.setState({
        renderFrame: x
      });
    })
  }
  
  public componentDidMount() {
    this.spawnBox().then();
  }
  
  public componentWillUnmount() {
    if (this.randomSpawn) {
      this.randomSpawn.unsubscribe();
    }
  }
  
  public render() {
    return (
      <Layer>
        {this.state.clickComponent}
        {this.state.components.map(components => React.cloneElement(components, { renderFrame: this.state.renderFrame }))}
      </Layer>
    )
  }
  
  private async spawnBox() {
    const { x } = this.props;
    const { components, renderFrame } = this.state;
    this.randomSpawn = getRandomDelay().subscribe(async () => {
      const component: any = await React.cloneElement(<MovingObject
        renderFrame={renderFrame}
        key={ v4() }
        ref={r => {
          if (r) {
            const refs = this.state.refs;
            refs.push(r);
            this.setState({ refs });
          }
        }}
        x={ x }
        y={ 0 }
        color="red"
        yAnimation={ 3 }
        onClick={this.handleOnClick}
        onDestroy={this.handleOnDestroy}
      />);

      components.push(component);

      this.setState({
        components
      })
    });
  }
  
  private handleOnClick() {
    const { components, refs } = this.state;
    const collision = components.findIndex((component, i) => this.checkCollision(refs[i]));
    if (collision > -1) {
      this.destroy(collision);
    }
  }
  
  private checkCollision(ref: Collidable): boolean {
    const { clickComponent: { props: { x, y, width, height }} } = this.state;
    return ref.checkCollision(x, y, width, height);
  }
  
  private async destroy(index: number) {
    const { components, refs } = this.state;
    
    components.splice(index, 1);
    refs.splice(index, 1);
    
    await this.setState({
      components,
      refs
    });
  }
  
  private handleOnDestroy(id: string) {
    const { refs } = this.state;
    const index = refs.findIndex(ref => {
        return ref.state.id === id
      }
    );
    if (index > -1) {
      this.destroy(index);
    }
  }
}