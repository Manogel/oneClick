import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const BoxImage = styled.View`
  margin-top: 30;
  align-items: center;
`;

export const BorderImage = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 50;
  border-width: 1px;
  width: 100;
  height: 100;
  border-color: #999;
`;

export const BoxInfo = styled.View`
  padding: 15px;
  border-bottom-width: 1;
  border-bottom-color: #ddd;
  padding-left: 8;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
export const TextInfo = styled.Text`
  font-size: 14;
  margin-left: 20;
`;

export const Input = styled.TextInput`
  justify-content: flex-start;
  margin-left: 20;
  padding: 0;
  border-bottom-width: 1;
  border-bottom-color: #33e0ff;
`;

export const ContainerInfo = styled.View`
  padding: 20px;
  margin-top: 10;
`;

export const ButtonEdit = styled.TouchableOpacity`
  height: 44;
  background-color: #7a91ca;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 4px;
  justify-content: center;
  align-items: center;
  margin-horizontal: 30px;
  margin-bottom: 40px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16;
`;
