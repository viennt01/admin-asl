import { Player } from '@lottiefiles/react-lottie-player';
import { Space } from 'antd';

export default function ComingSoon() {
  return (
    <Space
      style={{
        height: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Player src="/json/coming-soon.json" loop autoplay />
    </Space>
  );
}
