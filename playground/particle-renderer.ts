/**
 * @title Particle Renderer
 * @category Particle
 */
import {
  AssetType,
  BlendMode,
  Camera,
  Color,
  ConeShape,
  Entity,
  Key,
  Logger,
  ParticleCurve,
  ParticleCurveMode,
  ParticleGradientMode,
  ParticleMaterial,
  ParticleRenderer,
  ParticleSimulationSpace,
  Texture2D,
  Vector2,
  Vector3,
  WebGLEngine,
  WebGLMode,
  ParticleScaleMode,
} from "@galacean/engine";

// Create engine
WebGLEngine.create({
  canvas: "canvas",
  graphicDeviceOptions: { webGLMode: WebGLMode.WebGL1 },
}).then((engine) => {
  Logger.enable();
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;
  const rootEntity = scene.createRootEntity();
  scene.background.solidColor = new Color(0.25, 0.25, 0.25, 1);

  // Create camera
  const cameraEntity = rootEntity.createChild("camera_entity");
  cameraEntity.transform.position = new Vector3(0, 1, 3);
  const camera = cameraEntity.addComponent(Camera);
  camera.fieldOfView = 60;

  engine.run();

  engine.resourceManager
    .load([
      {
        url: "https://mdn.alipayobjects.com/huamei_b4l2if/afts/img/A*yu-DSb0surwAAAAAAAAAAAAADil6AQ/original",
        type: AssetType.Texture2D,
      },
      {
        url: " https://mdn.alipayobjects.com/huamei_b4l2if/afts/img/A*JlayRa2WltYAAAAAAAAAAAAADil6AQ/original",
        type: AssetType.Texture2D,
      },
      {
        url: "https://mdn.alipayobjects.com/huamei_b4l2if/afts/img/A*cFafRr6WaWUAAAAAAAAAAAAADil6AQ/original",
        type: AssetType.Texture2D,
      },
    ])
    .then((textures) => {
      const fireEntity = createFireParticle(rootEntity, <Texture2D>textures[0]);
      createFireGlowParticle(fireEntity, <Texture2D>textures[1]);
      createFireSmokeParticle(fireEntity, <Texture2D>textures[2]);
    });
});

function createFireParticle(rootEntity: Entity, texture: Texture2D): Entity {
  const particleEntity = rootEntity.createChild("Fire");
  particleEntity.transform.scale.set(1.268892, 1.268892, 1.268892);
  particleEntity.transform.rotate(90, 0, 0);

  const particleRenderer = particleEntity.addComponent(ParticleRenderer);

  const material = new ParticleMaterial(rootEntity.engine);
  material.baseColor = new Color(1.0, 1.0, 1.0, 1.0);
  material.blendMode = BlendMode.Additive;
  material.baseTexture = texture;
  particleRenderer.setMaterial(material);

  const generator = particleRenderer.generator;
  const {
    main,
    shape,
    emission,
    textureSheetAnimation,
    sizeOverLifetime,
    colorOverLifetime,
  } = generator;

  // Main module
  main.startLifetime.constantMin = 0.2;
  main.startLifetime.constantMax = 0.8;
  main.startLifetime.mode = ParticleCurveMode.TwoConstants;

  main.startSpeed.constantMin = 0.4;
  main.startSpeed.constantMax = 1.6;
  main.startSpeed.mode = ParticleCurveMode.TwoConstants;

  main.startSize.constantMin = 0.6;
  main.startSize.constantMax = 0.9;
  main.startSize.mode = ParticleCurveMode.TwoConstants;

  main.startRotation.constantMin = 0;
  main.startRotation.constantMax = 360;
  main.startRotation.mode = ParticleCurveMode.TwoConstants;

  main.simulationSpace = ParticleSimulationSpace.World;

  // Emission module
  emission.rateOverTime.constant = 35;

  // Shape module
  const coneShape = <ConeShape>shape.shape;
  coneShape.angle = 0.96;
  coneShape.radius = 0.01;

  // Color over lifetime module
  colorOverLifetime.enabled = true;
  colorOverLifetime.color.mode = ParticleGradientMode.Gradient;

  const gradient = colorOverLifetime.color.gradient;
  const colorKeys = gradient.colorKeys;
  colorKeys[0].color.set(255 / 255, 127 / 255, 4 / 255, 1.0);
  colorKeys[1].time = 0.998;
  colorKeys[1].color.set(255 / 255, 123 / 255, 0 / 255, 1.0);
  gradient.addColorKey(0.157, new Color(1, 1, 1, 1));
  gradient.addColorKey(0.573, new Color(255 / 255, 255 / 255, 137 / 255, 1));
  gradient.alphaKeys[1].time = 0.089;

  // Size over lifetime module
  sizeOverLifetime.enabled = true;
  sizeOverLifetime.size.mode = ParticleCurveMode.Curve;

  const curve = sizeOverLifetime.size.curve;
  const keys = curve.keys;
  keys[0].value = 0.153;
  keys[1].value = 0.529;
  curve.addKey(0.074, 0.428);
  curve.addKey(0.55, 0.947);

  // Texture sheet animation module
  textureSheetAnimation.enabled = true;
  textureSheetAnimation.tiling = new Vector2(6, 6);
  const frameOverTime = textureSheetAnimation.frameOverTime;
  frameOverTime.mode = ParticleCurveMode.TwoCurves;
  frameOverTime.curveMin = new ParticleCurve(new Key(0, 0.47), new Key(1, 1));

  particleRenderer.play();

  return particleEntity;
}

function createFireGlowParticle(fireEntity: Entity, texture: Texture2D): void {
  const particleEntity = fireEntity.createChild("FireGlow");

  const particleRenderer = particleEntity.addComponent(ParticleRenderer);

  const material = new ParticleMaterial(fireEntity.engine);
  material.blendMode = BlendMode.Additive;
  material.baseTexture = texture;
  particleRenderer.setMaterial(material);

  const generator = particleRenderer.generator;
  const { main, shape, emission, sizeOverLifetime, colorOverLifetime } =
    generator;

  // Main module
  main.startLifetime.constantMin = 0.2;
  main.startLifetime.constantMax = 0.6;
  main.startLifetime.mode = ParticleCurveMode.TwoConstants;

  main.startSpeed.constantMin = 0.0;
  main.startSpeed.constantMax = 1.4;
  main.startSpeed.mode = ParticleCurveMode.TwoConstants;

  main.startSize.constant = 1.2;

  main.startRotation.constantMin = 0;
  main.startRotation.constantMax = 360;
  main.startRotation.mode = ParticleCurveMode.TwoConstants;

  main.startColor.constant = new Color(
    255 / 255,
    100 / 255,
    0 / 255,
    168 / 255
  );

  main.simulationSpace = ParticleSimulationSpace.World;

  main.scalingMode = ParticleScaleMode.Hierarchy;

  // Emission module
  emission.rateOverTime.constant = 20;

  // Shape module
  const coneShape = <ConeShape>shape.shape;
  coneShape.angle = 15;
  coneShape.radius = 0.01;

  // Color over lifetime module
  colorOverLifetime.enabled = true;
  colorOverLifetime.color.mode = ParticleGradientMode.Gradient;

  const gradient = colorOverLifetime.color.gradient;
  const colorKeys = gradient.colorKeys;
  colorKeys[1].time = 0.998;
  colorKeys[1].color.set(255 / 255, 50 / 255, 0 / 255, 1.0);

  gradient.alphaKeys[0].alpha = 0;
  gradient.alphaKeys[1].alpha = 0;

  gradient.addAlphaKey(0.057, 247 / 255);

  // Size over lifetime module
  sizeOverLifetime.enabled = true;
  sizeOverLifetime.size.mode = ParticleCurveMode.Curve;

  const curve = sizeOverLifetime.size.curve;
  const keys = curve.keys;
  keys[0].value = 0.153;
  keys[1].value = 1.0;
  curve.addKey(0.057, 0.37);
  curve.addKey(0.728, 0.958);

  particleRenderer.play();
}

function createFireSmokeParticle(fireEntity: Entity, texture: Texture2D): void {
  const particleEntity = fireEntity.createChild("FireGlow");

  const particleRenderer = particleEntity.addComponent(ParticleRenderer);

  const material = new ParticleMaterial(fireEntity.engine);
  material.baseTexture = texture;
  particleRenderer.setMaterial(material);

  const generator = particleRenderer.generator;
  const {
    main,
    shape,
    emission,
    sizeOverLifetime,
    colorOverLifetime,
    textureSheetAnimation,
  } = generator;

  // Main module
  main.startLifetime.constantMin = 1;
  main.startLifetime.constantMax = 1.2;
  main.startLifetime.mode = ParticleCurveMode.TwoConstants;

  main.startSpeed.constant = 1.5;

  main.startSize.constant = 1.2;

  main.startRotation.constantMin = 0;
  main.startRotation.constantMax = 360;
  main.startRotation.mode = ParticleCurveMode.TwoConstants;

  main.startColor.constant = new Color(
    255 / 255,
    255 / 255,
    255 / 255,
    84 / 255
  );

  main.gravityModifier.constant = -0.05;

  main.simulationSpace = ParticleSimulationSpace.World;

  main.scalingMode = ParticleScaleMode.Hierarchy;

  // Emission module
  emission.rateOverTime.constant = 25;

  // Shape module
  const coneShape = <ConeShape>shape.shape;
  coneShape.angle = 10;
  coneShape.radius = 0.1;

  // Color over lifetime module
  colorOverLifetime.enabled = true;
  colorOverLifetime.color.mode = ParticleGradientMode.Gradient;

  const gradient = colorOverLifetime.color.gradient;
  const colorKeys = gradient.colorKeys;
  colorKeys[0].time = 0;
  colorKeys[0].color.set(255 / 255, 98 / 255, 0 / 255, 1.0);
  colorKeys[1].time = 0.679;
  colorKeys[1].color.set(0, 0, 0, 1.0);
  gradient.addColorKey(0.515, new Color(255 / 255, 98 / 255, 0 / 255, 1.0));

  const alphaKeys = gradient.alphaKeys;
  alphaKeys[0].alpha = 0;
  alphaKeys[1].alpha = 0;
  gradient.addAlphaKey(0.121, 1);
  gradient.addAlphaKey(0.329, 200 / 255);

  // Size over lifetime module
  sizeOverLifetime.enabled = true;
  sizeOverLifetime.size.mode = ParticleCurveMode.Curve;

  const curve = sizeOverLifetime.size.curve;
  const keys = curve.keys;
  keys[0].value = 0.28;
  keys[1].value = 1.0;
  curve.addKey(0.607, 0.909);

  // Texture sheet animation module
  textureSheetAnimation.enabled = true;
  textureSheetAnimation.tiling = new Vector2(8, 8);
  const frameOverTime = textureSheetAnimation.frameOverTime;
  frameOverTime.curveMax.keys[1].value = 0.382;

  particleRenderer.play();
}
