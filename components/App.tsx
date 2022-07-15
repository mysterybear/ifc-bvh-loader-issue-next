import { useLoader } from "@react-three/fiber"
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from "three-mesh-bvh"
import { IFCLoader } from "web-ifc-three"

const App = () => {
  const url = `./foo.ifc`

  const { geometry, material, ifcManager, modelID } = useLoader(
    IFCLoader,
    url,
    (loader) => {
      if (loader instanceof IFCLoader) {
        loader.ifcManager.setWasmPath("../../../wasm/")
        loader.ifcManager.setupThreeMeshBVH(
          acceleratedRaycast,
          computeBoundsTree,
          disposeBoundsTree
        )
      }
    }
  )

  // return null

  return (
    <mesh
      {...{ geometry, material }}
      onClick={({ faceIndex, object }) => {
        if (!ifcManager || !faceIndex) return
        const expressID = ifcManager.getExpressId(geometry, faceIndex)
        const ifcType = ifcManager.getIfcType(modelID, expressID)
        console.log({
          modelID,
          expressID,
          faceIndex,
          ifcType,
        })
      }}
    />
  )
}
export default App
