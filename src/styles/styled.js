import styled from "styled-components";

export const Panel = styled.div`
  border: 3px solid black;
  border-radius: 0.3em;
  width: 350px;
  margin: 10px;
  padding: 20px;
  text-align: center;
`;

export const InputPrice = styled.input`
  width: 30px;
  margin: 0px 10px;
  font-size: 18px;
  border: none;
  text-align: end;
`;

export const BtnPage = styled.button`
  background-color: #f67754;
  border: 1px solid #f67754;
  color: white;
  width: 30px !important;
  height: 30px !important;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
