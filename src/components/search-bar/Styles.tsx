import styled from 'styled-components';

export const StyledSearchBar = styled.div`
  width: 100%;
  border-radius: 3px;
  position: relative;
  display: flex;
  transition: background-color 0.3s, transform 0.5s ease-in-out;
  justify-content: flex-start;
  flex-direction: column;
  transform: translateX(0);
`;

export const Form = styled.form<{ hide: boolean }>`
  display: ${(p) => (p.hide ? 'none' : 'flex')};
  width: 90%;
  align-self: center;
  z-index: 1;
  margin-top: 25px;
  position: relative;
  box-shadow: 0px 4px 5px 0px rgb(0 0 0 / 40%);
  border-radius: 3px;
  overflow: hidden;
`;

export const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  padding: 0 15px;
  background-color: #202020;
  position: relative;
  z-index: 1;

  :hover {
    background: rgba(255, 255, 255, 0.1);
  }

  :disabled {
    cursor: default;
    filter: brightness(0.5);
    pointer-events: none;
  }
`;

export const SearchIcon = styled.i`
  display: flex;
  width: 20px;
`;

export const Input = styled.input`
  box-sizing: border-box;
  outline: none;
  color: white;
  padding: 5px 10px 5px 10px;
  background-color: #202020;
  border: none;
  width: -webkit-fill-available;
  height: 45px;
  font-size: 25px;
  border-radius: 0 3px 3px 0;
  font-family: system-ui;
  min-width: 0;
  user-select: none;
  transition: background-color 0.3s ease;

  :focus {
    background-color: #3a3a3a;
  }

  :disabled {
    filter: brightness(0.5);
  }
`;

export const Cross = styled.div<{ visible: boolean; slide: boolean }>`
  visibility: ${(p) => (p.visible ? 'visible' : 'hidden')};
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%) translateX(${(p) => (p.slide ? '-50px' : '0')});
  height: 20px;
  width: 20px;
  cursor: pointer;
  padding: 2px;
  border-radius: 3px;
  transition: transform 0.5s ease;

  div {
    background-color: rgba(255, 255, 255, 0.644);
    width: 20px;
    height: 2px;
    position: absolute;
    top: 50%;

    :first-child {
      transform: rotate(45deg);
    }

    :last-child {
      transform: rotate(-45deg);
    }
  }

  :hover {
    background: #7777775d;
    div {
      background-color: white;
    }
  }
`;

export const BackButton = styled.button<{ visible: boolean }>`
  position: absolute;
  z-index: 1;
  border: none;
  right: 0px;
  color: #adadad;
  font-weight: bold;
  transform: translateX(${(P) => (P.visible ? '0' : '100%')});
  transition: transform 0.5s ease;
  border-radius: 0 3px 3px 0;
  height: 45px;
  padding: 0 15px;
  background-color: #343434;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    width: 20px;
    fill: #acacac;
    cursor: pointer;
  }

  :hover {
    svg {
      fill: white;
    }
  }
`;
