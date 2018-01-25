import styled from "styled-components/native";
import burgerImageSrc from "./images/icon_burger_menu.png";

export const NavBar = {
  container: styled.View`
    flex: 0.1;
    width: 100%;
    height: 10%;
    background-color: red;
    flex-direction: row;
    padding-left: 5%;
    padding-right: 5%;
    justify-content: space-between;
  `,
  burgerImage: styled.Image`
    margin-top: 0;
    margin-right: auto;
    margin-bottom: 0;
    margin-left: auto;
    resize-mode: contain;
  `,
  burgerImageSrc,
  title: styled.Text`
    text-align: center;
    text-align-vertical: center;
  `
};

export default NavBar;
