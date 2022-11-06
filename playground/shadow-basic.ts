/**
 * @title Shadow Basic
 * @category Light
 */

import { FreeControl } from "@oasis-engine-toolkit/controls";
import {
  AmbientLight,
  AssetType,
  Camera,
  DirectLight,
  GLTFResource,
  MeshRenderer,
  Vector3,
  WebGLEngine
} from "oasis-engine";

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();

const scene = engine.sceneManager.activeScene;
scene.shadowDistance = 20;

// Create root entity
const rootEntity = scene.createRootEntity();

// Create camera entity and component
const cameraEntity = rootEntity.createChild("camera");
cameraEntity.transform.setPosition(3, 2.5, 0);
cameraEntity.transform.lookAt(new Vector3(0, 2, 0));
cameraEntity.addComponent(Camera);
cameraEntity.addComponent(FreeControl).floorMock = false;

// Create light entity and component
const lightEntity = rootEntity.createChild("light");
lightEntity.transform.setPosition(0.5, 1, 0);
lightEntity.transform.lookAt(new Vector3(0, 0, 0));
const directLight = lightEntity.addComponent(DirectLight);
directLight.enableShadow = true;


engine.resourceManager
  .load<GLTFResource>(
    "https://gw.alipayobjects.com/os/bmw-prod/ca50859b-d736-4a3e-9fc3-241b0bd2afef.gltf"
  )
  .then((gltf) => {
    const root = gltf.defaultSceneRoot;
    rootEntity.addChild(root);

    const renderers = root.getComponentsIncludeChildren(MeshRenderer, []);
    for (let i = 0; i < renderers.length; i++) {
      const renderer = renderers[i];
      renderer.receiveShadows = true;
      renderer.castShadows = true;
    }

    engine.resourceManager
      .load<AmbientLight>({
        type: AssetType.Env,
        url: "https://gw.alipayobjects.com/os/bmw-prod/09904c03-0d23-4834-aa73-64e11e2287b0.bin",
      })
      .then((ambientLight) => {
        scene.ambientLight = ambientLight;
        engine.run();
      });
  });
