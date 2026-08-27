/** Shape Builder — accurate shape metadata */
window.SHAPES_2D = [
  { id: "circle", name: "circle", sides: 0, corners: 0, dim: "2D", color: "#3b82f6", emoji: "🔵" },
  { id: "square", name: "square", sides: 4, corners: 4, dim: "2D", color: "#ef4444", emoji: "🟥", equalSides: true },
  { id: "triangle", name: "triangle", sides: 3, corners: 3, dim: "2D", color: "#f59e0b", emoji: "🔺" },
  { id: "rectangle", name: "rectangle", sides: 4, corners: 4, dim: "2D", color: "#22c55e", emoji: "🟩", equalSides: false },
  { id: "oval", name: "oval", sides: 0, corners: 0, dim: "2D", color: "#a855f7", emoji: "🏉" },
  { id: "hexagon", name: "hexagon", sides: 6, corners: 6, dim: "2D", color: "#8b5cf6", emoji: "⬡" },
];
window.SHAPES_3D = [
  { id: "cube", name: "cube", faces: 6, edges: 12, corners: 8, dim: "3D", color: "#ef4444", emoji: "🧊", flatFaces: true },
  { id: "sphere", name: "sphere", faces: 0, edges: 0, corners: 0, dim: "3D", color: "#a855f7", emoji: "🟣", flatFaces: false },
  { id: "cone", name: "cone", faces: 2, edges: 1, corners: 1, dim: "3D", color: "#f97316", emoji: "🍦", flatFaces: true },
  { id: "cylinder", name: "cylinder", faces: 3, edges: 2, corners: 0, dim: "3D", color: "#0ea5e9", emoji: "🥫", flatFaces: true },
  { id: "cuboid", name: "cuboid", faces: 6, edges: 12, corners: 8, dim: "3D", color: "#22c55e", emoji: "📦", flatFaces: true },
];
window.ALL_SHAPES = SHAPES_2D.concat(SHAPES_3D);

window.BUILD_CHALLENGES = [
  { text: "Build a house: 1 triangle on top of 1 square", need: { triangle: 1, square: 1 }, minPieces: 2 },
  { text: "Build a house: 2 triangles and 1 rectangle", need: { triangle: 2, rectangle: 1 }, minPieces: 3 },
  { text: "Build a rocket: 1 rectangle + 1 triangle + 1 circle", need: { rectangle: 1, triangle: 1, circle: 1 }, minPieces: 3 },
  { text: "Build a tree: 1 triangle + 1 rectangle", need: { triangle: 1, rectangle: 1 }, minPieces: 2 },
  { text: "Build a face: 1 circle + 2 small circles (use ovals)", need: { circle: 1, oval: 2 }, minPieces: 3 },
  { text: "Use 3 triangles only", need: { triangle: 3 }, minPieces: 3 },
  { text: "Build with 2 squares and 1 triangle", need: { square: 2, triangle: 1 }, minPieces: 3 },
  { text: "Make a path with 4 rectangles", need: { rectangle: 4 }, minPieces: 4 },
];
