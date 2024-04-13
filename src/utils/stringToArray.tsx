import React from "react";

const stringToArray = (inputString: string): string[] => {
  const character: string[] = [];
  const regex = /[\s\S]/gu;
  let match;
  while ((match = regex.exec(inputString)) != null) {
    character.push(match[0]);
  }
  return character;
};

export default stringToArray;
