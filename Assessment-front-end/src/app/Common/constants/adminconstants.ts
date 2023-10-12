import { environment } from "src/environments/environment";
import { I_SIDEBAR } from "../utils/admin.interface";

export const SIDEBAR:I_SIDEBAR[] = [
    {
        "menuName": 'Dashboard',
        "icon": "home",
        "routeLink": '/admin',
        "role": ['ADMIN', 'SUPER-ADMIN']
    },
    {
        "menuName": 'Manage Admins',
        "icon": "people",
        "routeLink": '/admin/admin-details',
        "role": ['ADMIN', 'SUPER-ADMIN']
    },
    {
        "menuName": 'Manage Users',
        "icon": "people_outline",
        "routeLink": '/admin/user-details',
        "role": ['ADMIN', 'SUPER-ADMIN']
    },
    {
        "menuName": 'Categories',
        "icon": "auto_awesome_motion",
        "routeLink": '/admin/categories',
        "role": ['ADMIN', 'SUPER-ADMIN']
    },
    {
        "menuName": 'Assessments',
        "icon": "category",
        "routeLink": '/admin/view-assessments',
        "role": ['ADMIN', 'SUPER-ADMIN']
    },
    {
        "menuName": 'Assign Test',
        "icon": "work",
        "routeLink": '/admin/assign-test',
        "role": ['ADMIN', 'SUPER-ADMIN']
    },
    {
        "menuName": 'Access Requests',
        "icon": "accessibility",
        "routeLink": '/admin/access-request',
        "role": ['ADMIN', 'SUPER-ADMIN']
    },
    {
        "menuName": 'Support',
        "icon": "help",
        "routeLink": '/admin/support',
        "role": ["ADMIN", 'SUPER-ADMIN']
    },
    {
        "menuName": 'Dashboard',
        "icon": "work",
        "routeLink": '/user',
        "role": ['NORMAL']
    },
    {
        "menuName": 'Assessments',
        "icon": "category",
        "routeLink": '/user/view-user-assessments',
        "role": ['NORMAL']
    },
    {
        "menuName": 'Feedback',
        "icon": "reviews",
        "routeLink": '/user/feedback',
        "role": ['NORMAL']
    },
]


export class ADMIN_ENDPOINTS {
    public static GET_ASSIGNMENTS = environment.BASE_URL + 'assessment/';
    public static GET_CATEGORIES = environment.BASE_URL + 'category/';
    // public static GET_
}