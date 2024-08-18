import { useEffect } from 'react';
import { securityCheck } from '@/hooks/checks';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useLogout from '@/hooks/useLogout';
import translations from "@/translations.json";

const Check = ({ setLoading }) => {

    const { push } = useRouter();
    const { layoutMain } = translations['en'];
    const pathname = usePathname();

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            console.log("test");
        }

        const checkAndLogout = async () => {
            const token = await getCookie('token');
            const userPermission = await JSON.parse(localStorage.getItem('userPermission'));
            const result = await securityCheck(token, userPermission, pathname);
            console.log(result);
            
            if (result == false) {
                useLogout(push);
            } else {
                setLoading(false);
            }
        };

        checkAndLogout();

        return () => {
            mounted = false;
        };
    }, []);


    return (
        <div className="relative flex flex-col gap-5 justify-center items-center h-full w-full">
            <div className="w-32 h-32 rounded-full border-8 border-solid border-accent border-t-transparent animate-spin"></div>
            <span>{layoutMain.securityCheck}</span>
        </div>
    );
};

export default Check;