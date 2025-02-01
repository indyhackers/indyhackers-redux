import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import OmniView from '../views/OmniView.vue'
import PlaceholderView from '../views/PlaceholderView.vue'
import AdminLogin from '../components/AdminLogin.vue'
import LoginPage from '../components/LoginPage.vue'
import SignupPage from '../components/SignupPage.vue'
import SponsorsView from '../components/SponsorsView.vue'
import NewsletterView from '../components/NewsletterView.vue'
import EventRecommendationForm from '../components/EventRecommendationForm.vue'
import CalendarView from '../components/CalendarView.vue'
import CodeOfConduct from '../components/CodeOfConduct.vue'
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
    },
    { path: '/admin', name: 'Admin', component: AdminLogin },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/signup', name: 'Signup', component: SignupPage },
    { path: '/sponsors', name: 'Sponsors', component: SponsorsView },
    { path: '/newsletter', name: 'Newsletter', component: NewsletterView },
    { path: '/recommend-event', name: 'RecommendEvent', component: EventRecommendationForm },
    { path: '/events', name: 'Events', component: CalendarView },
    { path: '/code-of-conduct', name: 'CodeOfConduct', component: CodeOfConduct }
  ]
})

export default router
