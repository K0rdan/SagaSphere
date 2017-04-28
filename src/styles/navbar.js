import styled from "styled-components/native";
import burgerImageSrc from "./images/icon_burger_menu.png";

export const NavBar = {
  container: styled.View`
    width: 100%;
    height: 10%;
    background-color: red;
    flex-direction: row;
  `,
  burgerButton: styled.TouchableOpacity`
    width: 20%;
    height: 100%;
    justify-content: center;
    align-items: flex-start;
  `,
  burgerImage: styled.Image`
    margin-top: 0;
    margin-right: auto;
    margin-bottom: 0;
    margin-left: auto;
    resize-mode: contain;
  `,
  burgerImageSrc: burgerImageSrc,
  title: styled.Text`
    text-align: center;
    text-align-vertical: center;
  `
};