import { useEffect, useState } from "react";

export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isButtonInvisible, setIsButtonInvisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
      setIsButtonInvisible(false);
    }, 2000);
  }, []);

  return (
    <div>
      <div>Hello World</div>
      {isButtonVisible && <button>Click me</button>}
      {isButtonInvisible && <button>Click me 2</button>}
    </div>
  );
}
