import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LoginDialog from '@/components/loginDialog';

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginDialog defaultOpen={true} />;
  }

  return <p>歡迎回來，{session.user?.email}！</p>;
}
