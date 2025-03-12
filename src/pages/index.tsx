import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthStore from '@/components/logic/authStore';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (!AuthStore.isLoggedIn()) {
      router.push('/auth');
    }
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Your dashboard content here */}
    </div>
  );
};

export default HomePage;