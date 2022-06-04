import styled from "styled-components";

export const StyledSettings = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 100%;
  background-color: #262626;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: ${(p) => (p.visible ? 11 : 10)};
  transform: ${(p) => (p.visible ? "scale(100%)" : "scale(80%)")};
  align-items: baseline;
  padding: 45px 15px 0 15px;
  box-sizing: border-box;
  transition: transform 0.5s ease, opacity 0.3s ease;
  opacity: ${(p) => (p.visible ? "1" : "0")};
  /* visibility: ${(p) => (p.visible ? "visible" : "hidden")}; */
`;

export const ExitSettings = styled.div`
  position: absolute;
  top: 5px;
  right: 15px;
  width: 30px;
  height: 30px;

  div {
    background-color: #878787;
    width: 3px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;

    :first-child {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    :last-child {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  :hover {
    border-color: white;

    div {
      background-color: white;
    }
  }
`;

export const Title = styled.h1`
  font-family: sans-serif;
  font-weight: bold;
  color: #878787;
  position: absolute;
  top: 10px;
  margin: 0;
  font-size: 20px;
  user-select: none;
`;

export const Setting = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #52525245;
  padding: 10px 0;
  justify-content: space-between;
`;

export const Label = styled.p`
  font-family: sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: white;
  margin: 0;
  user-select: none;
`;

export const Checkbox = styled.div<{ enabled: boolean }>`
  width: 45px;
  border-radius: 15px;
  background-color: ${(p) => (p.enabled ? "rgb(0, 161, 81)" : "gray")};
  padding: 2px;
  box-sizing: border-box;
  margin-left: 20px;
  transition: filter 0.3s ease;
  cursor: pointer;

  :hover {
    filter: brightness(120%);
  }
`;

export const Switch = styled.div<{ enabled: boolean }>`
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: white;
  position: relative;
  transform: ${(p) => (p.enabled ? "translateX(100%)" : "")};
  transition: transform 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }

  :active {
    transform: ${(p) => (p.enabled ? "translateX(90%)" : "translateX(10%)")};
  }
`;

export const SwitchCross = styled.path<{ enabled: boolean }>`
  stroke: gray;
  stroke-width: 2px;
  fill: none;
  stroke-dasharray: 35;
  stroke-dashoffset: ${(p) => (p.enabled ? -25 : 21)};
  transition: stroke-dashoffset 0.5s ease, stroke 0.5s ease;
`;

export const Token = styled.p`
  font-family: sans-serif;
  font-weight: bold;
  color: white;
  margin: 0;
  user-select: none;
  font-size: 12px;
  background-color: #464646;
  padding: 5px 5px;
  border-radius: 3px;
  border: 2px solid #2c2c2c;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  min-width: 180px;

  :before {
    content: "";
    position: absolute;
    transform: translate(-50%, -100%);
    top: 17px;
    left: 50%;
    border-left: solid 8px transparent;
    border-right: solid 8px transparent;
    border-top: solid 8px #2c2c2c;
    z-index: 1;
    visibility: hidden;
    opacity: 0;
  }

  :after {
    content: "Click to get a new token";
    font-family: sans-serif;
    color: white;
    background-color: #2c2c2c;
    box-shadow: 0 0 10px 4px rgb(0 0 0 / 50%);
    text-align: center;
    position: absolute;
    transform: translate(-50%, -100%);
    top: 10px;
    left: 50%;
    padding: 10px;
    border-radius: 3px;
    visibility: hidden;
    opacity: 0;
  }

  :hover {
    background-color: #5e5e5e;

    :before {
      transition: opacity 0.3s 0.3s, top 0.3s 0.3s, visibility 0s 0.2s;
      opacity: 1;
      top: -3px;
      visibility: visible;
    }

    :after {
      transition: opacity 0.3s 0.3s, top 0.3s 0.3s, visibility 0s 0.2s;
      opacity: 1;
      top: -10px;
      visibility: visible;
    }
  }
`;

export const HintTitle = styled.p`
  color: #9b9b9b;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 24px;
  margin: 15px 0 0 0;
  user-select: none;
`;

export const Hint = styled.p`
  color: #a3a3a3;
  font-family: sans-serif;
  font-weight: normal;
  font-size: 14px;
  margin: 5px 0 0 0;
  user-select: none;
`;

export const Info = styled.div`
  border: none;
  padding: 10px 15px;
  font-family: sans-serif;
  color: white;
  background-color: rgb(60, 60, 60);
  position: absolute;
  bottom: 15px;
  border-radius: 5px;
  box-shadow: -5px 5px 5px 1px rgb(0 0 0 / 33%);
  user-select: none;

  :hover {
    background-color: rgb(43, 43, 43);
  }
`;
