import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)<{ visible: boolean }>`
  width: 100%;
  height: max-content;
  visibility: ${(p) => (p.visible ? "visible" : "hidden")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  overflow-y: hidden;
`;

export const StyledUtilBar = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
  position: absolute;
  top: 5px;
`;

export const StyledLabel = styled.p`
  margin: 0;
  margin-top: 5px;
  color: rgb(201, 201, 201);
  font-family: system-ui;
  font-weight: bold;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 3px;
  background-color: #cecece2d;
  padding: 5px;
  opacity: 0.7;
  /* position: absolute; */
  /* top: 5px; */
  transition: all 0.3s;

  :hover {
    color: white;
    opacity: 1;
  }
`;

//////////////////
// SEARCHRESULT //
//////////////////

export const StyledResult = styled.div`
  display: flex;
  width: 90%;
  height: 50px;
  background-color: #181819;
  border-radius: 5px;
  margin-bottom: 8px;
  align-items: center;
  transition: 0.3s ease-out;
  position: relative;
  box-shadow: 5px 5px 10px 1px rgb(0 0 0 / 30%);

  :hover {
    background-color: #2e2e2e;
  }
`;

export const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 15px;
`;

export const StyledName = styled.h1`
  color: #dddddd;
  font-size: 25px;
  font-family: system-ui;
  pointer-events: none;
  max-width: 60%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;

export const StyledAdd = styled.h2<{ saved: boolean }>`
  color: ${(p) => (p.saved ? "#00ef76" : "#dddddd")};
  font-size: 18px;
  font-family: system-ui;
  position: absolute;
  right: 15px;
  cursor: ${(p) => (p.saved ? "default" : "pointer")};
  user-select: none;

  :hover {
    color: white;
  }
`;
