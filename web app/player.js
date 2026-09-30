/**
 * MathQuest Kingdom — Player Controller
 * 3D character made from primitives, WASD/Arrow movement, health management
 */
(function () {
    'use strict';
    window.Game = window.Game || {};
    var mesh = null;
    var health = 100;
    var maxHealth = 100;
    var moveSpeed = 18;
    var movementEnabled = false;
    // Input state
    var keys = { w: false, a: false, s: false, d: false };
    var touchInput = { dx: 0, dz: 0, active: false };
    // World bounds
    var boundsMinX = -12;
    var boundsMaxX = 12;
    var boundsMinZ = -2;
    var boundsMaxZ = 200;

    function setTouchInput(dx, dz, active) {
        touchInput.dx = dx;
        touchInput.dz = dz;
        touchInput.active = (active !== false);
    }

    function createCharacterMesh() {
        var group = new THREE.Group();

        // Materials
        var armorMat = new THREE.MeshStandardMaterial({
            color: 0x1976d2,
            metalness: 0.8,
            roughness: 0.2
        });
        
        var goldMat = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.9,
            roughness: 0.15
        });
        
        var ironMat = new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            metalness: 0.85,
            roughness: 0.2
        });

        var skinMat = new THREE.MeshStandardMaterial({
            color: 0xffcc80,
            roughness: 0.75,
            metalness: 0.05
        });

        var clothMat = new THREE.MeshStandardMaterial({
            color: 0x3e2723,
            roughness: 0.9,
            metalness: 0.0
        });

        var redGlowMat = new THREE.MeshStandardMaterial({
            color: 0xff1111,
            emissive: 0xff1111,
            emissiveIntensity: 1.8,
            roughness: 0.5,
            metalness: 0.1
        });

        var capeMat = new THREE.MeshStandardMaterial({
            color: 0xb71c1c,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.95,
            roughness: 0.7,
            metalness: 0.1
        });

        // Body (torso)
        var bodyGeo = new THREE.BoxGeometry(1.2, 1.6, 0.8);
        var body = new THREE.Mesh(bodyGeo, armorMat);
        body.position.y = 2.2;
        group.add(body);

        // Pauldrons (Glowing Shoulder pads)
        var pauldronGeo = new THREE.BoxGeometry(0.5, 0.5, 0.9);
        var pauldronMat = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0xffd700,
            emissiveIntensity: 0.4
        });
        var leftPauldron = new THREE.Mesh(pauldronGeo, pauldronMat);
        leftPauldron.position.set(-0.8, 2.7, 0);
        group.add(leftPauldron);
        var rightPauldron = new THREE.Mesh(pauldronGeo, pauldronMat.clone());
        rightPauldron.position.set(0.8, 2.7, 0);
        group.add(rightPauldron);

        // Head
        var headGeo = new THREE.SphereGeometry(0.45, 16, 16);
        var head = new THREE.Mesh(headGeo, skinMat);
        head.position.y = 3.35;
        group.add(head);

        // Helmet
        var helmetGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.6, 16);
        var helmet = new THREE.Mesh(helmetGeo, armorMat);
        helmet.position.y = 3.4;
        group.add(helmet);
        
        // Helmet Crest (Glowing Top cone)
        var crestGeo = new THREE.ConeGeometry(0.52, 0.5, 16);
        var crestMat = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0xffd700,
            emissiveIntensity: 0.3
        });
        var crest = new THREE.Mesh(crestGeo, crestMat);
        crest.position.y = 3.95;
        group.add(crest);

        // Plume (red decoration at back of helmet)
        var plumeGeo = new THREE.BoxGeometry(0.15, 0.6, 0.4);
        var plumeMat = new THREE.MeshStandardMaterial({ color: 0xd32f2f, roughness: 0.9 });
        var plume = new THREE.Mesh(plumeGeo, plumeMat);
        plume.position.set(0, 3.8, -0.4);
        plume.rotation.x = -0.2;
        group.add(plume);

        // Helmet visor / glowing slit
        var visorGeo = new THREE.BoxGeometry(0.65, 0.12, 0.1);
        var visor = new THREE.Mesh(visorGeo, redGlowMat);
        visor.position.set(0, 3.4, 0.48);
        group.add(visor);

        // Left arm
        var armGeo = new THREE.BoxGeometry(0.35, 1.2, 0.35);
        var leftArm = new THREE.Mesh(armGeo, armorMat);
        leftArm.position.set(-0.95, 2.2, 0);
        group.add(leftArm);

        // Right arm
        var rightArm = new THREE.Mesh(armGeo, armorMat.clone());
        rightArm.position.set(0.95, 2.2, 0);
        group.add(rightArm);

        // Shield (left hand)
        var shieldGeo = new THREE.BoxGeometry(0.7, 0.9, 0.1);
        var shield = new THREE.Mesh(shieldGeo, armorMat);
        shield.position.set(-1.3, 2.1, 0.2);
        group.add(shield);

        // Gold rim on shield
        var rimGeo = new THREE.BoxGeometry(0.8, 1.0, 0.05);
        var rim = new THREE.Mesh(rimGeo, goldMat);
        rim.position.set(-1.3, 2.1, 0.16);
        group.add(rim);

        // Shield emblem (Gold cross with emissive glow)
        var emblemGeo1 = new THREE.BoxGeometry(0.15, 0.6, 0.05);
        var emblemGeo2 = new THREE.BoxGeometry(0.4, 0.15, 0.05);
        var shieldEmblemMat = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.9,
            emissive: 0xffd700,
            emissiveIntensity: 0.5
        });
        var emblem1 = new THREE.Mesh(emblemGeo1, shieldEmblemMat);
        var emblem2 = new THREE.Mesh(emblemGeo2, shieldEmblemMat.clone());
        emblem1.position.set(-1.3, 2.1, 0.26);
        emblem2.position.set(-1.3, 2.1, 0.26);
        group.add(emblem1);
        group.add(emblem2);

        // Glowing Holographic Energy Shield overlay
        var shieldEnergyGeo = new THREE.BoxGeometry(0.72, 0.92, 0.05);
        var shieldEnergyMat = new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.4,
            emissive: 0x00ffff,
            emissiveIntensity: 1.0,
            metalness: 0.9,
            roughness: 0.1
        });
        var shieldEnergy = new THREE.Mesh(shieldEnergyGeo, shieldEnergyMat);
        shieldEnergy.position.set(-1.3, 2.1, 0.28);
        group.add(shieldEnergy);

        // Sword (right hand)
        // Guard (crossguard)
        var guardGeo = new THREE.BoxGeometry(0.7, 0.1, 0.15);
        var guard = new THREE.Mesh(guardGeo, goldMat);
        guard.position.set(1.3, 2.2, 0.1);
        group.add(guard);

        // Blade (Iron)
        var swordBladeGeo = new THREE.BoxGeometry(0.12, 1.7, 0.04);
        var swordBlade = new THREE.Mesh(swordBladeGeo, ironMat);
        swordBlade.position.set(1.3, 3.1, 0.1);
        group.add(swordBlade);

        // Glowing gem in sword hilt with actual light source
        var gemGeo = new THREE.SphereGeometry(0.08, 8, 8);
        var gemMat = new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 1.8
        });
        var gem = new THREE.Mesh(gemGeo, gemMat);
        gem.position.set(1.3, 2.2, 0.19);
        group.add(gem);

        var gemLight = new THREE.PointLight(0x00ffff, 1.0, 4);
        gemLight.position.set(1.3, 2.2, 0.19);
        group.add(gemLight);

        // Sword hilt grip
        var hiltGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.4);
        var hilt = new THREE.Mesh(hiltGeo, clothMat);
        hilt.position.set(1.3, 1.95, 0.1);
        group.add(hilt);

        // Legs
        var legGeo = new THREE.BoxGeometry(0.4, 1.2, 0.4);
        var leftLeg = new THREE.Mesh(legGeo, clothMat);
        leftLeg.position.set(-0.35, 0.8, 0);
        group.add(leftLeg);
        var rightLeg = new THREE.Mesh(legGeo, clothMat.clone());
        rightLeg.position.set(0.35, 0.8, 0);
        group.add(rightLeg);

        // Boots (Gold trimmed)
        var bootGeo = new THREE.BoxGeometry(0.45, 0.35, 0.6);
        var leftBoot = new THREE.Mesh(bootGeo, armorMat);
        leftBoot.position.set(-0.35, 0.15, 0.05);
        group.add(leftBoot);
        var rightBoot = new THREE.Mesh(bootGeo, armorMat.clone());
        rightBoot.position.set(0.35, 0.15, 0.05);
        group.add(rightBoot);

        var toeGeo = new THREE.BoxGeometry(0.45, 0.15, 0.1);
        var leftToe = new THREE.Mesh(toeGeo, goldMat);
        leftToe.position.set(-0.35, 0.1, 0.36);
        group.add(leftToe);
        var rightToe = new THREE.Mesh(toeGeo, goldMat.clone());
        rightToe.position.set(0.35, 0.1, 0.36);
        group.add(rightToe);

        // Cape
        var capeGeo = new THREE.PlaneGeometry(1.2, 1.6);
        var cape = new THREE.Mesh(capeGeo, capeMat);
        cape.position.set(0, 2.05, -0.45);
        cape.rotation.x = 0.05;
        cape.name = "cape";
        group.add(cape);

        // Shadows
        group.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        return group;
    }
    // Idle bobbing animation
    var bobTime = 0;
    var walkTime = 0;
    function init(scene) {
        mesh = createCharacterMesh();
        mesh.position.set(0, 0, 0);
        scene.add(mesh);
        // Keyboard listeners
        document.addEventListener('keydown', function (e) {
            var key = e.key.toLowerCase();
            if (key === 'w' || key === 'arrowup') keys.w = true;
            if (key === 'a' || key === 'arrowleft') keys.a = true;
            if (key === 's' || key === 'arrowdown') keys.s = true;
            if (key === 'd' || key === 'arrowright') keys.d = true;
        });
        document.addEventListener('keyup', function (e) {
            var key = e.key.toLowerCase();
            if (key === 'w' || key === 'arrowup') keys.w = false;
            if (key === 'a' || key === 'arrowleft') keys.a = false;
            if (key === 's' || key === 'arrowdown') keys.s = false;
            if (key === 'd' || key === 'arrowright') keys.d = false;
        });
    }
    function update(delta) {
        if (!mesh || !movementEnabled) return;
        var moving = false;
        var dx = 0, dz = 0;
        if (touchInput.active) {
            dx = touchInput.dx;
            dz = touchInput.dz;
            moving = (Math.abs(dx) > 0.02 || Math.abs(dz) > 0.02);
        } else {
            if (keys.w) { dz = 1; moving = true; }
            if (keys.s) { dz = -1; moving = true; }
            if (keys.a) { dx = 1; moving = true; }   // Inverted to match camera perspective
            if (keys.d) { dx = -1; moving = true; }  // Inverted to match camera perspective
        }
        if (moving) {
            var len = Math.sqrt(dx * dx + dz * dz);
            var moveDx = dx, moveDz = dz;
            if (len > 1) { moveDx /= len; moveDz /= len; }
            var newX = mesh.position.x + moveDx * moveSpeed * delta;
            var newZ = mesh.position.z + moveDz * moveSpeed * delta;
            // Clamp to bounds
            newX = Math.max(boundsMinX, Math.min(boundsMaxX, newX));
            newZ = Math.max(boundsMinZ, Math.min(boundsMaxZ, newZ));
            mesh.position.x = newX;
            mesh.position.z = newZ;
            // Walking bob
            walkTime += delta * 8;
            mesh.position.y = Math.abs(Math.sin(walkTime)) * 0.3;
            // Smooth 360-degree direction facing
            mesh.rotation.y = Math.atan2(dx, dz);
        } else {
            // Idle bob
            bobTime += delta * 2;
            mesh.position.y = Math.sin(bobTime) * 0.08;
        }

        // Cape wave animation
        var cape = mesh.getObjectByName('cape');
        if (cape) {
            var waveTime = Date.now() * 0.008;
            if (moving) {
                // Flap faster and higher when moving
                cape.rotation.x = 0.15 + Math.abs(Math.sin(waveTime * 1.5)) * 0.25;
                cape.rotation.z = Math.cos(waveTime * 1.5) * 0.05;
            } else {
                // Gentle breathing wave when idle
                cape.rotation.x = 0.05 + Math.sin(waveTime) * 0.05;
                cape.rotation.z = 0;
            }
        }
    }
    function getPosition() {
        return mesh ? mesh.position.clone() : new THREE.Vector3();
    }
    function takeDamage(amount) {
        health = Math.max(0, health - amount);
        Game.UI.updateHealth(health, maxHealth);
        Game.UI.showDamage();
        Game.Audio.play('damage');
    }
    function heal(amount) {
        health = Math.min(maxHealth, health + amount);
        Game.UI.updateHealth(health, maxHealth);
    }
    function resetForLevel() {
        if (mesh) {
            mesh.position.set(0, 0, 0);
            mesh.rotation.y = 0;
        }
        health = maxHealth;
        Game.UI.updateHealth(health, maxHealth);
        keys.w = false; keys.a = false; keys.s = false; keys.d = false;
        touchInput.dx = 0; touchInput.dz = 0; touchInput.active = false;
    }
    function setMovementEnabled(enabled) {
        movementEnabled = enabled;
        if (!enabled) {
            keys.w = false; keys.a = false; keys.s = false; keys.d = false;
            touchInput.dx = 0; touchInput.dz = 0; touchInput.active = false;
        }
    }
    function setBounds(minX, maxX, maxZ) {
        boundsMinX = minX;
        boundsMaxX = maxX;
        boundsMaxZ = maxZ;
    }
    /* ── Public API ── */
    window.Game.Player = {
        mesh: null,
        init: function (scene) {
            init(scene);
            this.mesh = mesh;
        },
        update: update,
        getPosition: getPosition,
        takeDamage: takeDamage,
        heal: heal,
        resetForLevel: resetForLevel,
        setMovementEnabled: setMovementEnabled,
        setTouchInput: setTouchInput,
        setBounds: setBounds,
        get health() { return health; },
        get maxHealth() { return maxHealth; }
    };
})();