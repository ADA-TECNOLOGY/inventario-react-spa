import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import RouteApp from './routes'
import Sidebar from './components/Sidebar/Index'
import Header from './components/Header'
import { AuthProvider } from './hooks/auth'

ReactDOM.createRoot(document.getElementById('root')!).render(
<BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <Sidebar>
            <RouteApp/>
            {/* <StylesGlobal /> */}
          </Sidebar>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>,
)
