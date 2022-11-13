/* eslint-disable react-hooks/exhaustive-deps */
import { meetings } from 'constant/meeting';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MeetingCard } from '../molecules/MeetingCard';

const HEADER = 48;
const NAVBAR = 60;

const List = () => {
  const $list = useRef<HTMLDivElement>(null);
  const $drag = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState(0);

  useEffect(() => {
    console.log(wrapperHeight);
  }, [wrapperHeight]);

  useLayoutEffect(() => {
    if (!$list.current || !$drag.current) return;
    $list.current.style.transform = `translateY(${
      window.innerHeight * 0.3
    }px)`;
    setWrapperHeight(window.innerHeight * 0.7);
  }, []);

  useEffect(() => {
    if (!$list.current || !$drag.current) return;
    const MARGIN = window.innerHeight * 0.3;
    $list.current.classList.add('open');
    $list.current.style.transform = `translateY(${MARGIN}px)`;

    let touchStartTime: Date, touchEndTime: Date;
    let touchStartPoint = 0,
      touchEndPoint = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartTime = new Date();
      touchStartPoint = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!$drag.current || !$list.current) return;

      let position = e.touches[0].clientY - 48; // header 크기 제외

      $list.current.style.transition = 'all 0s ease';
      $list.current.style.transform = `translateY(${position || 0}px)`;
      setWrapperHeight(window.innerHeight - position);

      if (e.cancelable) e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!$drag.current || !$list.current) return;
      touchEndTime = new Date();
      touchEndPoint = e.changedTouches[0].clientY;
      if (!touchEndTime || !touchStartTime) return;

      // @ts-ignore
      const timeInterval = touchEndTime - touchStartTime;
      const velocity = (touchEndPoint - touchStartPoint) / timeInterval;
      if ($list.current.classList.contains('cover')) {
        if (velocity > 0.7) {
          return openModal();
        }
      } else if ($list.current.classList.contains('open')) {
        if (velocity > 0.7) {
          return closeModal();
        } else if (velocity < -0.7) {
          return coverModal();
        }
      }

      if (touchEndPoint < MARGIN * 0.6) {
        return coverModal();
      } else if (touchEndPoint > MARGIN * 1.5) {
        return closeModal();
      } else {
        return openModal();
      }
    };

    $drag.current.addEventListener('touchstart', onTouchStart);
    $drag.current.addEventListener('touchmove', onTouchMove);
    $drag.current.addEventListener('touchend', onTouchEnd);

    return () => {
      $drag.current?.removeEventListener('touchstart', onTouchStart);
      $drag.current?.removeEventListener('touchmove', onTouchMove);
      $drag.current?.removeEventListener('touchend', onTouchEnd);
    };
  }, [$drag.current, $list.current]);

  const closeModal = () => {
    if (!$list.current) return;

    $list.current.style.transform = `translateY(120%)`;
    $list.current.style.transition = `all 0.3s linear`;
    $list.current.classList.add('close');
    $list.current.classList.remove('open');
    $list.current.classList.remove('cover');
    setWrapperHeight(window.innerHeight);
  };

  const openModal = () => {
    if (!$list.current) return;

    $list.current.style.transform = `translateY(${
      window.innerHeight * 0.3
    }px)`;
    $list.current.style.transition = `all 0.2s linear`;
    $list.current.classList.add('open');
    $list.current.classList.remove('close');
    $list.current.classList.remove('cover');
    setWrapperHeight(window.innerHeight * 0.7);
  };

  const coverModal = () => {
    if (!$list.current) return;

    $list.current.style.transform = `translateY(0px)`;
    $list.current.style.transition = `all 0.2s linear`;
    $list.current.classList.add('cover');
    $list.current.classList.remove('open');
    $list.current.classList.remove('close');
    setWrapperHeight(window.innerHeight);
  };

  return (
    <Container ref={$list}>
      <Header ref={$drag}>
        <HeaderRight onClick={() => closeModal()}>신규순</HeaderRight>
      </Header>
      <Content>
        <CardWrapper style={{ height: `${wrapperHeight - HEADER - NAVBAR}px` }}>
          <div>매칭</div>
          {meetings.map((item) => (
            <MeetingCard key={item.id} meeting={item} />
          ))}
        </CardWrapper>
      </Content>
    </Container>
  );
};

export default List;

const Container = styled.div`
  width: 100%;
  max-width: 32rem;
  height: 100vh;
  background-color: #ffffff;
  position: fixed;
  z-index: 1;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const HeaderRight = styled.div`
  width: 60px;
`;

const Content = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0.2rem 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
