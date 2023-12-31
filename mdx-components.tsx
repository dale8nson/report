import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({children}) => <h1 className='text-5xl' >{children}</h1>,
    h2: ({children}) => <h2 className='text-xl' >{children}</h2>,
    ...components,
  }
  }

