import styled from "styled-components/native";

export const SideMenuStyles = {
  container: styled.View`
    width: 100%;
    height: 100%;
    background-color: blue;
  `,
  menuRowContainer: styled.View`
    margin: 10;
    padding: 10;
    background-color: red;
  `,
  menuRowButton: styled.TouchableOpacity`
    width: 100%;
    height: 25;
  `,
  menuRowSeparator: styled.View`
    flex: 1;
    height: 1;
    background-color: #000;
  `
};