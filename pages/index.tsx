import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import dynamic from "next/dynamic"

const App = dynamic(() => import("../components/App"), {
  ssr: false,
})

const SiteIndexPage = () => {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <Canvas>
        <App />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default SiteIndexPage
