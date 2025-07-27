'use client'

import { theme, darkTheme } from '@/theme';
import { CacheProvider } from '@chakra-ui/next-js'
import {ChakraProvider, ColorModeScript, useColorMode} from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from 'react-query'; 
import {useUtilState} from "@/global-state/useUtilState";

const queryClient = new QueryClient();
 
export function Providers({
  children 
}: {
  children: React.ReactNode 
}) {
    const { isDarkMode } = useUtilState((state) => state);
    const { colorMode, toggleColorMode } = useColorMode();

    return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {/* <SessionProvider session={session}> */}
              {children}
            {/* </SessionProvider> */}
        </ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  )
}