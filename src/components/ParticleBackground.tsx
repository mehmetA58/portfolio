import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 50

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x030014, 1)
    mount.appendChild(renderer.domElement)

    // Particles
    const particleCount = 12000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)

    const baseColor = new THREE.Color(0x001f3f)
    const accentColor = new THREE.Color(0xccff00)

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 200
      const y = (Math.random() - 0.5) * 120
      const z = (Math.random() - 0.5) * 100

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z

      colors[i * 3] = baseColor.r
      colors[i * 3 + 1] = baseColor.g
      colors[i * 3 + 2] = baseColor.b

      velocities[i * 3] = 0
      velocities[i * 3 + 1] = 0
      velocities[i * 3 + 2] = 0
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Energy lines
    const lineCount = 80
    const lineObjects: THREE.Line[] = []

    for (let i = 0; i < lineCount; i++) {
      const lineGeo = new THREE.BufferGeometry()
      const x = (Math.random() - 0.5) * 180
      const y = (Math.random() - 0.5) * 100
      const z = Math.random() * -200
      const len = Math.random() * 8 + 3

      const pts = new Float32Array([x, y, z, x, y, z + len])
      lineGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3))

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x88aaff,
        transparent: true,
        opacity: 0.15 + Math.random() * 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      const line = new THREE.Line(lineGeo, lineMat)
      line.userData.speed = Math.random() * 0.5 + 0.2
      lineObjects.push(line)
      scene.add(line)
    }

    // Mouse interaction
    const mouse = new THREE.Vector2(9999, 9999)
    const mouse3D = new THREE.Vector3()

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      mouse3D.set(mouse.x * 80, mouse.y * 45, 0)
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Update particles with mouse repulsion
      const pos = particleGeo.attributes.position as THREE.BufferAttribute
      const col = particleGeo.attributes.color as THREE.BufferAttribute

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2

        const px = pos.array[ix]
        const py = pos.array[iy]

        const dx = px - mouse3D.x
        const dy = py - mouse3D.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Mouse repulsion
        if (dist < 18) {
          const force = (18 - dist) / 18
          velocities[ix] += (dx / dist) * force * 0.06
          velocities[iy] += (dy / dist) * force * 0.06

          const mix = force * 0.5
          col.array[ix] = baseColor.r + (accentColor.r - baseColor.r) * mix
          col.array[iy] = baseColor.g + (accentColor.g - baseColor.g) * mix
          col.array[iz] = baseColor.b + (accentColor.b - baseColor.b) * mix
        } else {
          col.array[ix] = baseColor.r
          col.array[iy] = baseColor.g
          col.array[iz] = baseColor.b
        }

        // Spring return
        velocities[ix] += (originalPositions[ix] - pos.array[ix]) * 0.03
        velocities[iy] += (originalPositions[iy] - pos.array[iy]) * 0.03

        velocities[ix] *= 0.88
        velocities[iy] *= 0.88

        ;(pos.array as Float32Array)[ix] += velocities[ix]
        ;(pos.array as Float32Array)[iy] += velocities[iy]
      }

      pos.needsUpdate = true
      col.needsUpdate = true

      // Move energy lines forward
      for (const line of lineObjects) {
        line.position.z += line.userData.speed
        if (line.position.z > 60) {
          line.position.z = -200
        }
      }

      // Subtle camera drift
      camera.position.x = Math.sin(elapsed * 0.08) * 1.5
      camera.position.y = Math.cos(elapsed * 0.05) * 1

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      particleGeo.dispose()
      particleMat.dispose()
      lineObjects.forEach(l => {
        l.geometry.dispose()
        ;(l.material as THREE.Material).dispose()
      })
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
