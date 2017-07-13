import styled from "styled-components/native";

export const SideMenuStyles = {
  container: styled.View`
    width: 100%;
    height: 100%;
    background-color: blue;
  `,
  menuRowContainer: styled.View`
    margin: 10px;
    padding: 10px;
    background-color: red;
  `,
  menuRowButton: styled.TouchableOpacity`
    width: 100%;
    height: 25px;
  `,
  menuRowSeparator: styled.View`
    flex: 1;
    height: 1px;
    background-color: #000;
  `
};