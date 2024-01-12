import { Outlet } from 'react-router-dom'



export function AuthLayout(){

        return (
            <div className="grid min-h-screen grid-cols-2 antialiased">
              <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
                <div className="flex items-center gap-3 text-lg text-foreground">
                 
                  <span className="font-bold">Sushi Express</span>
                </div>
                
                <footer className="text-sm">
                  Welcome to sushi.express -  {new Date().getFullYear()} - Done with 
                </footer>
              </div>
        
              <div className="relative flex flex-col items-center justify-center">
              <Outlet />
              </div>
            </div>
          )
    
}