//Trang được gọi đầu tiên khi mở app, kiểm tra xem người dùng có đăng nhập chưa để chuyển trang
import React, {useEffect, useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';

const ResolveAuthScreen=()=>{
    const {tryLocalSignin}=useContext(AuthContext);

    useEffect(()=>{
        tryLocalSignin();
    },[]);
    return null;
}

export default ResolveAuthScreen;