const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS= 'SET_USERS'
const SET_CURRENT_PAGE= 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT= 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING='TOGGLE_IS_FETCHING'

let initialState = {
    users: [/*
        {
            id: 1,
            photoUrl: 'http://m.kino-teatr.ru/acter/album/28098/pv_735354.jpg',
            followed: false,
            fullName: 'Dmitry',
            status: 'I am a boss',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: 2,
            photoUrl: 'http://m.kino-teatr.ru/acter/album/28098/pv_735354.jpg',
            followed: true,
            fullName: 'Sasha',
            status: 'I am a boss too',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {
            id: 3,
            photoUrl: 'http://m.kino-teatr.ru/acter/album/28098/pv_735354.jpg',
            followed: false,
            fullName: 'Andrew',
            status: 'I am a boss too',
            location: {city: 'Kiev', country: 'Ukraine'}
        },*/
    ],//здесь пустое значение! так должно пока быть!
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true
};

const usersReducer = (state = initialState, action) => { // принимаем пропсы возвращаем jsx разметку
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })

            }
        case UNFOLLOW:
            return {
                ...state, //копируем state
                users: state.users.map(u => { // т.к нам нужно записать в массив используем метод map
                    if (u.id === action.userId) { // находим нужного пользователя
                        return {...u, followed: false} // меняем ключ followed на false
                    }
                    return u;
                })

            }
        case SET_USERS:{
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE:{
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT:{
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING:{
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state; // если ничего не находится просто возвращаем state

    }
}

export const follow = (userId) => ({type: FOLLOW, userId})
export const unfollow = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count:totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})//функция которая возвращает экшн

export default usersReducer;
