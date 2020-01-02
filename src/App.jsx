import React from 'react';
import { init, createSphere, createCube } from './utils/utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ADD: 0.02,
      renderer: null,
      scene: null,
      camera: null,
      cube: null,
      sphere: null
    };
  }

  componentDidMount = () => {
    // const objects = createGeometry(5, 5, 5, 0xc9b92b, 0xff0040);
    const cube = createCube(3, 2, 4, { z: -10, x: -5 }, 0xc9b92b);
    const sphere = createSphere(3, 30, 30, { z: 0, x: 5 }, 0xff0040);

    const start = init({ cube, sphere }, { z: 15 });
    const viewer = document.getElementById('viewer');
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera } = start;
    this.setState({
      renderer,
      scene,
      camera,
      cube,
      sphere
    });
    this.mainLoop();
  };

  mainLoop = () => {
    const { ADD, scene, camera, renderer, cube, sphere } = this.state;
    if (
      scene !== null &&
      camera !== null &&
      renderer !== null &&
      cube !== null &&
      sphere !== null
    ) {
      cube.position.z += ADD;
      sphere.position.z -= ADD;
      if (cube.position.z > 6 || cube.position.z < -16) {
        this.setState({
          ADD: ADD * -1
        });
      }
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  body = () => <div id="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
