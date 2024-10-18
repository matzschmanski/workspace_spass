const { gatherResources, build, upgrade, resources, buildings } = require('../script');

describe('gatherResources', () => {
    beforeEach(() => {
        resources.wood = 0;
        resources.stone = 0;
        resources.gold = 0;
        buildings.sawmill.level = 1;
        buildings.quarry.level = 1;
        buildings.mine.level = 1;
    });

    test('should gather resources based on building levels', () => {
        gatherResources();
        expect(resources.wood).toBe(1);
        expect(resources.stone).toBe(1);
        expect(resources.gold).toBe(1);
    });

    test('should not gather resources if building level is 0', () => {
        buildings.sawmill.level = 0;
        buildings.quarry.level = 0;
        buildings.mine.level = 0;
        gatherResources();
        expect(resources.wood).toBe(0);
        expect(resources.stone).toBe(0);
        expect(resources.gold).toBe(0);
    });
});

describe('build', () => {
    beforeEach(() => {
        resources.wood = 100;
        resources.stone = 100;
        resources.gold = 100;
        buildings.sawmill.level = 0;
        buildings.quarry.level = 0;
        buildings.mine.level = 0;
    });

    test('should build a sawmill if resources are sufficient', () => {
        build('sawmill');
        expect(buildings.sawmill.level).toBe(1);
        expect(resources.wood).toBe(90);
        expect(resources.stone).toBe(95);
        expect(resources.gold).toBe(98);
    });

    test('should not build a sawmill if resources are insufficient', () => {
        resources.wood = 5;
        build('sawmill');
        expect(buildings.sawmill.level).toBe(0);
        expect(resources.wood).toBe(5);
    });

    test('should not build a sawmill if it already exists', () => {
        buildings.sawmill.level = 1;
        build('sawmill');
        expect(buildings.sawmill.level).toBe(1);
    });
});

describe('upgrade', () => {
    beforeEach(() => {
        resources.wood = 100;
        resources.stone = 100;
        resources.gold = 100;
        buildings.sawmill.level = 1;
    });

    test('should upgrade a sawmill if resources are sufficient', () => {
        upgrade('sawmill');
        expect(buildings.sawmill.level).toBe(2);
        expect(resources.wood).toBe(80);
        expect(resources.stone).toBe(90);
        expect(resources.gold).toBe(96);
    });

    test('should not upgrade a sawmill if resources are insufficient', () => {
        resources.wood = 5;
        upgrade('sawmill');
        expect(buildings.sawmill.level).toBe(1);
        expect(resources.wood).toBe(5);
    });
});
