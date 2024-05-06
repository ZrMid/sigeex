import Cookies from 'js-cookie';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const RedirectSession = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const cookie = Cookies.get("userInfo");
        if (!cookie) {
            navigate('/sesionUs');
        } else {
            navigate('/mainSis');
        }
    }, []);

}
