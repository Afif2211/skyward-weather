// WeatherScene.jsx — Robust version
import { useEffect, useRef } from "react"
import * as THREE from "three"

const WeatherScene = ({ condition }) => {
    console.log("Condition received:", condition)
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    const width = window.innerWidth
    const height = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(width, height)
    mountRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffb27a, 2.5, 0, 0)
    pointLight.position.set(5, 5, 8)
    scene.add(pointLight)
    const pointLight2 = new THREE.PointLight(0x7fe8cf, 1.5, 0, 0)
    pointLight2.position.set(-5, -3, 8)
    scene.add(pointLight2)

    const weatherObjects = []
    const fallingParticles = []

    if (condition === "Clear") {
      const geometry = new THREE.SphereGeometry(2, 48, 48)
      const material = new THREE.MeshStandardMaterial({
        color: 0xffb27a,
        emissive: 0xff9d5c,
        emissiveIntensity: 0.7,
        roughness: 0.25,
      })
      const sun = new THREE.Mesh(geometry, material)
      sun.position.set(-3.5, 2, -3)
      scene.add(sun)
      weatherObjects.push(sun)
    }

    else if (condition === "Clouds") {
      for (let c = 0; c < 5; c++) {
        const cloudGroup = new THREE.Group()
        const puffs = [[0, 0, 0, 1], [-0.9, 0.2, 0, 0.7], [0.9, 0.15, 0, 0.75], [0.3, -0.3, 0.3, 0.6]]
        puffs.forEach(([x, y, z, r]) => {
          const geometry = new THREE.SphereGeometry(r, 20, 20)
          const material = new THREE.MeshStandardMaterial({ color: 0xdcdeef, roughness: 0.9 })
          const puff = new THREE.Mesh(geometry, material)
          puff.position.set(x, y, z)
          cloudGroup.add(puff)
        })
        cloudGroup.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 6, -2 - Math.random() * 3)
        cloudGroup.scale.setScalar(0.7 + Math.random() * 0.6)
        scene.add(cloudGroup)
        weatherObjects.push(cloudGroup)
      }
    }

    else if (condition === "Rain" || condition === "Drizzle" || condition === "Thunderstorm") {
      for (let c = 0; c < 4; c++) {
        const cloudGroup = new THREE.Group()
        const puffs = [[0, 0, 0, 1], [-0.9, 0.2, 0, 0.7], [0.9, 0.15, 0, 0.75]]
        puffs.forEach(([x, y, z, r]) => {
          const geometry = new THREE.SphereGeometry(r, 20, 20)
          const material = new THREE.MeshStandardMaterial({ color: 0x9aa0c4, roughness: 0.9 })
          const puff = new THREE.Mesh(geometry, material)
          puff.position.set(x, y, z)
          cloudGroup.add(puff)
        })
        cloudGroup.position.set((Math.random() - 0.5) * 12, 2 + Math.random() * 2, -2 - Math.random() * 3)
        scene.add(cloudGroup)
        weatherObjects.push(cloudGroup)
      }

      const dropGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 6)
      const dropMaterial = new THREE.MeshBasicMaterial({ color: 0x7fe8cf, transparent: true, opacity: 0.8 })
      for (let i = 0; i < 250; i++) {
        const drop = new THREE.Mesh(dropGeometry, dropMaterial)
        drop.position.set((Math.random() - 0.5) * 14, Math.random() * 10 - 3, -1 - Math.random() * 5)
        scene.add(drop)
        fallingParticles.push({ mesh: drop, speed: 0.09 })
      }
    }

    else if (condition === "Snow") {
      for (let c = 0; c < 4; c++) {
        const cloudGroup = new THREE.Group()
        const puffs = [[0, 0, 0, 1], [-0.9, 0.2, 0, 0.7], [0.9, 0.15, 0, 0.75]]
        puffs.forEach(([x, y, z, r]) => {
          const geometry = new THREE.SphereGeometry(r, 20, 20)
          const material = new THREE.MeshStandardMaterial({ color: 0xdcdeef, roughness: 0.9 })
          const puff = new THREE.Mesh(geometry, material)
          puff.position.set(x, y, z)
          cloudGroup.add(puff)
        })
        cloudGroup.position.set((Math.random() - 0.5) * 12, 2 + Math.random() * 2, -2 - Math.random() * 3)
        scene.add(cloudGroup)
        weatherObjects.push(cloudGroup)
      }

      const flakeGeometry = new THREE.SphereGeometry(0.05, 8, 8)
      const flakeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
      for (let i = 0; i < 180; i++) {
        const flake = new THREE.Mesh(flakeGeometry, flakeMaterial)
        flake.position.set((Math.random() - 0.5) * 14, Math.random() * 10 - 3, -1 - Math.random() * 5)
        scene.add(flake)
        fallingParticles.push({ mesh: flake, speed: 0.02 })
      }
    }

    else {
      for (let i = 0; i < 6; i++) {
        const geometry = new THREE.CylinderGeometry(3 - i * 0.2, 3 - i * 0.2, 0.08, 40)
        const material = new THREE.MeshStandardMaterial({ color: 0xc9cbe0, transparent: true, opacity: 0.3 })
        const ring = new THREE.Mesh(geometry, material)
        ring.position.set((Math.random() - 0.5) * 5, i * 0.6 - 2, -3)
        scene.add(ring)
        weatherObjects.push(ring)
      }
    }

    let animationId
    const clock = new THREE.Clock()
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      weatherObjects.forEach((obj, i) => {
        obj.rotation.y = elapsed * 0.15 + i
      })

      fallingParticles.forEach(({ mesh, speed }) => {
        mesh.position.y -= speed
        if (mesh.position.y < -6) mesh.position.y = 6
      })

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("resize", handleResize)
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) obj.material.dispose()
      })
      renderer.dispose()
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [condition]) // Ek hi effect — poori scene har condition change pe rebuild hoti hai

  return <div ref={mountRef} className="weather-scene-bg" />
}

export default WeatherScene