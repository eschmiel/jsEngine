export default (managers) => {
    managers.forEach((manager) => manager.update())
    managers[0].entities[0].collideWithBullets(managers[1])
}