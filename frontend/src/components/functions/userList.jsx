import React, { useEffect, useState } from 'react';
// import styles from '../../styles/UserLiset.module.scss';
import axios from "axios"; // 导入组件的样式

const UserListComponent = () => {
    const [usersData, setUserData] = useState(null);

    useEffect(() => {
        // 发起请求获取天气数据
        axios.get('/users/1')
            .then(response => {
                setUserData(response.data); // 将获取的天气数据保存到状态中
            })
            .catch(error => {
                console.error('Error fetching users data:', error);
            });
    }, []);

    return (
        <div >
            <h1>User List</h1>
            <div>
                <p>First Name: {usersData && usersData.firstName}</p>
                <p>Last Name: {usersData &&  usersData.lastName}</p>
            </div>
        </div>
    );
};

export default UserListComponent;
