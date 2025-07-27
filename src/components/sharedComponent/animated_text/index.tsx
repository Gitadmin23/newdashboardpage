import React from 'react' 

export default function AnimatedText(text:string) {
  return (
    <div className="animated-text">
      {text.split('').map((char: string, index: number) => (
        <span key={index}>{char}</span>
      ))}
    </div>
  );
};
