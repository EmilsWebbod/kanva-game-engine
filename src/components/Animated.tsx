import Animation from '../utils/Animation';
import settings from '../utils/settings';
import BaseObject, { IBaseObjectProps, IBaseObjectState } from './BaseObject';

interface IAnimated {
  update: (renderFrame: number) => void;
  destroy: () => void;
  key?: string;
}

export interface IAnimatedProps extends IBaseObjectProps {
  xAnimation: number;
  yAnimation: number;
  onDestroy?: (id: string) => void;
  renderFrame: number;
}

interface IState extends IBaseObjectState {
  renderFrame: number;
  updated: boolean;
  shouldUpdate: boolean;
}

export default abstract class Animated extends BaseObject<IAnimatedProps, IState> implements IAnimated {
  
  public static defaultProps = {
    ...BaseObject.defaultProps,
    xAnimation: 0,
    yAnimation: 0,
  };
  
  public static getDerivedStateFromProps(props: IAnimatedProps, state: IState & IBaseObjectState) {
    if (props.renderFrame === state.renderFrame) {
      return {
        shouldUpdate: true,
        updated: false
      };
    }
    return null;
  }
  
  private animation: Animation;
  
  protected constructor (props: IAnimatedProps) {
    super( props );
    this.update = this.update.bind( this );
    this.state = {
      ...this.state,
      renderFrame: this.props.renderFrame,
      shouldUpdate: true,
      updated: false
    }
  }
  
  public shouldComponentUpdate(nextProps: IAnimatedProps, nextState: IState) {
    return nextProps.renderFrame === nextState.renderFrame;
  }
  
  public componentDidMount () {
    this.animation = new Animation( this );
  }
  
  public componentWillUnmount () {
    this.destroy();
  }
  
  public update (renderFrame: number) {
    const x = this.state.x + this.props.xAnimation;
    const y = this.state.y + this.props.yAnimation;
    if (y > settings.height) {
      this.destroy();
    } else {
      this.setState( { x, y, updated: true, shouldUpdate: false, renderFrame } );
    }
  }
  
  public destroy() {
    if (typeof this.props.onDestroy === 'function') {
      this.props.onDestroy(this.state.id);
    }
    this.animation.remove( this );
  }
}