// priority: 0
// requires: dungeonlootbags
// requires: lootr
// @ts-check
// Make loot dangerous

(() => {
    /** @type {typeof import("net.minecraft.world.entity.player.Player").$Player } */
    let $Player = Java.loadClass("net.minecraft.world.entity.player.Player")
    /** @type {typeof import("net.minecraft.world.entity.LivingEntity").$LivingEntity } */
    let $LivingEntity = Java.loadClass("net.minecraft.world.entity.LivingEntity")

    /**
     * 
     * @param {import('dev.latvian.mods.kubejs.block.BlockRightClickedKubeEvent').$BlockRightClickedKubeEvent$$Original 
     * | import('dev.latvian.mods.kubejs.block.BlockBrokenKubeEvent').$BlockBrokenKubeEvent$$Original
     * | import('dev.latvian.mods.kubejs.item.ItemClickedKubeEvent').$ItemClickedKubeEvent$$Original
     * } event 
     */
    function spawnMite(event) {
        if (0.95 > Math.random()) return;
        // @ts-ignore
        event.level.spawnEntity("minecraft:endermite", mite => {
            let pos = event.entity.blockPosition().above()
            mite.setPosition(pos.getX(), pos.getY(), pos.getZ())
            mite.spawn()
        })
    }

    BlockEvents.rightClicked(event => {

        if (!(event.entity instanceof $LivingEntity)) return;
        if (event.entity instanceof $Player) return;
        if (event.level.isClientSide()) return;
        if (!event.block.getEntityData().contains('LootTable')) return;

        // 5% chance a endermite spawns
        spawnMite(event)
    })

    BlockEvents.broken(event => {

        if (!(event.entity instanceof $LivingEntity)) return;
        if (event.entity instanceof $Player) return;
        if (event.level.isClientSide()) return;
        if (!event.block.getEntityData().contains('LootTable')) return;

        // 5% chance a endermite spawns
        spawnMite(event)
    })

    // @ts-ignore
    ItemEvents.firstRightClicked('dungeonlootbags:lootbag', event => {

        if (!(event.entity instanceof $LivingEntity)) return;
        if (event.entity instanceof $Player) return;
        if (event.level.isClientSide()) return;

        // 5% chance a endermite spawns
        spawnMite(event)
    })

})();