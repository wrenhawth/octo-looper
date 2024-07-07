import { useWindowWidth } from "@react-hook/window-size"

const DEFAULT_WIDTH = 500

export const useCanvasWidth = () => {
    const windowWidth = useWindowWidth()
    return Math.min(windowWidth, DEFAULT_WIDTH)
}