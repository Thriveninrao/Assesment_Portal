import { environment } from "src/environments/environment";
import { I_SIDEBAR } from "../utils/admin.interface";

export const SIDEBAR:I_SIDEBAR[] = [
    {
        "menuName": 'Dashboard',
        "icon": "home",
        "routeLink": '/admin',
        "role": 'Admin'
    },
    {
        "menuName": 'Admins',
        "icon": "people",
        "routeLink": '/admin/admin-details',
        "role": 'Admin'
    },
    {
        "menuName": 'Users',
        "icon": "people_outline",
        "routeLink": '/admin/user-details',
        "role": 'Admin'
    },
    {
        "menuName": 'Categories',
        "icon": "auto_awesome_motion",
        "routeLink": '/admin/categories',
        "role": 'Admin'
    },
    {
        "menuName": 'Assessments',
        "icon": "category",
        "routeLink": '/admin/view-assessments',
        "role": 'Admin'
    },
    {
        "menuName": 'Access Requests',
        "icon": "work",
        "routeLink": '/admin/assign-test',
        "role": 'Admin'
    },
    {
        "menuName": 'Dashboard',
        "icon": "work",
        "routeLink": '/user',
        "role": 'User'
    },
    {
        "menuName": 'Assessments',
        "icon": "category",
        "routeLink": '/user/view-user-assessments',
        "role": 'User'
    }
]


export class ADMIN_ENDPOINTS {
    public static GET_ASSIGNMENTS = environment.BASE_URL + 'assessment/';
    public static GET_CATEGORIES = environment.BASE_URL + 'category/';
    // public static GET_
}