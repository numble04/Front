import React, { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import useOutsideClick from 'hooks/useOutsideClick';
import { menuType } from 'pages/createBoard';

interface Props {
  selectOption: string;
  menuList: menuType[];
  setCategory: Dispatch<SetStateAction<menuType>>;
  isMenu: boolean;
  setIsMenu: Dispatch<SetStateAction<boolean>>;
}

const DropDownContainer = styled.div`
  position: relative;
  width: 120px;
`;

const DropDownBox = styled.div<{ isMenu: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  width: 120px;
  height: 40px;
  border: 1px solid #d1d8dc;
  background-color: #f3f3f3;
  border-radius: 4px;
  color: #575757;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  ${({ isMenu }) =>
    isMenu &&
    css`
      .arrowIcon {
        transform: rotate(-180deg);
        transition: transform 0.3s;
      }
    `}
`;

const OptionList = styled.ul`
  position: absolute;
  top: 25px;
  padding: 0;
  border-radius: 10px;
  border: 1px solid #d1d8dc;
  transition: all 0.2s ease-out;
  background-color: #f3f3f3;
`;

const Option = styled.li`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  p {
    color: #575757;
    font-size: 14px;
    font-weight: 600;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #d1d8dc;
  }
`;

const Dropdown = ({
  selectOption,
  menuList,
  setCategory,
  isMenu,
  setIsMenu,
}: Props) => {
  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  const handleClose = () => {
    setIsMenu(false);
  };

  const menuRef = useOutsideClick(handleClose);

  const handleClick = (option: menuType) => {
    setIsMenu(false);
    setCategory(option);
  };

  return (
    <DropDownContainer ref={menuRef}>
      <DropDownBox isMenu={isMenu} onClick={handleMenu}>
        {selectOption}
        <Image
          className="arrowIcon"
          width={10}
          height={5}
          src="/icons/arrowDown.svg"
          alt="arrowDown"
        />
      </DropDownBox>
      {isMenu && (
        <OptionList>
          {menuList.map((item, index) => (
            <Option key={index}>
              <p onClick={() => handleClick(item)}>{item.name}</p>
            </Option>
          ))}
        </OptionList>
      )}
    </DropDownContainer>
  );
};

export default Dropdown;
