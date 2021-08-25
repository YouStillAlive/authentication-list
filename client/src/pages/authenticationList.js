import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import logo from '../favicon.ico';
import { getUsers } from '../http/userApi.js';
import { Context } from '../index.js';
import { DEFAULT_ROUTE } from '../utils/consts';
import { deleteUsers, blockUsers } from '../http/userApi.js';
import { observer } from 'mobx-react-lite';
//import NotificationModal from '../components/notificationModal';

const AuthenticationList = observer(() => {
    const [data, setData] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const { user } = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setData(await getUsers());
        } catch (e) {
            console.log(e);
        }
    }

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(data.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const checkboxClick = e => {
        const { checked } = e.target;
        const id = parseInt(e.target.id);
        if (!checked) {
            setIsCheck(Object.values(isCheck).filter(item => item !== id));
        }
        else {
            setIsCheck([...isCheck, id]);
        }
    };

    const logoutHandler = e => {
        try {
            user.setUser(null);
            user.setIsAuth(false);
            history.push(DEFAULT_ROUTE);
            localStorage.removeItem('token');
        }
        catch (e) {
            console.log(e);
        }
    }

    const unblockHandler = async e => {
        try {
            if (isCheck.length > 0) {
                await blockUsers(isCheck, false);
                await fetchData();
            }
        } catch (e) {
            console.log(e.response.data.message);
        }
    }

    const blockHandler = async e => {
        try {
            if (isCheck.length > 0) {
                await blockUsers(isCheck, true);
                await fetchData();
                if (isCheck.indexOf(user.user.id) !== -1) {
                    logoutHandler();
                }
            }
        } catch (e) {
            console.log(e.response.data.message);
        }
    }

    const deleteHandler = async e => {
        try {
            if (isCheck.length > 0) {
                await deleteUsers(isCheck);
                setIsCheck([]);
                await fetchData();
                if (isCheck.indexOf(user.user.id) !== -1) {
                    logoutHandler();
                }
            }
        } catch (e) {
            console.log(e.response.data.message);
        }
    }

    return (
        <main className="container content p-4">
            <div>
                <img alt="unblock" width="40" onClick={unblockHandler} className="p-1 unblockHover" src="https://www.pngrepo.com/png/193933/512/unlock.png" />
                <img alt="block" width="40" onClick={blockHandler} className="p-1 blockHover" src={logo} />
                <img alt="delete" width="36" onClick={deleteHandler} className="p-1 deleteHover" src="https://www.clipartmax.com/png/full/84-842915_delete-icon-png-red.png" />
            </div>
            <Table striped bordered hover responsive borderless >
                <thead>
                    <tr>
                        <td>
                            <input
                                type="checkbox"
                                className="checkboxPosition"
                                onChange={handleSelectAll}
                                checked={isCheckAll}
                            />
                        </td>
                        <th>
                            Id
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Registration date
                        </th>
                        <th>
                            Last updated
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(data => {
                            let status = "active";
                            if (data.isBlocked)
                                status = "blocked";
                            data.createdAt = data.createdAt.replace('.000Z', '').replace('T', ' ');
                            data.updatedAt = data.updatedAt.replace('.000Z', '').replace('T', ' ');
                            return (<tr key={data.id}>
                                <td>
                                    <input
                                        id={data.id}
                                        type="checkbox"
                                        onChange={checkboxClick}
                                        checked={isCheck.includes(data.id)}
                                        className="checkboxPosition" />
                                </td>
                                <td>
                                    {data.id}
                                </td>
                                <td>
                                    {data.name}
                                </td>
                                <td>
                                    {data.email}
                                </td>
                                <td>
                                    {data.createdAt}
                                </td>
                                <td>
                                    {data.updatedAt}
                                </td>
                                <td>
                                    {status}
                                </td>
                            </tr>);
                        }
                        )
                    }
                </tbody>
            </Table>
            <Button variant="secondary" onClick={logoutHandler} style={{ float: "right" }}>Logout</Button>
        </main>
    );
});

export default AuthenticationList;