const MODELS = {
    testShip: [
        { x: 0, y: 0.5 },
        { x: 0.3, y: 0.3 },
        { x: 0.5, y: 0 },
        { x: 0.3, y: -0.3 },
        { x: 0, y: -0.5 },
        { x: -0.2, y: -0.2 },
        { x: -0.5, y: 0 },
        { x: -0.2, y: 0.2 }
    ],
    bullet: [
        { x: 0.1, y: 0.1 },
        { x: 0.2, y: 0},
        { x: 0.1, y: -0.1 },
        { x: -0.2, y: -0.1 },
        { x: -0.2, y: 0.1 },
    ],
    weapon: [
        { x: 0.2, y: 0.1 },
        { x: 0.4, y: 0.1 },
        { x: 0.4, y: 0.15 },
        { x: 0.5, y: 0.15 },
        { x: 0.5, y: -0.15 },
        { x: 0.4, y: -0.15 },
        { x: 0.4, y: -0.1 },
        { x: 0.2, y: -0.1 },
        { x: 0.12, y: -0.15 },
        { x: -0.12, y: -0.15 },
        { x: -0.15, y: -0.12 },
        { x: -0.15, y: 0.12 },
        { x: -0.12, y: 0.15 },
        { x: 0.15, y: 0.15 }
    ]
}

const SCENES = {
    test: {
        name: "Тестовая комната",
        objects: [new Player({
            name: 'player',
            position: { x: 0, y: 0 },
            layer: 1
        }), new PhysicalBody({
            name: 'test',
            position: { x: 3, y: 0 },
            mass: 10,
            radius: 0.5,
            model: MODELS.testShip
        })]
    }
};

const DEFAULT_SCENE = SCENES['test'];