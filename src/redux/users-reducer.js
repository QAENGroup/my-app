const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS= 'SET_USERS'

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
    ]//здесь пустое значение! так должно пока быть!
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
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state; // если ничего не находится просто возвращаем state

    }
}

export const followAC = (userId) => ({type: FOLLOW, userId})
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId})
export const setUsersAC = (users) => ({type: SET_USERS, users})
;

export default usersReducer;
