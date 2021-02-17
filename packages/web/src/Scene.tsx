import React, { useEffect, useRef } from "react";
import {
  Bodies,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  World,
} from "matter-js";

export default function Scene() {
  const ref = useRef();

  useEffect(() => {
    const engine = Engine.create({
      // positionIterations: 20
    });

    var render = Render.create({
      element: ref.current,
      engine: engine,
      options: {
        width: 600,
        height: 600,
        wireframes: false,
      },
    });

    var ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });
    var ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });
    World.add(engine.world, [
      // walls
      Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
      Bodies.rectangle(200, 600, 600, 50, { isStatic: true }),
      Bodies.rectangle(260, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
    ]);

    World.add(engine.world, [ballA, ballB]);

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    World.add(engine.world, mouseConstraint);

    Events.on(mouseConstraint, "mousedown", function (event) {
      World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    });

    Engine.run(engine);
    Render.run(render);
  }, [ref]);

  return <div ref={ref} />;
}
