const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizador = new THREE.WebGLRenderer({ antialias: true });
const controles = new THREE.OrbitControls(camera, renderizador.domElement);
controles.enableDamping = true;
controles.dampingFactor = 0.05;

document.body.appendChild(renderizador.domElement);

const geometriaProton = new THREE.SphereGeometry(1, 32, 32);
const materialProton = new THREE.MeshBasicMaterial ({ color: 0xff4d4d });
const proton = new THREE.Mesh(geometriaProton, materialProton);
cena.add(proton);

const quantidadedeParticulas = 30000;
const geometriaNuvem = new THREE.BufferGeometry();
const posicoes = new Float32Array(quantidadedeParticulas * 3);
const raioMaximo = 4;

for (let i = 0; i < quantidadedeParticulas; i++) {
    let r = Math.pow(Math.random(), 3) * raioMaximo;

    let theta = Math.random() * Math.PI * 2;
    let phi = Math.acos((Math.random() *2) - 1);

    let x = r * Math.sin(phi) * Math.cos(theta);
    let y = r * Math.sin(phi) * Math.sin(theta);
    let z = r * Math.cos(phi);

    posicoes[i * 3] = x;
    posicoes[i * 3 + 1] = y;
    posicoes[i * 3 + 2] = z;
}

geometriaNuvem.setAttribute('position', new THREE.BufferAttribute(posicoes, 3));

const materialNuvem = new THREE.PointsMaterial({
    color: 0x4da6ff, 
    size: 0.02,
    transparent: true,
    blending: THREE.AdditiveBlending, 
    depthWrite: false
});

const nuvem = new THREE.Points(geometriaNuvem, materialNuvem);
cena.add(nuvem);

camera.position.z = 5;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderizador.setSize(window.innerWidth, window.innerHeight);
})

function animar() {
    requestAnimationFrame(animar);

    proton.rotation.x += 0.01;
    proton.rotation.y += 0.01;
    nuvem.rotation.x += 0.002;
    nuvem.rotation.y += 0.001;

    controles.update();
    renderizador.render(cena, camera);
}

animar();