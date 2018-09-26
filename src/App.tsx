import * as React from 'react';
import { Stage } from 'react-konva';
import GameBoard from './components/GameBoard';
import settings from './utils/settings';

class App extends React.Component {

  public render() {
    return (
      <Stage width={settings.width} height={settings.height}>
        <GameBoard/>
      </Stage>
    );
  }
}

export default App;
