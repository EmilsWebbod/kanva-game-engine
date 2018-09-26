import * as React from 'react';
import { Stage } from 'react-konva';
import BaseComponent from './components/BaseComponent';
import CollisionContainer from './components/CollisionContainer';
import settings from './utils/settings';

class App extends React.Component {
  
  public render () {
    return (
      <Stage width={ settings.width } height={ settings.height }>
        <CollisionContainer x={0} startComponent={
          <BaseComponent x={ 0 } y={ settings.height - 50 } width={50} height={50} />
        } />
        <CollisionContainer x={100} startComponent={
          <BaseComponent x={ 100 } y={ settings.height - 50 } width={50} height={50} />
        } />
        <CollisionContainer x={200} startComponent={
          <BaseComponent x={ 200 } y={ settings.height - 50 } width={50} height={50} />
        } />
        <CollisionContainer x={300} startComponent={
          <BaseComponent x={ 300 } y={ settings.height - 50 } width={50} height={50} />
        } />
        <CollisionContainer x={400} startComponent={
          <BaseComponent x={ 400 } y={ settings.height - 50 } width={50} height={50} />
        } />
      </Stage>
    );
  }
}

export default App;
