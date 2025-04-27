<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const props = defineProps({
  nodes: Array // { id:1, pos:[x,y,z], links:[2,3], type:'tech' }
})

let scene, camera, renderer
const canvasRef = ref(null)

onMounted(() => {
  // 初始化场景
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, 
    canvasRef.value.clientWidth / canvasRef.value.clientHeight, 0.1, 1000)
  
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)
  canvasRef.value.appendChild(renderer.domElement)

  // 创建星群
  props.nodes.forEach(node => {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32)
    const material = new THREE.MeshPhongMaterial({ 
      color: nodeTypes[node.type].color,
      emissive: nodeTypes[node.type].emissive
    })
    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(...node.pos)
    sphere.userData = node
    scene.add(sphere)
  })

  // 添加连接线
  props.nodes.forEach(node => {
    node.links.forEach(linkId => {
      const target = props.nodes.find(n => n.id === linkId)
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...node.pos),
        new THREE.Vector3(...target.pos)
      ])
      const line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0.3
      }))
      scene.add(line)
    })
  })

  // 交互处理
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  
  canvasRef.value.addEventListener('click', event => {
    pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    )
    
    raycaster.setFromCamera(pointer, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    
    if (intersects.length > 0) {
      const nodeData = intersects[0].object.userData
      emit('nodeSelected', nodeData)
    }
  })

  // 动画循环
  const animate = () => {
    requestAnimationFrame(animate)
    scene.rotation.y += 0.002
    renderer.render(scene, camera)
  }
  animate()
})
</script>

<template>
  <div ref="canvasRef" class="galaxy-canvas"></div>
</template>