import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  MeshDepthMaterial,
  SphereGeometry
} from 'three';

const createCube = (width, height, depth, position, color) => {
  const material = new MeshDepthMaterial({ color });
  const geometry = new BoxGeometry(width, height, depth);
  const cube = new Mesh(geometry, material);
  cube.position.z = position.z;
  cube.position.x = position.x;

  return cube;
};

const createSphere = (
  radius,
  widthSegments,
  heightSegments,
  position,
  color
) => {
  const material = new MeshDepthMaterial({ color });
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const sphere = new Mesh(geometry, material);
  sphere.position.z = position.z;
  sphere.position.x = position.x;
  return sphere;
};

const init = (objects, position) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0xffffff);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.z = position.z;
  Object.entries(objects).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });
  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return { renderer, scene, camera };
};

export { init, createSphere, createCube };
