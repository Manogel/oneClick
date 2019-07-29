import styled from "styled-components";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const Container = styled.View`
  background-color: #385774;
  height: ${54 + getStatusBarHeight()};
  padding-top: ${getStatusBarHeight()};
  border-bottom-width: 2;
  border-bottom-color: #7a91ca;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

/*
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: 54 + getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#999'
  },
  icon: {
    color: '#999'
}
);

export default styles; */
