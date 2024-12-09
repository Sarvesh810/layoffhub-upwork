import styled from "styled-components";
export const CardContainer = styled.div`
  width: 350px;
  height: 150px;
  display: flex;
  padding: 15px;
  gap: 5px;
  box-shadow: 0px 0px 5px black;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background: linear-gradient(to bottom, blue 29%, transparent 30%) left / 2px
    100% no-repeat;

  border-radius: 5px;
`;
export const CompanyData = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 10px;
`;

export const CompnayPic = styled.img`
  width: 40px;
  height: 40px;
`;

export const ThreadCompanyPic = styled.img`
  width: 50px; /* Set width to define the square size */
  height: 50px; /* Match height to width for a perfect square */
  object-fit: cover; /* Ensures the image scales properly within the square */
  border-radius: 8px; /* Remove any rounding for a square shape */
  padding: 0; /* Ensure no padding inside the square */
  margin: 0; /* Remove any margin that might be applied */
  border: 1px solid #dee2e6; /* Optional: Add a border for visibility */
`;

export const NameHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 5px;
`;

export const CompnayName = styled.p`
  font-weight: 600;
  font-size: 16px;
  margin: 0%;
`;
export const CompnaySector = styled.p`
  font-weight: 500;
  font-size: 10px;
  color: #888888;
  margin: 0%;
`;

export const DetailButton = styled.button`
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

export const Data = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
`;

export const Name = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const ThreadsComtainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
`;
export const Threds = styled.div`
  padding: 7px;
  display: flex;
  align-items: center;
  background-color: #ebeef1;
  color: black;
  font-size: 14px;
  border: none;
  border-radius: 8px;
`;

export const Icon = styled.div`
  font-size: 14px;
  color: #1376f8;
`;
export const Title = styled.p`
  font-size: 14px;
  margin: 0%;
`;
export const Number = styled.p`
  font-size: 14px;
  margin: 0%;
`;
