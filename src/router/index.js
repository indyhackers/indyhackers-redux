import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import OmniView from '../views/OmniView.vue'
import PlaceholderView from '../views/PlaceholderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      props: { title: 'Home', content: 'Welcome to IndyHackers.' }
    },
    {
      path: '/events',
      name: 'Events',
      component: PlaceholderView,
      props: { title: 'Events', content: 'Upcoming events and meetups.' }
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: OmniView,
      props: { currentComponent: 'JobsList' }
    },
    {
      path: '/job',
      component: OmniView,
      props: { currentComponent: 'JobListing' }
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/newsletter',
      name: 'Newsletter',
      component: PlaceholderView,
      props: { title: 'Newsletter', content: 'Subscribe to our newsletter.' }
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: PlaceholderView,
      props: { title: 'Privacy Policy', content: 'Our privacy policy.' }
    },
    {
      path: '/terms',
      name: 'Terms',
      component: PlaceholderView,
      props: { title: 'Terms of Service', content: 'Our terms of service.' }
    },
    {
      path: '/support',
      name: 'Support',
      component: PlaceholderView,
      props: { title: 'Support', content: 'Get support.' }
    }
  ]
})

export default router
