import React, { useEffect, useState } from "react";
import Scene from "./Scene";
// import history from "history/browser";
import useKeyPress from "./hooks/useKeyPress";

function Key({
  children,
  onKeyPress,
  keyPress = children,
  style,
  ...props
}: {
  children: string;
  keyPress: string;
  onKeyPress: () => any;
  style: object;
}) {
  const pressed = useKeyPress(keyPress);

  useEffect(() => {
    if (onKeyPress && pressed) {
      onKeyPress();
    }
  }, [pressed]);

  return (
    <button
      style={{
        ...style,
        border: "1px solid gray",
        borderRadius: 2,
        fontWeight: pressed ? "bold" : "normal",
        ...(pressed && { backgroundColor: "yellow" }),
      }}
      {...props}
    >
      {children}
    </button>
  );
}

const SIZE = {
  X: 10,
  Y: 10,
};

function Mario({ position: { x, y } }: { position: { x: number; y: number } }) {
  return (
    <div
      style={{
        width: "1em",
        height: "1em",
        border: "1px solid blue",
        transform: `translate(${x}em, ${y}em)`,
      }}
    >
      M
    </div>
  );
}

function Board({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: `${SIZE.X}em`,
        height: `${SIZE.Y}em`,
        border: "1px solid gray",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [counter, setCounter] = useState(0);
  const [position, setPosition] = useState(() => ({ x: 1, y: 1 }));

  return (
    <section>
      <h1>Mario</h1>
      <button onClick={(e) => setCounter((counter) => counter + 1)}>
        {counter}
      </button>
      <pre>{JSON.stringify({ counter }, null, 2)}</pre>
      <Key>w</Key>
      <Key>a</Key>
      <Key onKeyPress={() => setCounter((counter) => counter + 1)}>s</Key>
      <Key>d</Key>
      <Key>x</Key>
      <div
        style={{
          alignItems: "center",
          display: "grid",
          gridTemplateColumns: "2em 2em 2em",
          gridTemplateRows: "2em 2em 2em",
          textAlign: "center",
        }}
      >
        <Key
          style={{ gridArea: "1 / 2" }}
          keyPress="ArrowUp"
          onKeyPress={() =>
            setPosition((position) =>
              position.y > 0 ? { ...position, y: position.y - 1 } : position
            )
          }
        >
          ↑
        </Key>
        <Key
          style={{ gridArea: "2 / 1" }}
          keyPress="ArrowLeft"
          onKeyPress={() =>
            setPosition((position) =>
              position.x > 0 ? { ...position, x: position.x - 1 } : position
            )
          }
        >
          ←
        </Key>
        <Key
          style={{ gridArea: "2 / 3" }}
          keyPress="ArrowRight"
          onKeyPress={() =>
            setPosition((position) =>
              position.x < SIZE.X - 1
                ? { ...position, x: position.x + 1 }
                : position
            )
          }
        >
          →
        </Key>
        <Key
          style={{ gridArea: "3 / 2" }}
          keyPress="ArrowDown"
          onKeyPress={() =>
            setPosition((position) =>
              position.y < SIZE.Y - 1
                ? { ...position, y: position.y + 1 }
                : position
            )
          }
        >
          ↓
        </Key>
      </div>
      <Board>
        <Mario position={position} />
      </Board>
      <pre>{JSON.stringify(position, null, 2)}</pre>
      <Scene />
    </section>
  );
}
