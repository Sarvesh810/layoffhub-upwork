import styled from "styled-components";

export const MainContainer = styled.nav`
  width: 100%;
  align-items: center;
  justify-content: space-around;
  display: flex;
  padding: 20px 0px;
  box-shadow: 1px 1px 1px black;
  @media (max-width: 610px) {
    display: flex-box;
  }
`;
export const LogoContainer = styled.img`
  width: 440px;
  height: 150px;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 320px;
    height: 110px;
  }
  @media (max-width: 350px) {
    width: 270px;
    height: 90px;
  }
`;

export const MenuContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin: 0%;
  padding: 0%;
  @media (max-width: 768px) {
    flex-direction: ${({ showMenu }) => (showMenu ? "column" : "row")};
    display: ${({ showMenu }) => (showMenu ? "flex" : "none")};
    position: absolute;
    align-items: center;
    justify-content: center;
    background: #eef1f9;
    padding: 20px 0px;
    width: 100%;
    z-index: 9999;
    gap: 15px;
    top: 9%;
    box-shadow: 3px 3px 10px black;
  }
`;
export const SideBarCon = styled.div`
  display: flex;
  width: 80%;
  @media (max-width: 700px) {
    display: ${({ showMenu }) => (showMenu ? "flex" : "none")};
    position: absolute;
    z-index: 9999;
    width: 100%;
  }
`;
export const ButtonDiv = styled.div`
  width: 20%;
  display: none;
  @media (max-width: 700px) {
    display: flex;
    color: red;
    justify-content: end;
    background: rgba(255, 255, 255, 0.5); /* Semi-transparent background */
    backdrop-filter: blur(10px); /* Apply blur effect */
    font-size: 22px;
  }
`;
export const SidebarContainer = styled.div`
  width: 80%;
  background-color: black;
  align-items: center;
  justify-content: center;
  @media (max-width: 700px) {
    display: flex;
    color: yellow;
    font-size: 22px;
  }
`;
export const closeButton = styled.button``;
export const MenuList = styled.li`
  font-size: 20px;
  font-weight: 500;
  list-style: none;
  a {
    color: Black;
    text-decoration: none;
    &:hover {
      padding-bottom: 5px;
      border-bottom: 1px solid rgb(0, 102, 255);
    }
  }
`;

export const Button = styled.button`
  width: 190px;
  height: 50px;
  background-color: white;
  color: #333333;
  border: 1px solid #333333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #333333;
    color: white;
    border: 1px solid #333333;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid #666666;
    outline-offset: 2px;
  }

  @media (max-width: 750px) {
    width: 150px;
    height: 40px;
    font-size: 14px;
    padding: 0 15px;
  }
`;

export const Button3 = styled.button`
  width: 190px;
  height: 50px;
  background-color: white;
  color: #333333;
  border: 1px solid #333333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #333333;
    color: white;
    border: 1px solid #333333;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid #666666;
    outline-offset: 2px;
  }

  @media (max-width: 750px) {
    width: 150px;
    height: 40px;
    font-size: 14px;
    padding: 0 15px;
  }
`;

export const Button1 = styled.button`
  width: 190px;
  height: 50px;
  background-color: white;
  color: #333333;
  border: 1px solid #333333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #333333;
    color: white;
    border: 1px solid #333333;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid #666666;
    outline-offset: 2px;
  }

  @media (max-width: 750px) {
    width: 150px;
    height: 40px;
    font-size: 14px;
    padding: 0 15px;
  }
`;

export const ButtonContanier = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
export const ButtonContanier2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  @media (max-width: 700px) {
    display: none;
  }
`;
export const ButtonContanier1 = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    padding-top: 25px;
  }
`;

export const Hamburger = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    color: #555;
    @media (max-width: 500px) {
      width: 30px;
    }
  }
`;

export const UserMenu = styled.div`
  position: relative;
  display: flex;
  width: 100px;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    margin-left: 8px;
  }
  @media (max-width: 500px) {
    width: 90px;
    padding: 5px 2px;
  }
`;

export const DropdownMenu = styled.div`
  display: ${({ showDropdown }) => (showDropdown ? "block" : "none")};
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 160px;
  overflow: hidden;
`;

export const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  justify-content: center;
  display: flex;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;

export const NotificationContrainer = styled.div`
  display: flex;
  gap: 15px;
  @media (max-width: 1000px) {
    width: 80% !important;
  }
`;
export const Notification = styled.div`
  position: absolute;
  top: 120px;
  width: 400px;
  right: 10%;
  @media (max-width: 600px) {
    width: 300px;
    top: 88px;
  }
  @media (max-width: 400px) {
    width: 260px;
  }
`;
export const AllNotification = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: White;
  color: black;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
export const Message = styled.p`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: pretty;
`;

export const BellButton = styled.button`
  font-size: 30px;
  color: #555; /* Set the color of the icon */
  border: 1px solid #555; /* Add a border */
  border-radius: 50%; /* Make the border circular */
  padding: 5px; /* Add padding for spacing between the icon and border */
  background: transparent; /* Ensure background is transparent */
  display: flex; /* Center-align the icon */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  appearance: none;
  transition: all 0.3s ease; /* Add smooth transitions for hover effects */

  &:hover {
    color: #888; /* Change the color on hover */
  }

  @media (max-width: 500px) {
    font-size: 24px;
  }
  @media (max-width: 400px) {
    font-size: 20px;
  }
`;

export const ShowButton = styled.button`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 102, 255);
  color: white;
  border-radius: 8px;
  border: none;
  &:hover {
    color: rgb(0, 102, 255);
    background-color: white;
    border: 1px solid rgb(0, 102, 255);
  }
`;
