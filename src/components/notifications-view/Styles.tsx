import styled from 'styled-components';

export const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

export const StyledNotificationsView = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #262626;
  z-index: ${(p) => (p.visible ? 11 : 10)};
  transition: transform 0.5s ease, opacity 0.3s ease;
  transform: ${(p) => (p.visible ? 'scale(100%)' : 'scale(80%)')};
  opacity: ${(p) => (p.visible ? '1' : '0')};
`;

export const NotifHistory = styled.h1`
  font-family: sans-serif;
  font-weight: bold;
  color: #878787;
  top: 15px;
  left: 45px;
  margin: 0;
  font-size: 20px;
  user-select: none;
`;

export const DeleteAll = styled.i<{ disabled: boolean }>`
  display: flex;
  height: 25px;
  position: relative;
  right: 15px;
  top: -3px;
  fill: #878787;
  cursor: pointer;

  ${(p) => p.disabled && 'visibility: hidden'};

  #lid {
    transform-origin: 75px 85px;
    transition: transform 0.3s ease;
  }

  :hover {
    fill: white;

    :after {
      opacity: 1;
      transform: translate(-110%, -50%);
    }

    svg {
      #layer1 {
        #lid {
          transform: rotate(-15deg);
        }
      }
    }
  }

  ::after {
    content: 'Clear history';
    position: absolute;
    padding: 5px;
    background: #424242;
    color: white;
    font-family: sans-serif;
    font-style: normal;
    left: 0px;
    top: 50%;
    transform: translate(-90%, -50%);
    width: max-content;
    border-radius: 3px;
    font-size: 15px;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
    box-shadow: -4px 4px 4px 0px rgb(0 0 0 / 50%);
  }
`;

export const NotifsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  height: auto;
  padding: 15px 0;
  border-top: 2px solid grey;
`;

export const Notif = styled.div<{ live: boolean }>`
  width: 90%;
  height: 45px;
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 3px;
  margin-top: 7px;
  flex-direction: column;
  filter: brightness(0.9);
  overflow-x: hidden;
  background: ${(p) => (p.live ? '#03d270' : '#605a5a')};
  box-shadow: 0px 3px 3px rgba(0 0 0 / 50%);
`;

export const Name = styled.p`
  font-size: 22px;
  margin: 0 10px;
  margin-top: -20px;
  font-weight: 700;
  text-transform: capitalize;
  transition: margin 0.3s ease;
  color: white;
  font-family: system-ui;
  width: fit-content;
  text-shadow: 2px 2px 4px #00000085;
  user-select: none;
`;

export const Status = styled.p`
  margin: 0;
  position: absolute;
  left: 10px;
  bottom: 3px;
  font-weight: bold;
  font-size: 14px;
  transition: margin 0.3s ease;
  color: white;
  font-family: system-ui;
  width: fit-content;
  text-shadow: 2px 2px 4px #00000085;
  user-select: none;
`;

export const Date = styled.p`
  color: white;
  font-family: system-ui;
  width: fit-content;
  text-shadow: 2px 2px 4px #00000085;
  user-select: none;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  margin: 0;
  font-weight: bold;
`;

export const Exit = styled.div`
  position: relative;
  top: -3px;
  left: 15px;
  width: 14px;
  fill: #808080;
  transition: fill 0.3s ease;
  cursor: pointer;

  :hover {
    fill: white;
  }
`;
