var PlayerRenderingSystem = /** @class */ (function () {
    function PlayerRenderingSystem() {
        this.playerRenderers = [];
    }
    PlayerRenderingSystem.prototype.addPlayerRenderer = function (renderer) {
        this.playerRenderers.push(renderer);
    };
    // addShipRenderer(playerID: number, shipRenderer: ShipRenderer) {
    //     const playerRenderer = this.getPlayerRendererByPlayerID(playerID)
    //     playerRenderer.addShipRenderer(shipRenderer)
    // }
    // addBulletRenderer(playerID: number, bulletRenderer: BulletRenderer){
    //     const playerRenderer = this.getPlayerRendererByPlayerID(playerID)
    //     playerRenderer.addBulletRenderer(bulletRenderer)
    // }
    // getPlayerRendererByPlayerID(playerID: number) {
    //     return this.playerRenderers.find((renderer) => renderer.player.id === playerID)
    // }
    PlayerRenderingSystem.prototype.run = function () {
        this.playerRenderers.forEach(function (renderer) { return renderer.run(); });
    };
    return PlayerRenderingSystem;
}());
export { PlayerRenderingSystem };
//# sourceMappingURL=playerRenderingSystem.js.map