import Home from '@/components/pages/Home';

export const routes = {
  home: {
    id: 'home',
    label: 'LinguaFlow',
    path: '/',
    icon: 'MessageCircle',
    component: Home
  },
  vocabulary: {
    id: 'vocabulary',
    label: 'Vocabulary',
    path: '/vocabulary',
    icon: 'Brain',
    component: Home // Will be replaced with VocabularyLessons component when created
  },
  grammar: {
    id: 'grammar',
    label: 'Grammar',
    path: '/grammar',
    icon: 'BookOpen',
    component: Home // Will be replaced with GrammarExercises component when created
  },
  quiz: {
    id: 'quiz',
    label: 'Quiz',
    path: '/quiz',
    icon: 'CheckCircle',
    component: Home // Will be replaced with Quiz component when created
  }
};

export const routeArray = Object.values(routes);
export default routes;