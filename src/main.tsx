import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import RouteApp from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
<BrowserRouter>
      <ChakraProvider>
        {/* <AuthProvider> */}
          {/* <SideBarDrawerProvider> */}
            <RouteApp/>
            {/* <StylesGlobal /> */}
          {/* </SideBarDrawerProvider> */}
        {/* </AuthProvider> */}
      </ChakraProvider>
    </BrowserRouter>,
)
