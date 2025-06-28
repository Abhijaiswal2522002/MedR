// Remove react-map-gl dependency
const fs = require("fs")
const path = require("path")

const packageJsonPath = path.join(process.cwd(), "package.json")
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

// Remove react-map-gl from dependencies if it exists
if (packageJson.dependencies && packageJson.dependencies["react-map-gl"]) {
  delete packageJson.dependencies["react-map-gl"]
}

if (packageJson.devDependencies && packageJson.devDependencies["react-map-gl"]) {
  delete packageJson.devDependencies["react-map-gl"]
}

// Write back the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

console.log("Successfully removed react-map-gl dependency")
