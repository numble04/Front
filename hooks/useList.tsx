/* eslint-disable react-hooks/exhaustive-deps */
import { meetings } from 'constant/meeting';
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { ExpandMoreSmallIcon } from 'components/ui/atoms/Icon';
import { MeetingCard } from 'components/ui/molecules/MeetingCard';

const HEADER = 110;
const INNER_HEADER = 60;
const NAVBAR = 60;
const HEIGHT_MARGIN = INNER_HEADER + NAVBAR;
const PERCENTAGE = 0.7;

const useList = () => {
  const $list = useRef<HTMLDivElement>(null);
  const $cardWrapper = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!$list.current || !$cardWrapper.current) return;
    $list.current.style.top = `${window.innerHeight * (1 - PERCENTAGE)}px`;
    $cardWrapper.current.style.height = `${
      window.innerHeight * PERCENTAGE - HEIGHT_MARGIN
    }px`;
  }, []);

  useEffect(() => {
    if (!$list.current) return;
    const MARGIN = window.innerHeight * (1 - PERCENTAGE);
    $list.current.classList.add('open');
    $list.current.style.top = `${MARGIN}px`;

    let touchStartTime: Date, touchEndTime: Date;
    let touchStartPoint = 0,
      touchEndPoint = 0,
      touchStartTop = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (!$list.current) return;

      touchStartTime = new Date();
      touchStartPoint = e.touches[0].clientY;
      touchStartTop = $list.current.offsetTop;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!$list.current || !$cardWrapper.current) return;
      if ($cardWrapper.current.contains(e.target as Element)) return;

      let position = e.touches[0].clientY - touchStartPoint + touchStartTop;
      if (position < HEADER) return;

      $list.current.style.transition = 'all 0s ease';
      $list.current.style.top = `${position || 0}px`;
      $cardWrapper.current.style.height = `${
        window.innerHeight - position - HEIGHT_MARGIN
      }px`;

      if (e.cancelable) e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!$list.current || !$cardWrapper.current) return;
      if ($cardWrapper.current.contains(e.target as Element)) return;

      touchEndTime = new Date();
      touchEndPoint = e.changedTouches[0].clientY;
      if (!touchEndTime || !touchStartTime) return;

      // @ts-ignore
      const timeInterval = touchEndTime - touchStartTime;
      const velocity = (touchEndPoint - touchStartPoint) / timeInterval;
      if ($list.current.classList.contains('cover')) {
        if (velocity > 0.7) {
          return openList();
        }
      } else if ($list.current.classList.contains('open')) {
        if (velocity > 0.7) {
          return closeList();
        } else if (velocity < -0.4) {
          return coverList();
        }
      }

      if (touchEndPoint < MARGIN * 0.7) {
        return coverList();
      } else if (touchEndPoint > MARGIN * 1.5) {
        return closeList();
      } else {
        return openList();
      }
    };

    const onMouseStart = (e: MouseEvent) => {
      if (!$list.current || !$cardWrapper.current) return;
      if ($cardWrapper.current.contains(e.target as Element)) return;

      touchStartTime = new Date();
      touchStartPoint = e.clientY;
      touchStartTop = $list.current.offsetTop;
      $list.current.addEventListener('mousemove', onMouseMove);
      $list.current.addEventListener('mouseup', onMouseEnd);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!$list.current || !$cardWrapper.current) return;

      let position = e.clientY - touchStartPoint + touchStartTop;

      $list.current.style.transition = 'all 0s ease';
      $list.current.style.top = `${position || 0}px`;
      $cardWrapper.current.style.height = `${
        window.innerHeight - position - HEIGHT_MARGIN
      }px`;

      if (e.cancelable) e.preventDefault();
    };

    const onMouseEnd = (e: MouseEvent) => {
      if (!$list.current) return;
      touchEndTime = new Date();
      touchEndPoint = e.clientY;
      if (!touchEndTime || !touchStartTime) return;

      $list.current.removeEventListener('mousemove', onMouseMove);
      $list.current.removeEventListener('mouseup', onMouseEnd);

      // @ts-ignore
      const timeInterval = touchEndTime - touchStartTime;
      const velocity = (touchEndPoint - touchStartPoint) / timeInterval;
      if ($list.current.classList.contains('cover')) {
        if (velocity > 0.7) {
          return openList();
        }
      } else if ($list.current.classList.contains('open')) {
        if (velocity > 0.7) {
          return closeList();
        } else if (velocity < -0.4) {
          return coverList();
        }
      }

      if (touchEndPoint < MARGIN * 0.7) {
        return coverList();
      } else if (touchEndPoint > MARGIN * 1.5) {
        return closeList();
      } else {
        return openList();
      }
    };

    $list.current.addEventListener('touchstart', onTouchStart);
    $list.current.addEventListener('touchmove', onTouchMove);
    $list.current.addEventListener('touchend', onTouchEnd);
    $list.current.addEventListener('mousedown', onMouseStart);

    return () => {
      $list.current?.removeEventListener('touchstart', onTouchStart);
      $list.current?.removeEventListener('touchmove', onTouchMove);
      $list.current?.removeEventListener('touchend', onTouchEnd);
      $list.current?.removeEventListener('mousedown', onMouseStart);
    };
  }, [$list.current, $list.current]);

  const closeList = () => {
    if (!$list.current || !$cardWrapper.current) return;

    $list.current.style.top = `100%`;
    $list.current.style.transition = `all 0.3s linear`;
    $list.current.classList.add('close');
    $list.current.classList.remove('open');
    $list.current.classList.remove('cover');
    $cardWrapper.current.style.height = `${
      window.innerHeight - HEIGHT_MARGIN
    }px`;
  };

  const openList = () => {
    if (!$list.current || !$cardWrapper.current) return;

    $list.current.style.top = `${window.innerHeight * (1 - PERCENTAGE)}px`;
    $list.current.style.transition = `all 0.2s linear`;
    $list.current.classList.add('open');
    $list.current.classList.remove('close');
    $list.current.classList.remove('cover');
    $cardWrapper.current.style.height = `${
      window.innerHeight * PERCENTAGE - HEIGHT_MARGIN
    }px`;
  };

  const coverList = () => {
    if (!$list.current || !$cardWrapper.current) return;

    $list.current.style.top = `${HEADER}px`;
    $list.current.style.transition = `all 0.2s linear`;
    $list.current.classList.add('cover');
    $list.current.classList.remove('open');
    $list.current.classList.remove('close');
    $cardWrapper.current.style.height = `${
      window.innerHeight - HEIGHT_MARGIN
    }px`;
  };

  const List = useCallback(() => {
    return (
      <Container ref={$list}>
        <Header>
          <HeaderLeft />
          <HeaderCenter>
            <Bar />
          </HeaderCenter>
          <HeaderRight>
            <div>신규순</div>
            <ExpandMoreSmallIcon />
          </HeaderRight>
        </Header>
        <Content>
          <CardWrapper ref={$cardWrapper}>
            {meetings.map((item) => (
              <MeetingCard key={item.id} meeting={item} />
            ))}
          </CardWrapper>
        </Content>
      </Container>
    );
  }, []);
  return { List, openList, closeList };
};

export default useList;

const Container = styled.div`
  width: 100%;
  max-width: 32rem;
  height: 100vh;
  background-color: #ffffff;
  position: fixed;
  z-index: 4;
  border-radius: 10px 10px 0 0;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 10px 10px 0 0;
`;

const HeaderLeft = styled.div`
  width: 100px;
`;

const HeaderCenter = styled.div`
  width: 80px;
  display: flex;
`;

const Bar = styled.div`
  width: 80px;
  height: 8px;
  margin-top: 20px;
  background-color: #ececec;
  border-radius: 4px;
`;

const HeaderRight = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top 20px;
  color: #5b5b5b;
  font-size: 12px;
`;

const Content = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
