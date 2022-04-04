import Vue from 'vue'
import Router from 'vue-router'

// Dashboard Components
import dashboard from '../views/dashboard'

//  Widgets Components
import mainView from '../mainView'

import buttons from '../views/basic-elements/buttons'
import dropdowns from '../views/basic-elements/dropdowns'
import typography from '../views/basic-elements/typography'

//  Chart Components
import chartjs from '../views/charts/chartjs'

//  Icons Components
import mdiIcons from '../views/icons/mdi-icons'

import login from '../views/samples/user-pages/login'
import register from '../views/samples/user-pages/register'

import activities from '../views/manage-activities/index'

import activityCreate from '../views/manage-activities/create'

import activityUpdate from '../views/manage-activities/update'

import userActivities from '../views/manage-user-activities/index'

import userActivityCreate from '../views/manage-user-activities/create'

import userActivityUpdate from '../views/manage-user-activities/update'

//  Table Components
import basicTables from '../views/tables/basic-table'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: [
    {
      path: "/",
      name: 'Login',
      redirect: "/login"
    },
    {
    path: '/dashboard',
    component: mainView,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
      },
      {
        path: '/manage-activities',
        name: 'manage-activities',
        component: activities
      },
      {
        path: '/manage-activities/create',
        name: 'manage-activities-create',
        component: activityCreate
      },
      {
        path: '/manage-activities/:activityId/update',
        name: 'manage-activities-update',
        component: activityUpdate
      },
      {
        path: '/manage-user-activities',
        name: 'manage-user-activities',
        component: userActivities
      },
      {
        path: '/manage-user-activities/create',
        name: 'manage-user-activities-create',
        component: userActivityCreate
      },
      {
        path: '/manage-user-activities/id/:id/user-id/:userId/edit',
        name: 'manage-user-activities-edit',
        component: userActivityUpdate
      },
      {
        path: '/dropdowns',
        component: dropdowns
      },
      {
        path: '/typography',
        component: typography
      },
      {
        path: '/chartjs',
        component: chartjs
      },
      {
        path: '/mdiIcons',
        component: mdiIcons
      },
      {
        path: '/basic_table',
        name: 'basicTables',
        component: basicTables
      }
    ]
    },
    {
      path: "/login",
      name: "login",
      component: login
  },
  {
    path: '*',
    redirect: '/pages/error_404',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: '/pages/login',
        component: login
      },
      {
        path: '/pages/register',
        component: register
      }
    ]}
  ]
})
