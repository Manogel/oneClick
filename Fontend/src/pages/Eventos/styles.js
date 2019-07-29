import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #eee;
`;

export const ContainerError = styled.View`
  flex: 1;
  justify-content: center;
  margin-horizontal: 10px;
  flex-direction: column;
`;

export const TitleError = styled.Text`
  color: #f00;
  font-size: 14px;
  font-weight: bold;
  padding: 14px;
  text-align: center;
  background-color: #fff;
  border-radius: 4px;
`;

export const BoxButton = styled.View`
  position: absolute;
  align-items: flex-end;
  justify-content: flex-end;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const ButtonAdd = styled.TouchableOpacity`
  background-color: #fff;
  border-width: 1px;
  border-color: #385774;
  width: 50;
  height: 50;
  border-radius: 50;
  align-items: center;
  justify-content: center;
  elevation: 10px;
  opacity: 0.9;
`;
