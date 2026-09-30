/**
 * MathQuest Kingdom — 3D World Builder
 * Procedural terrain, gates, monsters, decorations, particles per level theme
 */
(function () {
    'use strict';
    window.Game = window.Game || {};

    var scene = null;
    var config = null;
    var worldGroup = null;
    var gates = [];
    var monsters = [];
    var particles = [];
    var decorations = [];
    var gateStates = [];  // true = opened
    var monsterStates = []; // true = defeated

    /* ══════════════════════════════════════
       GATE BUILDER
       ══════════════════════════════════════ */
    function createGate(pos, color, glowColor) {
        var group = new THREE.Group();

        // Left pillar (metallic stone based on gate color)
        var pillarGeo = new THREE.CylinderGeometry(0.6, 0.7, 8, 8);
        var pillarMat = new THREE.MeshStandardMaterial({ 
            color: color, 
            metalness: 0.85, 
            roughness: 0.15 
        });
        var leftPillar = new THREE.Mesh(pillarGeo, pillarMat);
        leftPillar.position.set(-4, 4, 0);
        group.add(leftPillar);

        // Right pillar
        var rightPillar = new THREE.Mesh(pillarGeo, pillarMat.clone());
        rightPillar.position.set(4, 4, 0);
        group.add(rightPillar);

        // Arch (top bar - metallic arch with glow color highlights)
        var archGeo = new THREE.BoxGeometry(9.2, 1.0, 1.0);
        var archMat = new THREE.MeshStandardMaterial({ 
            color: glowColor, 
            metalness: 0.75, 
            roughness: 0.2,
            emissive: glowColor,
            emissiveIntensity: 0.2
        });
        var arch = new THREE.Mesh(archGeo, archMat);
        arch.position.set(0, 8.2, 0);
        group.add(arch);

        // Energy barrier (shining neon glowing energy field)
        var barrierGeo = new THREE.PlaneGeometry(7.5, 7.5);
        var barrierMat = new THREE.MeshStandardMaterial({
            color: color, 
            transparent: true, 
            opacity: 0.55,
            side: THREE.DoubleSide, 
            emissive: color, 
            emissiveIntensity: 1.8,
            roughness: 0.1,
            metalness: 0.9
        });
        var barrier = new THREE.Mesh(barrierGeo, barrierMat);
        barrier.position.set(0, 4.2, 0);
        barrier.userData.isBarrier = true;
        group.add(barrier);

        // Rune orbs on pillars (high emissive neon balls)
        var orbGeo = new THREE.SphereGeometry(0.3, 12, 12);
        var orbMat = new THREE.MeshStandardMaterial({
            color: glowColor, 
            emissive: glowColor, 
            emissiveIntensity: 2.2,
            roughness: 0.1,
            metalness: 0.9,
            transparent: true, 
            opacity: 0.95
        });
        [-4, 4].forEach(function (x) {
            [2, 4, 6].forEach(function (y) {
                var orb = new THREE.Mesh(orbGeo, orbMat.clone());
                orb.position.set(x, y, 0.7);
                group.add(orb);
            });
        });

        // Point light for glow
        var gateLight = new THREE.PointLight(glowColor, 1.2, 15);
        gateLight.position.set(0, 5, 2);
        group.add(gateLight);

        group.position.set(pos.x, pos.y, pos.z);

        // Cast shadows
        group.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        return group;
    }

    function openGateAnimation(index) {
        var gate = gates[index];
        if (!gate) return;
        gateStates[index] = true;

        // Animate barrier fade out
        gate.traverse(function (child) {
            if (child.isMesh && child.userData.isBarrier) {
                var start = Date.now();
                var dur = 800;
                (function anim() {
                     var t = (Date.now() - start) / dur;
                     if (t < 1) {
                         child.material.opacity = 0.4 * (1 - t);
                         child.scale.y = 1 - t * 0.5;
                         requestAnimationFrame(anim);
                     } else {
                         child.visible = false;
                     }
                })();
            }
        });

        // Dim light
        gate.traverse(function (child) {
            if (child.isPointLight) {
                child.intensity = 0.1;
            }
        });
    }

    /* ══════════════════════════════════════
       MONSTER BUILDER
       ══════════════════════════════════════ */
    function createMonster(pos, type, color, accentColor) {
        var group = new THREE.Group();

        switch (type) {
            case 'golem':
                createGolem(group, color, accentColor);
                break;
            case 'serpent':
                createSerpent(group, color, accentColor);
                break;
            case 'titan':
                createTitan(group, color, accentColor);
                break;
            case 'griffin':
                createGriffin(group, color, accentColor);
                break;
            case 'sorcerer':
                createSorcerer(group, color, accentColor);
                break;
            default:
                createGolem(group, color, accentColor);
        }

        group.position.set(pos.x, pos.y, pos.z);

        // Monster glow
        var light = new THREE.PointLight(accentColor, 1.2, 15);
        light.position.set(0, 4, 0);
        group.add(light);

        group.traverse(function (child) {
            if (child.isMesh) { child.castShadow = true; child.receiveShadow = true; }
        });

        return group;
    }

    function createGolem(group, color, accent) {
        var stoneMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.9, metalness: 0.1 });
        var glowMat = new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 2 });
        var mossMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.95 });

        // Large body
        var bodyGeo = new THREE.BoxGeometry(3, 4, 2.5);
        var body = new THREE.Mesh(bodyGeo, stoneMat);
        body.position.y = 3;
        group.add(body);

        // Mossy shoulders
        var mossGeo = new THREE.BoxGeometry(3.2, 0.4, 2.7);
        var moss = new THREE.Mesh(mossGeo, mossMat);
        moss.position.set(0, 4.9, 0);
        group.add(moss);

        // Head
        var headGeo = new THREE.BoxGeometry(1.8, 1.5, 1.5);
        var head = new THREE.Mesh(headGeo, stoneMat.clone());
        head.position.y = 5.8;
        group.add(head);

        // Eyes
        var eyeGeo = new THREE.SphereGeometry(0.2, 8, 8);
        var eye1 = new THREE.Mesh(eyeGeo, glowMat);
        eye1.position.set(-0.45, 5.9, 0.8);
        group.add(eye1);
        var eye2 = new THREE.Mesh(eyeGeo, glowMat.clone());
        eye2.position.set(0.45, 5.9, 0.8);
        group.add(eye2);

        // Glowing crystal spikes on back
        var spikeGeo = new THREE.ConeGeometry(0.35, 1.5, 5);
        [[-1, 4.5, -1.2], [1, 4.5, -1.2], [0, 5.5, -1.2]].forEach(function (p) {
            var spike = new THREE.Mesh(spikeGeo, glowMat.clone());
            spike.position.set(p[0], p[1], p[2]);
            spike.rotation.x = -0.5;
            group.add(spike);
        });

        // Glowing crystal spikes on mossy shoulders
        var shoulderSpikeGeo = new THREE.ConeGeometry(0.2, 0.9, 5);
        [[-1.4, 5.0, 0], [1.4, 5.0, 0]].forEach(function (p) {
            var spike = new THREE.Mesh(shoulderSpikeGeo, glowMat.clone());
            spike.position.set(p[0], p[1], p[2]);
            group.add(spike);
        });

        // Arms
        var armGeo = new THREE.BoxGeometry(1.2, 3.2, 1.2);
        var leftArm = new THREE.Mesh(armGeo, stoneMat.clone());
        leftArm.position.set(-2.5, 3.2, 0);
        group.add(leftArm);
        var rightArm = new THREE.Mesh(armGeo, stoneMat.clone());
        rightArm.position.set(2.5, 3.2, 0);
        group.add(rightArm);
    }

    function createSerpent(group, color, accent) {
        var bodyMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.3, metalness: 0.7 });
        var scaleMat = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.1, metalness: 0.8 });
        var eyeMat = new THREE.MeshStandardMaterial({ color: 0xff1111, emissive: 0xff1111, emissiveIntensity: 2 });
        var crestMat = new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 1.2 });

        // Segmented body with glowing spine spikes
        var spineSpikeGeo = new THREE.ConeGeometry(0.2, 0.8, 5);
        for (var i = 0; i < 8; i++) {
            var r = 1.3 - i * 0.12;
            var segGeo = new THREE.SphereGeometry(r, 16, 16);
            var seg = new THREE.Mesh(segGeo, i % 2 === 0 ? bodyMat : scaleMat);
            seg.position.set(Math.sin(i * 0.6) * 1.8, r + 0.3, -i * 1.9);
            group.add(seg);

            if (i > 0) {
                var sSpike = new THREE.Mesh(spineSpikeGeo, crestMat.clone());
                sSpike.position.set(Math.sin(i * 0.6) * 1.8, r + 0.3 + r, -i * 1.9);
                sSpike.rotation.x = -0.5;
                group.add(sSpike);
            }
        }

        // Head (first segment bigger)
        var headGeo = new THREE.SphereGeometry(1.6, 16, 16);
        var head = new THREE.Mesh(headGeo, bodyMat);
        head.position.set(0, 2.2, 1.6);
        group.add(head);

        // Eyes
        var eyeGeo = new THREE.SphereGeometry(0.25, 8, 8);
        var e1 = new THREE.Mesh(eyeGeo, eyeMat);
        e1.position.set(-0.65, 2.6, 2.9);
        group.add(e1);
        var e2 = new THREE.Mesh(eyeGeo, eyeMat.clone());
        e2.position.set(0.65, 2.6, 2.9);
        group.add(e2);

        // Glowing crown crest
        var crestGeo = new THREE.ConeGeometry(0.4, 2.2, 6);
        var crest = new THREE.Mesh(crestGeo, crestMat);
        crest.position.set(0, 4.0, 1.2);
        group.add(crest);
    }

    function createTitan(group, color, accent) {
        var obsidianMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.1, metalness: 0.95 });
        var lavaMat = new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 2.5, roughness: 0.5 });

        // Massive body
        var bodyGeo = new THREE.BoxGeometry(4.2, 5.2, 3.2);
        var body = new THREE.Mesh(bodyGeo, obsidianMat);
        body.position.y = 4;
        group.add(body);

        // Head
        var headGeo = new THREE.SphereGeometry(1.3, 16, 16);
        var head = new THREE.Mesh(headGeo, obsidianMat.clone());
        head.position.y = 7.6;
        group.add(head);

        // Curved Glowing Lava Horns
        var hornGeo = new THREE.ConeGeometry(0.35, 2.2, 8);
        var h1 = new THREE.Mesh(hornGeo, lavaMat.clone());
        h1.position.set(-0.9, 8.6, 0.2);
        h1.rotation.set(0.2, 0, 0.4);
        group.add(h1);
        var h2 = new THREE.Mesh(hornGeo, lavaMat.clone());
        h2.position.set(0.9, 8.6, 0.2);
        h2.rotation.set(0.2, 0, -0.4);
        group.add(h2);

        // Magma cracks
        var crackGeo = new THREE.BoxGeometry(0.2, 3.0, 0.1);
        [[-1.0, 4], [0, 3.5], [1.0, 4.2]].forEach(function (p) {
            var crack = new THREE.Mesh(crackGeo, lavaMat.clone());
            crack.position.set(p[0], p[1], 1.62);
            crack.rotation.z = (Math.random() - 0.5) * 0.4;
            group.add(crack);
        });

        // Arms
        var armGeo = new THREE.BoxGeometry(1.6, 4.2, 1.6);
        var la = new THREE.Mesh(armGeo, obsidianMat.clone());
        la.position.set(-3.6, 4.2, 0);
        group.add(la);
        var ra = new THREE.Mesh(armGeo, obsidianMat.clone());
        ra.position.set(3.6, 4.2, 0);
        group.add(ra);

        // Eyes
        var eyeGeo = new THREE.SphereGeometry(0.32, 8, 8);
        var e1 = new THREE.Mesh(eyeGeo, lavaMat.clone());
        e1.position.set(-0.52, 7.8, 1.2);
        group.add(e1);
        var e2 = new THREE.Mesh(eyeGeo, lavaMat.clone());
        e2.position.set(0.52, 7.8, 1.2);
        group.add(e2);
    }

    function createGriffin(group, color, accent) {
        var featherMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.8, metalness: 0.1 });
        var goldMat = new THREE.MeshStandardMaterial({ color: accent, metalness: 0.9, roughness: 0.1 });
        var eyeMat = new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 1.5 });

        // Body
        var bodyGeo = new THREE.SphereGeometry(1.6, 16, 16);
        bodyGeo.scale(1.3, 1, 1.8);
        var body = new THREE.Mesh(bodyGeo, featherMat);
        body.position.y = 4;
        group.add(body);

        // Head
        var headGeo = new THREE.SphereGeometry(0.9, 16, 16);
        var head = new THREE.Mesh(headGeo, featherMat.clone());
        head.position.set(0, 5.6, 1.9);
        group.add(head);

        // Beak
        var beakGeo = new THREE.ConeGeometry(0.35, 1.0, 8);
        var beak = new THREE.Mesh(beakGeo, goldMat);
        beak.position.set(0, 5.3, 2.9);
        beak.rotation.x = Math.PI / 1.7;
        group.add(beak);

        // Wings
        var wingGeo = new THREE.BoxGeometry(4.2, 2.0, 0.15);
        var leftWing = new THREE.Mesh(wingGeo, featherMat.clone());
        leftWing.position.set(-3.7, 5.2, 0);
        leftWing.rotation.set(0.2, 0.4, -0.4);
        group.add(leftWing);
        
        var rightWing = new THREE.Mesh(wingGeo, featherMat.clone());
        rightWing.position.set(3.7, 5.2, 0);
        rightWing.rotation.set(0.2, -0.4, 0.4);
        group.add(rightWing);

        // Claws
        var clawGeo = new THREE.ConeGeometry(0.12, 0.5, 4);
        [-0.6, 0.6].forEach(function (x) {
            for (var c = 0; c < 3; c++) {
                var claw = new THREE.Mesh(clawGeo, goldMat.clone());
                claw.position.set(x + (c - 1) * 0.15, 2.1, 1.8 + c * 0.05);
                claw.rotation.x = Math.PI / 3;
                group.add(claw);
            }
        });

        // Eyes
        var eyeGeo = new THREE.SphereGeometry(0.18, 8, 8);
        var e1 = new THREE.Mesh(eyeGeo, eyeMat);
        e1.position.set(-0.38, 5.8, 2.5);
        group.add(e1);
        var e2 = new THREE.Mesh(eyeGeo, eyeMat.clone());
        e2.position.set(0.38, 5.8, 2.5);
        group.add(e2);

        // Tail
        var tailGeo = new THREE.ConeGeometry(0.25, 3.5, 6);
        var tail = new THREE.Mesh(tailGeo, featherMat.clone());
        tail.position.set(0, 3.5, -3.2);
        tail.rotation.x = -0.9;
        group.add(tail);

        // Glowing wing tips for Griffin
        var wingGlowGeo = new THREE.SphereGeometry(0.22, 8, 8);
        var wingGlowMat = new THREE.MeshStandardMaterial({
            color: accent,
            emissive: accent,
            emissiveIntensity: 2.2
        });
        var leftGlow = new THREE.Mesh(wingGlowGeo, wingGlowMat);
        leftGlow.position.set(-6, 6, 0.5);
        group.add(leftGlow);
        var rightGlow = new THREE.Mesh(wingGlowGeo, wingGlowMat.clone());
        rightGlow.position.set(6, 6, 0.5);
        group.add(rightGlow);
    }

    function createSorcerer(group, color, accent) {
        var robeMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.8, metalness: 0.1 });
        var goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
        var magicMat = new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 2.0 });

        // Robe body
        var robeGeo = new THREE.ConeGeometry(1.9, 5.2, 8);
        var robe = new THREE.Mesh(robeGeo, robeMat);
        robe.position.y = 2.6;
        group.add(robe);

        // Head
        var headGeo = new THREE.SphereGeometry(0.72, 12, 12);
        var headMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
        var head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 5.5;
        group.add(head);

        // Hat
        var hatGeo = new THREE.ConeGeometry(0.85, 2.6, 8);
        var hat = new THREE.Mesh(hatGeo, robeMat.clone());
        hat.position.y = 7.1;
        hat.rotation.x = 0.1;
        group.add(hat);

        // Hat brim
        var brimGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.12, 12);
        var brim = new THREE.Mesh(brimGeo, robeMat.clone());
        brim.position.y = 5.9;
        group.add(brim);

        // Eyes
        var eyeGeo = new THREE.SphereGeometry(0.15, 8, 8);
        var e1 = new THREE.Mesh(eyeGeo, magicMat);
        e1.position.set(-0.25, 5.6, 0.62);
        group.add(e1);
        var e2 = new THREE.Mesh(eyeGeo, magicMat.clone());
        e2.position.set(0.25, 5.6, 0.62);
        group.add(e2);

        // Staff
        var staffGeo = new THREE.CylinderGeometry(0.1, 0.12, 7.2, 8);
        var staffMat = new THREE.MeshStandardMaterial({ color: 0x4e342e, roughness: 0.9 });
        var staff = new THREE.Mesh(staffGeo, staffMat);
        staff.position.set(2.1, 3.6, 0.6);
        staff.rotation.z = -0.18;
        group.add(staff);

        // Staff crown
        var crownGeo = new THREE.BoxGeometry(0.4, 0.5, 0.4);
        var crown = new THREE.Mesh(crownGeo, goldMat);
        crown.position.set(1.8, 7.0, 0.55);
        group.add(crown);

        // Staff orb
        var orbGeo = new THREE.SphereGeometry(0.45, 16, 16);
        var orb = new THREE.Mesh(orbGeo, magicMat.clone());
        orb.position.set(1.75, 7.4, 0.55);
        group.add(orb);

        // Staff orb light
        var orbLight = new THREE.PointLight(accent, 1.2, 8);
        orbLight.position.set(1.75, 7.4, 0.55);
        group.add(orbLight);

        // Floating runes
        for (var i = 0; i < 5; i++) {
            var runeGeo = new THREE.OctahedronGeometry(0.22, 0);
            var rune = new THREE.Mesh(runeGeo, magicMat.clone());
            var angle = (i / 5) * Math.PI * 2;
            rune.position.set(Math.cos(angle) * 3, 3 + Math.sin(i) * 1.5, Math.sin(angle) * 3);
            rune.userData.floatOffset = i;
            group.add(rune);
        }
    }

    function destroyMonsterAnimation(index) {
        var monster = monsters[index];
        if (!monster) return;
        monsterStates[index] = true;

        var startTime = Date.now();
        var duration = 1000;
        (function anim() {
            var t = (Date.now() - startTime) / duration;
            if (t < 1) {
                monster.scale.set(1 - t, 1 - t, 1 - t);
                monster.rotation.y += 0.1;
                monster.position.y += 0.02;
                requestAnimationFrame(anim);
            } else {
                monster.visible = false;
            }
        })();
    }

    /* ══════════════════════════════════════
       TERRAIN & DECORATIONS
       ══════════════════════════════════════ */
    function createTerrain(cfg) {
        // Ground - undulating terrain using PlaneGeometry segment heights
        var groundGeo = new THREE.PlaneGeometry(cfg.pathWidth + 30, cfg.pathLength + 40, 24, 40);
        
        // Add height variations to ground vertices
        var posAttr = groundGeo.attributes.position;
        for (var i = 0; i < posAttr.count; i++) {
            var x = posAttr.getX(i);
            var y = posAttr.getY(i);
            // Keep center path flat by checking x distance
            if (Math.abs(x) > 4) {
                // Procedural hills using trigonometric functions
                var zNoise = Math.sin(x * 0.15) * Math.cos(y * 0.08) * 3.5 + 
                             Math.sin(x * 0.3) * Math.sin(y * 0.2) * 0.8;
                // Fade hills closer to the path
                var pathFactor = Math.min(1, (Math.abs(x) - 4) / 10);
                posAttr.setZ(i, zNoise * pathFactor);
            }
        }
        groundGeo.computeVertexNormals();

        // Create height-based color gradient for terrain
        var count = posAttr.count;
        var colors = [];
        var color1 = new THREE.Color(cfg.colors.ground);
        var color2 = new THREE.Color(cfg.colors.groundAlt || cfg.colors.accent);
        
        for (var i = 0; i < count; i++) {
            var zVal = posAttr.getZ(i);
            // Map height range [-2, 4] to [0, 1]
            var t = Math.max(0, Math.min(1, (zVal + 2) / 6));
            // Add a touch of color noise for organic variance
            var noise = (Math.random() - 0.5) * 0.04;
            var mixed = color1.clone().lerp(color2, Math.max(0, Math.min(1, t + noise)));
            colors.push(mixed.r, mixed.g, mixed.b);
        }
        groundGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        var groundMat = new THREE.MeshStandardMaterial({ 
            vertexColors: true, 
            roughness: 0.9, 
            metalness: 0.05 
        });

        var ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.set(0, -0.1, cfg.pathLength / 2);
        ground.receiveShadow = true;
        worldGroup.add(ground);

        // Path (gradient strip along its entire length)
        var pathGeo = new THREE.PlaneGeometry(6, cfg.pathLength + 10);
        var pathCount = pathGeo.attributes.position.count;
        var pathColors = [];
        var pathColor1 = new THREE.Color(cfg.colors.path || cfg.colors.groundAlt);
        var pathColor2 = new THREE.Color(cfg.colors.accent);
        
        for (var j = 0; j < pathCount; j++) {
            var yVal = pathGeo.attributes.position.getY(j);
            var lengthPct = Math.max(0, Math.min(1, (yVal + cfg.pathLength / 2) / cfg.pathLength));
            var pColor = pathColor1.clone().lerp(pathColor2, lengthPct);
            pathColors.push(pColor.r, pColor.g, pColor.b);
        }
        pathGeo.setAttribute('color', new THREE.Float32BufferAttribute(pathColors, 3));

        var pathMat = new THREE.MeshStandardMaterial({ 
            vertexColors: true,
            roughness: 0.85,
            metalness: 0.1
        });
        var path = new THREE.Mesh(pathGeo, pathMat);
        path.rotation.x = -Math.PI / 2;
        path.position.set(0, 0.01, cfg.pathLength / 2);
        path.receiveShadow = true;
        worldGroup.add(path);

        // Side walls/terrain
        createSideDecorations(cfg);
    }

    function createSideDecorations(cfg) {
        var type = cfg.decorationType;
        var halfWidth = cfg.pathWidth / 2;

        for (var z = 0; z < cfg.pathLength; z += 8) {
            // Left side
            createDecoration(type, -halfWidth - 2 + Math.random() * 6, z + Math.random() * 6, cfg);
            // Right side
            createDecoration(type, halfWidth - 4 + Math.random() * 6, z + Math.random() * 6, cfg);
        }
    }

    function createDecoration(type, x, z, cfg) {
        var group = new THREE.Group();

        switch (type) {
            case 'forest':
                // Trees
                if (Math.random() > 0.3) {
                    var trunkHeight = 3.5 + Math.random() * 3.5;
                    var trunkGeo = new THREE.CylinderGeometry(0.25, 0.45, trunkHeight, 8);
                    var trunkMat = new THREE.MeshStandardMaterial({ color: 0x4e342e, roughness: 0.95, metalness: 0.0 });
                    var trunk = new THREE.Mesh(trunkGeo, trunkMat);
                    trunk.position.y = trunkHeight / 2;
                    group.add(trunk);
                    
                    // Detailed leaf canopy with multiple overlapping spheres
                    var leavesMat = new THREE.MeshStandardMaterial({ color: cfg.colors.decoration, roughness: 0.85 });
                    var canopyCount = 3 + Math.floor(Math.random() * 3);
                    for (var l = 0; l < canopyCount; l++) {
                        var leafR = 1.2 + Math.random() * 1.5;
                        var leavesGeo = new THREE.SphereGeometry(leafR, 8, 8);
                        var leaves = new THREE.Mesh(leavesGeo, leavesMat);
                        // Offset each leaf cluster
                        leaves.position.set(
                            (Math.random() - 0.5) * 1.2,
                            trunkHeight + (l * 0.8) - 0.5,
                            (Math.random() - 0.5) * 1.2
                        );
                        group.add(leaves);
                    }
                } else {
                    // Mushrooms / plants
                    var stemGeo = new THREE.CylinderGeometry(0.15, 0.25, 0.7, 8);
                    var stemMat = new THREE.MeshStandardMaterial({ color: 0xddddcc, roughness: 0.8 });
                    var stem = new THREE.Mesh(stemGeo, stemMat);
                    stem.position.y = 0.35;
                    group.add(stem);

                    var capGeo = new THREE.SphereGeometry(0.6, 12, 12);
                    capGeo.scale(1, 0.6, 1);
                    var capMat = new THREE.MeshStandardMaterial({ 
                        color: cfg.colors.accent, 
                        emissive: cfg.colors.particle, 
                        emissiveIntensity: 0.4,
                        roughness: 0.6
                    });
                    var cap = new THREE.Mesh(capGeo, capMat);
                    cap.position.y = 0.7;
                    group.add(cap);
                }
                break;

            case 'crystal':
                // Crystal cluster formation
                var clusterSize = 1 + Math.floor(Math.random() * 3);
                var crystalMat = new THREE.MeshStandardMaterial({
                    color: cfg.colors.accent, 
                    transparent: true, 
                    opacity: 0.85,
                    emissive: cfg.colors.particle, 
                    emissiveIntensity: 0.6, 
                    metalness: 0.9,
                    roughness: 0.05
                });
                
                for (var cr = 0; cr < clusterSize; cr++) {
                    var w = 0.4 + Math.random() * 0.7;
                    var h = 2.0 + Math.random() * 3.5;
                    var crystalGeo = new THREE.ConeGeometry(w, h, 6);
                    var crystal = new THREE.Mesh(crystalGeo, crystalMat);
                    crystal.position.set((cr - 1) * 0.5, h / 2, (Math.random() - 0.5) * 0.5);
                    crystal.rotation.set(
                        (Math.random() - 0.5) * 0.3,
                        Math.random() * Math.PI,
                        (Math.random() - 0.5) * 0.3 + (cr - 1) * 0.15
                    );
                    group.add(crystal);
                }
                break;

            case 'volcanic':
                // Jagged obsidian rocks and lava pools
                if (Math.random() > 0.4) {
                    var rockSize = 1.0 + Math.random() * 1.5;
                    var rockGeo = new THREE.DodecahedronGeometry(rockSize, 0);
                    var rockMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.2, metalness: 0.9 });
                    var rock = new THREE.Mesh(rockGeo, rockMat);
                    rock.position.y = rockSize * 0.6;
                    rock.rotation.set(Math.random(), Math.random(), Math.random());
                    group.add(rock);
                } else {
                    // Lava pool with light glow
                    var lavaSize = 1.2 + Math.random() * 1.8;
                    var lavaGeo = new THREE.CircleGeometry(lavaSize, 16);
                    var lavaMat = new THREE.MeshStandardMaterial({
                        color: 0xff3300, 
                        emissive: 0xff1100, 
                        emissiveIntensity: 1.5,
                        side: THREE.DoubleSide,
                        roughness: 0.4
                    });
                    var lava = new THREE.Mesh(lavaGeo, lavaMat);
                    lava.rotation.x = -Math.PI / 2;
                    lava.position.y = 0.05;
                    group.add(lava);

                    // Tiny point light for lava glow
                    var lavaLight = new THREE.PointLight(0xff3300, 0.5, 6);
                    lavaLight.position.set(0, 0.4, 0);
                    group.add(lavaLight);
                }
                break;

            case 'sky':
                // Classic columns and clouds
                if (Math.random() > 0.5) {
                    var columnHeight = 6 + Math.random() * 4;
                    var colGeo = new THREE.CylinderGeometry(0.42, 0.52, columnHeight, 16);
                    var colMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.2, metalness: 0.1 });
                    var col = new THREE.Mesh(colGeo, colMat);
                    col.position.y = columnHeight / 2;
                    group.add(col);
                    
                    // Pedestal cap
                    var capGeo = new THREE.BoxGeometry(1.4, 0.5, 1.4);
                    var cap = new THREE.Mesh(capGeo, colMat.clone());
                    cap.position.y = columnHeight + 0.25;
                    group.add(cap);
                } else {
                    // Styled Cloud
                    var cloudGroup = new THREE.Group();
                    var cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.7, roughness: 0.85 });
                    for (var c = 0; c < 4; c++) {
                        var puffR = 1.0 + Math.random() * 1.2;
                        var puffGeo = new THREE.SphereGeometry(puffR, 8, 8);
                        var puff = new THREE.Mesh(puffGeo, cloudMat);
                        puff.position.set(c * 1.3 - 1.9, 0, (Math.random() - 0.5) * 0.8);
                        puff.scale.y = 0.55;
                        cloudGroup.add(puff);
                    }
                    cloudGroup.position.y = 3.5 + Math.random() * 5.0;
                    group.add(cloudGroup);
                }
                break;

            case 'dungeon':
                // Obsidian stone blocks, skull debris, or glowing torches
                if (Math.random() > 0.5) {
                    var h = 4.5 + Math.random() * 4.0;
                    var wallGeo = new THREE.BoxGeometry(2.5, h, 1.2);
                    var wallMat = new THREE.MeshStandardMaterial({ color: 0x1d1d2c, roughness: 0.85 });
                    var wall = new THREE.Mesh(wallGeo, wallMat);
                    wall.position.y = h / 2;
                    group.add(wall);
                    
                    // Glowing Wall Torch
                    if (Math.random() > 0.5) {
                        var torchHolderGeo = new THREE.BoxGeometry(0.12, 1.0, 0.12);
                        var torchHolderMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, metalness: 0.5 });
                        var holder = new THREE.Mesh(torchHolderGeo, torchHolderMat);
                        holder.position.set(0, h * 0.7, 0.7);
                        holder.rotation.x = 0.3;
                        group.add(holder);

                        var torchLight = new THREE.PointLight(cfg.colors.accent, 1.0, 10);
                        torchLight.position.set(0, h * 0.7 + 0.5, 0.9);
                        group.add(torchLight);
                        
                        var flameGeo = new THREE.SphereGeometry(0.2, 8, 8);
                        var flameMat = new THREE.MeshStandardMaterial({ color: cfg.colors.accent, emissive: cfg.colors.accent, emissiveIntensity: 2.2 });
                        var flame = new THREE.Mesh(flameGeo, flameMat);
                        flame.position.set(0, h * 0.7 + 0.5, 0.9);
                        group.add(flame);
                    }
                } else {
                    // Debris (remains)
                    var skullGeo = new THREE.SphereGeometry(0.35, 12, 12);
                    var skullMat = new THREE.MeshStandardMaterial({ color: 0xdedeca, roughness: 0.9 });
                    var skull = new THREE.Mesh(skullGeo, skullMat);
                    skull.position.y = 0.35;
                    group.add(skull);
                }
                break;
        }

        group.position.set(x, 0, z);
        group.traverse(function (child) {
            if (child.isMesh) { child.castShadow = true; child.receiveShadow = true; }
        });
        worldGroup.add(group);
        decorations.push(group);
    }

    /* ══════════════════════════════════════
       PARTICLES
       ══════════════════════════════════════ */
    function createParticles(cfg) {
        var count = 120;
        var geo = new THREE.BufferGeometry();
        var positions = new Float32Array(count * 3);
        var colors = new Float32Array(count * 3);

        var color = new THREE.Color(cfg.colors.particle);
        for (var i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * cfg.pathWidth * 1.5;
            positions[i * 3 + 1] = 1 + Math.random() * 10;
            positions[i * 3 + 2] = Math.random() * cfg.pathLength;
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        var mat = new THREE.PointsMaterial({
            size: 0.3, vertexColors: true, transparent: true, opacity: 0.6,
            blending: THREE.AdditiveBlending, depthWrite: false
        });
        var pts = new THREE.Points(geo, mat);
        worldGroup.add(pts);
        particles.push({ points: pts, speed: 0.5 + Math.random() * 0.5 });
    }

    /* ══════════════════════════════════════
       LIGHTING
       ══════════════════════════════════════ */
    function createLighting(cfg) {
        var ambient = new THREE.AmbientLight(cfg.colors.ambient, 0.6);
        worldGroup.add(ambient);

        var dir = new THREE.DirectionalLight(cfg.colors.directional, 1.0);
        dir.position.set(12, 24, 12);
        dir.castShadow = true;
        dir.shadow.mapSize.width = 2048;
        dir.shadow.mapSize.height = 2048;
        dir.shadow.camera.near = 0.5;
        dir.shadow.camera.far = 120;
        dir.shadow.camera.left = -40;
        dir.shadow.camera.right = 40;
        dir.shadow.camera.top = 40;
        dir.shadow.camera.bottom = -40;
        dir.shadow.bias = -0.0005;
        worldGroup.add(dir);

        // Hemisphere light for better ambient
        var hemi = new THREE.HemisphereLight(cfg.colors.directional, cfg.colors.ground, 0.45);
        worldGroup.add(hemi);
    }

    /* ══════════════════════════════════════
       UPDATE (animate particles, monsters)
       ══════════════════════════════════════ */
    var animTime = 0;
    function update(delta) {
        animTime += delta;

        // Float particles
        particles.forEach(function (p) {
            var positions = p.points.geometry.attributes.position.array;
            for (var i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(animTime * p.speed + i) * 0.005;
                positions[i] += Math.sin(animTime * 0.3 + i * 0.1) * 0.003;
            }
            p.points.geometry.attributes.position.needsUpdate = true;
        });

        // Animate monsters (idle)
        monsters.forEach(function (m, i) {
            if (monsterStates[i]) return;
            m.rotation.y = Math.sin(animTime * 0.5 + i) * 0.1;
            m.position.y = Math.sin(animTime + i) * 0.15;
        });
    }

    /* ══════════════════════════════════════
       PROXIMITY CHECKS
       ══════════════════════════════════════ */
    function checkGateProximity(playerPos) {
        for (var i = 0; i < gates.length; i++) {
            if (gateStates[i]) continue;
            var gatePos = gates[i].position;
            var dist = playerPos.distanceTo(gatePos);
            if (dist < 8) {
                return { nearGate: true, gateIndex: i };
            }
        }
        return null;
    }

    function checkMonsterProximity(playerPos) {
        for (var i = 0; i < monsters.length; i++) {
            if (monsterStates[i]) continue;
            var monsterPos = monsters[i].position;
            var dist = playerPos.distanceTo(monsterPos);
            if (dist < 10) {
                return { nearMonster: true, monsterIndex: i };
            }
        }
        return null;
    }

    /* ══════════════════════════════════════
       PUBLIC API
       ══════════════════════════════════════ */
    window.Game.World = {
        init: function (sc, cfg) {
            scene = sc;
            config = cfg;
            worldGroup = new THREE.Group();
            gates = [];
            monsters = [];
            particles = [];
            decorations = [];
            gateStates = [];
            monsterStates = [];
            animTime = 0;

            // Set scene fog & background
            scene.fog = new THREE.Fog(cfg.colors.fog, cfg.fogNear, cfg.fogFar);
            scene.background = new THREE.Color(cfg.colors.sky);

            // Build world
            createTerrain(cfg);
            createLighting(cfg);
            createParticles(cfg);

            // Build gates
            cfg.gatePositions.forEach(function (pos) {
                var gate = createGate(pos, cfg.colors.gate, cfg.colors.gateGlow);
                gates.push(gate);
                gateStates.push(false);
                worldGroup.add(gate);
            });

            // Build monsters
            cfg.monsterPositions.forEach(function (pos) {
                var monster = createMonster(pos, cfg.monsterType, cfg.colors.monster, cfg.colors.monsterAccent);
                monsters.push(monster);
                monsterStates.push(false);
                worldGroup.add(monster);
            });

            scene.add(worldGroup);
        },

        clear: function () {
            if (worldGroup && scene) {
                scene.remove(worldGroup);
                // Dispose geometries and materials
                worldGroup.traverse(function (child) {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(function (m) { m.dispose(); });
                        } else {
                            child.material.dispose();
                        }
                    }
                });
            }
            worldGroup = null;
            gates = [];
            monsters = [];
            particles = [];
            decorations = [];
            gateStates = [];
            monsterStates = [];
            if (scene) scene.fog = null;
        },

        update: update,
        checkGateProximity: checkGateProximity,
        checkMonsterProximity: checkMonsterProximity,
        openGate: openGateAnimation,
        destroyMonster: destroyMonsterAnimation,
        isGateOpen: function (i) { return gateStates[i] || false; },
        isMonsterDefeated: function (i) { return monsterStates[i] || false; },
        getGateCount: function () { return gates.length; },
        getMonsterCount: function () { return monsters.length; }
    };
})();
