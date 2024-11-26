import * as THREE from "three";

export default class TechBallClass {
  private canvas: HTMLCanvasElement;
  private iconUrl: string;
  private scene!: THREE.Scene; // Definite assignment assertion
  private camera!: THREE.PerspectiveCamera; // Definite assignment assertion
  private renderer!: THREE.WebGLRenderer; // Definite assignment assertion
  private ball?: THREE.Mesh; // Optional, as it may not exist immediately
  private decal?: THREE.Mesh; // Optional, as it depends on texture loading

  constructor(canvas: HTMLCanvasElement, iconUrl: string) {
    this.canvas = canvas;
    this.iconUrl = iconUrl;
    this.init();
  }

  private init() {
    // Setup scene
    this.scene = new THREE.Scene();

    // Setup camera
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.camera.position.z = 5;

    // Setup renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(112, 112); // Match the w-28 h-28 classes (28 * 4 = 112px)
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 0.05);
    this.scene.add(ambientLight);
    this.scene.add(directionalLight);

    // Create ball
    this.createBall();

    // Start animation
    this.animate();
  }

  private createBall() {
    // Create geometry
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: "#fff8eb",
      flatShading: true,
    });

    this.ball = new THREE.Mesh(geometry, material);

    // Load texture
    new THREE.TextureLoader().load(this.iconUrl, (texture) => {
      // Create a material for the decal
      const decalMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4,
      });

      // Create a plane for the decal
      const decalGeometry = new THREE.PlaneGeometry(1.5, 1.5);
      this.decal = new THREE.Mesh(decalGeometry, decalMaterial);
      this.decal.position.set(0, 0, 1.01);
      this.ball?.add(this.decal);
    });

    this.scene.add(this.ball);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    // Rotate the ball
    if (this.ball) {
      this.ball.rotation.x += 0.01;
      this.ball.rotation.y += 0.01;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
