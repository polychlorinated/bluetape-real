import styled from "styled-components";
import SharinganBanner from "./sharingan-banner.png";

export const Banner = styled.div`
  background-image: url(${SharinganBanner});
  height: 60px;
  width: 300px;
  margin-bottom: 5%;
`;

export const BannerText = styled.h1`
  margin-top: 5%;
  color: white;
  font-family: "Righteous", cursive;
`;
