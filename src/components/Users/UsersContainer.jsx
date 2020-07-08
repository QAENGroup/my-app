import React from 'react';
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    toggleIsFetchingAC,
    unfollowAC
} from "../../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import preloader from "../../assets/images/preloader-4.svg"
import Preloader from "../common/Preloader/preloader";

class UsersContainer extends React.Component{
    componentDidMount() {
        this.props.toggleIsFetchingAC(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)// get запрос на сервак
            .then(response => {//ответ запроса
                this.props.toggleIsFetchingAC(false);
                this.props.setUsers(response.data.items);// выполняем коллбэк
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) =>{
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetchingAC(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {// get запрос на сервак
                this.props.toggleIsFetchingAC(false);
                this.props.setUsers(response.data.items);// выполняем коллбэк
            });

    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
             />
        </>
    }
}// ajax запросы

let mapStateToProps = (state) => { // отдаем users.jsx необходимые данные через пропсы
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}//принимаем state отдаем через пропсы данные users.jsx'у

let mapDispatchToProps = (dispatch) => { // отдаем диспатч каллбэки
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount));
        },
        toggleIsFetchingAC: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching));
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);


