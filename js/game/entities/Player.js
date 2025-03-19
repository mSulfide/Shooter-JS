class Player extends GameObject {
    constructor(props) {
        super(props);
    }

    start({ keyboard, mouse, scene }) {
        const ship = new Ship({ name: 'playerShip', model: MODELS.testShip, layer: this.layer});
        scene.spawn(ship);
        this.ship = ship;
        let forward = false, back = false;
        const moveForward = isActive => {
            forward = isActive;
            ship.thrust = forward - back;
        };
        const moveBack = isActive => {
            back = isActive;
            ship.thrust = forward - back;
        };
        let right = false, left = false;
        const rotateRight = isActive => {
            right = isActive;
            ship.rotation = left - right;
        };
        const rotateLeft = isActive => {
            left = isActive;
            ship.rotation = left - right;
        };
        const bindings = [
            { key: 'KeyW', method: moveForward },
            { key: 'KeyA', method: rotateLeft },
            { key: 'KeyS', method: moveBack },
            { key: 'KeyD', method: rotateRight }
        ];
        keyboard.bind(...bindings);

        this.isFire = false;
        mouse.addListener('mousedown', () => this.isFire = true);
        mouse.addListener('mouseup', () => this.isFire = false);
        mouse.addListener('mouseleave', () => this.isFire = false);

        const weapon = new Weapon({ name: 'playerGun', model: MODELS.weapon, layer: this.layer + 0.05 });
        scene.spawn(weapon);
        this.weapon = weapon;
    }

    update({ camera }) {
        this.weapon.lookAt(camera.mousePosition);
        if (this.isFire)
            this.weapon.tryFire();
    }

    lateUpdate() {
        this.position = this.ship.position;
        this.weapon.position = this.ship.position;
    }
}