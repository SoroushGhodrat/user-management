import './App.css'
import Admin from './pages/Admin.page'
import { store } from './store'
import { Provider } from 'react-redux'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Admin />
    </Provider>
  )
}

export default App

/**
 * statemanagement for server side rendering and API calls
 *  */

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// import './App.css'
// import Admin from './pages/Admin.page'
// import { store } from './store'
// import { Provider } from 'react-redux'

// // Create a client
// const queryClient = new QueryClient()

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <QueryClientProvider client={queryClient}>
//         <Admin />
//         <ReactQueryDevtools initialIsOpen={false} />
//       </QueryClientProvider>
//     </Provider>
//   )
// }

// export default App
