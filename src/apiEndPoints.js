let baseURL =  "http://127.0.0.1/api";
export default {
    apis: {
        login:  baseURL + '/login',
        register: baseURL + '/register',
        create_activity:  baseURL + '/activities/create',
        get_activities: baseURL + '/activities',
        get_activity_list: baseURL + '/activities/list',
        update_activity: baseURL + '/activities/update',
        delete_activity: baseURL + '/activities/delete',
        get_user_activities: baseURL + '/user-activities',
        create_user_activity: baseURL + '/user-activities/create',
        update_user_activity: baseURL + '/user-activities/update',
        delete_user_activity: baseURL + '/user-activities/delete',
        get_user_names: baseURL + '/users/username',
    }
}