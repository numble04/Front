import api from 'lib/api';
import { useQuery } from 'react-query';

// 검색을 통한 카페 정보 가져오기
export const useMeetingInfos = () => {
  const getMeeting = async () => {
    try {
      const res = await api.get(`/meetings`);
      return res.data.data.content;
    } catch (error) {
      throw new Error('error');
    }
  };

  const { data, refetch } = useQuery(['useMeetingInfos'], () => getMeeting(), {
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  return { meetings: data };
};
