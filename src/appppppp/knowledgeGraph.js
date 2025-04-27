const createStarField = () => {
    const geometry = new THREE.SphereGeometry(0.2, 8, 8)
    const material = new THREE.MeshPhongMaterial({ color: 0x888888 })
    const stars = new THREE.InstancedMesh(geometry, material, 5000)
  
    const matrix = new THREE.Matrix4()
    for (let i = 0; i < 5000; i++) {
      matrix.setPosition(
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500
      )
      stars.setMatrixAt(i, matrix)
    }
    scene.add(stars)
  }