import React, { useEffect, useState } from "react";
// import history from "history/browser";
import useKeyPress from "./hooks/useKeyPress";

const Key = ({
  children,
  onKeyPress,
}: {
  children: string;
  onKeyPress: () => any;
}) => {
  const pressed = useKeyPress(children);

  useEffect(() => {
    if (onKeyPress && pressed) {
      onKeyPress();
    }
  }, [pressed]);

  return (
    <button style={{ fontWeight: pressed ? "bold" : "normal" }}>
      {children}
    </button>
  );
};

export default () => {
  const [counter, setCounter] = useState(0);

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
    </section>
  );
};
