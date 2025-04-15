import React, { useEffect } from "react";

const AnimateBgBoxes = () => {
  const createAnimatedBackground = () => {
    const numberOfBoxes = 30; // Number of animated boxes
    const container = document.querySelector("#background");

    // Remove existing boxes (useful if re-rendering)
    container.innerHTML = "";

    for (let i = 0; i < numberOfBoxes; i++) {
      const box = document.createElement("div");
      box.classList.add("box");

      // Randomize size
      const size = Math.random() * 100 + 20; // Random size between 20px and 70px
      box.style.width = `${size}px`;
      box.style.height = `${size}px`;

      // Randomize position
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      box.style.left = `${posX}px`;
      box.style.top = `${posY}px`;

      // Randomize colors
      const randomColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      box.style.backgroundColor = randomColor;

      // Randomize animation duration
      const duration = Math.random() * 5 + 5; // Between 5s and 10s
      box.style.animationDuration = `${duration}s`;

      container.appendChild(box);
    }
  };

  useEffect(() => {
    createAnimatedBackground();
  }, []); // Only run on component mount

  return (
    <div id="background" className="background">
      {/* Other content goes here */}
    </div>
  );
};

export default AnimateBgBoxes;
