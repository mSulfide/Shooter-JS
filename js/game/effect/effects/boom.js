const boom = (position, angle) => new Effect({
    name: 'boom',
    position,
    angle,
    animation: new GameAnimation([{
        name: 'boom2',
        time: 0.05
    }, {
        name: 'boom1',
        time: 0.1
    }])
});