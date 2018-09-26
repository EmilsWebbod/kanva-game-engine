import { interval, Observable } from 'rxjs';
import Animated from '../components/Animated';
import settings from './settings';

let instance: Animation;

export default class Animation {
  
  public interval$: Observable<number>;
  
  private objects: Animated[] = [];
  
  constructor (animationObject?: Animated) {
    if (instance) {
      if (animationObject) {
        instance.add( animationObject );
      }
      
      return instance;
    }
    instance = this;
    if (animationObject) {
      instance.add( animationObject );
    }
    instance.update();
    return instance;
  }
  
  public add (animated: Animated) {
    this.objects.push( animated );
  }
  
  public remove (animated: Animated) {
    const index = this.objects.findIndex( x => x.id === animated.id );
    if (index > -1) {
      this.objects.splice( index, 1 );
    }
  }

  private update () {
    this.interval$ = interval( settings.updateTime );
    this.interval$.subscribe( frameNumber => {
      this.objects.forEach( x => {
        x.update(frameNumber)
      } );
    } )
  }
}
