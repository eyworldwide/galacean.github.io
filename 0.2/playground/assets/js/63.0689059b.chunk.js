(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{480:function(e,n,t){"use strict";t.r(n),n.default='import {\n  AmbientLight,\n  BlinnPhongMaterial,\n  Buffer,\n  BufferBindFlag,\n  BufferGeometry,\n  BufferUsage,\n  Camera,\n  Color,\n  DirectLight,\n  Engine,\n  GeometryRenderer,\n  IndexFormat,\n  SystemInfo,\n  Vector3,\n  Vector4,\n  VertexElement,\n  VertexElementFormat,\n  WebGLEngine\n} from "oasis-engine";\n\n/**\n * to create custom cube geometry.\n */\nclass CustomCubeGeometry {\n  /**\n   * create cube geometry with custom BufferGeometry.\n   * @param size - cube size\n   */\n  static create(engine: Engine, size: number): BufferGeometry {\n    const geometry = new BufferGeometry(engine, "CustomCubeGeometry");\n\n    // prettier-ignore\n    // create vertices data.\n    const vertices: Float32Array = new Float32Array([\n    \t// up\n    \t-size, size, -size, 0, 1, 0, size, size, -size, 0, 1, 0, size, size, size, 0, 1, 0, -size, size, size, 0, 1, 0,\n    \t// down\n    \t-size, -size, -size, 0, -1, 0, size, -size, -size, 0, -1, 0, size, -size, size, 0, -1, 0, -size, -size, size, 0, -1, 0,\n    \t// left\n    \t-size, size, -size, -1, 0, 0, -size, size, size, -1, 0, 0, -size, -size, size, -1, 0, 0, -size, -size, -size, -1, 0, 0,\n    \t// right\n    \tsize, size, -size, 1, 0, 0, size, size, size, 1, 0, 0, size, -size, size, 1, 0, 0, size, -size, -size, 1, 0, 0,\n    \t// front\n    \t-size, size, size, 0, 0, 1, size, size, size, 0, 0, 1, size, -size, size, 0, 0, 1, -size, -size, size, 0, 0, 1,\n    \t// back\n    \t-size, size, -size, 0, 0, -1, size, size, -size, 0, 0, -1, size, -size, -size, 0, 0, -1, -size, -size, -size, 0, 0, -1]);\n\n    // prettier-ignore\n    // create indices data.\n    const indices: Uint16Array = new Uint16Array([\n    \t// up\n    \t0, 2, 1, 2, 0, 3,\n    \t// down\n    \t4, 6, 7, 6, 4, 5,\n    \t// left\n    \t8, 10, 9, 10, 8, 11,\n    \t// right\n    \t12, 14, 15, 14, 12, 13,\n    \t// front\n    \t16, 18, 17, 18, 16, 19,\n    \t// back\n    \t20, 22, 23, 22, 20, 21]);\n\n    // create gpu vertex buffer and index buffer.\n    const vertexBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, vertices, BufferUsage.Static);\n    const indexBuffer = new Buffer(engine, BufferBindFlag.IndexBuffer, indices, BufferUsage.Static);\n\n    // bind buffer\n    geometry.setVertexBufferBinding(vertexBuffer, 24);\n    geometry.setIndexBufferBinding(indexBuffer, IndexFormat.UInt16);\n\n    // add vertexElement\n    geometry.setVertexElements([\n      new VertexElement("POSITION", 0, VertexElementFormat.Vector3, 0),\n      new VertexElement("NORMAL", 12, VertexElementFormat.Vector3, 0)\n    ]);\n\n    // add one sub geometry.\n    geometry.addSubGeometry(0, indices.length);\n    return geometry;\n  }\n}\n\n// create engine and get root entity.\nconst engine = new WebGLEngine("o3-demo");\nconst canvas = engine.canvas;\nconst rootEntity = engine.sceneManager.activeScene.createRootEntity("Root");\ncanvas.width = window.innerWidth * SystemInfo.devicePixelRatio;\ncanvas.height = window.innerHeight * SystemInfo.devicePixelRatio;\n\n// create light.\nconst lightEntity = rootEntity.createChild("DirectLight");\nconst ambient = lightEntity.addComponent(AmbientLight);\nconst directLight = lightEntity.addComponent(DirectLight);\nambient.color = new Color(0.2, 0.2, 0.2);\ndirectLight.color = new Color(0.3, 0.4, 0.4);\n\n// create camera.\nconst cameraEntity = rootEntity.createChild("Camera");\ncameraEntity.transform.setPosition(0, 6, 10);\ncameraEntity.transform.lookAt(new Vector3(0, 0, 0));\ncameraEntity.addComponent(Camera);\n\n// create custom cube.\n// use CustomCubeGeometry.create() to create cube geometry.\nconst cubeEntity = rootEntity.createChild("Cube");\nconst cubeRenderer = cubeEntity.addComponent(GeometryRenderer);\nconst cubeGeometry = CustomCubeGeometry.create(engine, 1.0);\nconst material = new BlinnPhongMaterial(engine);\ncubeEntity.transform.rotateXYZ(0, 60, 0);\nmaterial.ambientColor = new Color(1, 1, 1, 1);\ncubeRenderer.geometry = cubeGeometry;\ncubeRenderer.material = material;\n\n// run engine.\nengine.run();\n'}}]);