import Image from 'next/image';

interface UserInfo {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }
  
  interface NavbarUserInfoProps {
    user: UserInfo;
  }

  const NavbarUserInfo: React.FC<NavbarUserInfoProps> = ({ user }) => {
    return (
        <div className="flex items-center space-x-4 border-l pl-4">
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                {user.image ? (
                    <Image src={user.image} alt="User" width={32} height={32} className="rounded-full" />
                ) : (
                    <span className="text-sm font-medium text-white">
                        {user.name?.charAt(0) || 'A'}
                    </span>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
            </div>
        </div>
    );
  };

  export default NavbarUserInfo;