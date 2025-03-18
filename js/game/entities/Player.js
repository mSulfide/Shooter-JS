class Player extends GameObject {
    constructor(props) {
        super(props);
        this.move = 0;
        this.angVel = 0;
    }

    start({ keyboard, scene }) {
        let forward = false, back = false;
        const moveForward = isActive => {
            forward = isActive;
            this.move = forward - back;
        };
        const moveBack = isActive => {
            back = isActive;
            this.move = forward - back;
        };
        let right = false, left = false;
        const rotateRight = isActive => {
            right = isActive;
            this.angVel = left - right;
        };
        const rotateLeft = isActive => {
            left = isActive;
            this.angVel = left - right;
        };
        const bindings = [
            { key: 'KeyW', method: moveForward },
            { key: 'KeyA', method: rotateLeft },
            { key: 'KeyS', method: moveBack },
            { key: 'KeyD', method: rotateRight }
        ];
        keyboard.bind(...bindings);

        const weapon = new Weapon({ name: 'aboba', model: MODELS.weapon, layer: this.layer + 0.05 });
        scene.spawn(weapon);
        this.weapon = weapon;
    }

    update({ deltaTime }) {
        this.angle += this.angVel * deltaTime;
        this.translate(vMath.prod(this.forward(), deltaTime * this.move));
        this.weapon.position = this.position
    }
}