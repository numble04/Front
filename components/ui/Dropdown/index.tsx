import React, { useState } from 'react';

import styled from 'styled-components';

interface Props {
  selectOption: string;
  menuList: string[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const DropDownContainer = styled.div`
  position: relative;
`;

const DropDownBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  height: 40px;
  border: 1px solid #d1d8dc;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const OptionList = styled.ul`
  position: absolute;
  top: 25px;
  border-radius: 10px;
  border: 1px solid #d1d8dc;
  transition: all 0.2s ease-out;
  background: #ffffff;
`;

const Option = styled.li`
  width: 130px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    font-size: 14px;
    font-weight: 600;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #d1d8dc;
  }
`;

const Dropdown = ({ selectOption, menuList, setCategory }: Props) => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsMenu(false);
    // setCategory(e.target.value);
  };

  return (
    <DropDownContainer>
      <DropDownBox onClick={handleMenu}>{selectOption}</DropDownBox>
      <OptionList>
        {isMenu &&
          menuList.map((item, index) => (
            <Option key={index}>
              <p>{item}</p>
              {/* <div onClick={(e) => handleClick(e)}>{item}</div> */}
            </Option>
          ))}
      </OptionList>
    </DropDownContainer>
  );
};

export default Dropdown;
