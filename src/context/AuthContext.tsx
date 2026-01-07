'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react"
import { coreAPI } from "../../lib/coreAPI";

const AuthContext = createContext<{ user: any; loading: boolean, logout: () => void } | null>(null)
export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.post('/api/logout', {}, {withCredentials: true})
            router.push('/sign-in')
            router.refresh()
        } catch (error) {
            console.log("Logout error:", error);
        }
    }
    useEffect(() => {
        const fetchUser  = async () => {
            const token = localStorage.getItem('token')
            try {
                setLoading(true)
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/me`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                    
                })
                setUser(res.data.user)
            } catch (error) {
                 localStorage.removeItem('token')
                 setUser(null)
            }finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])
  return (
    <div>
        <AuthContext.Provider value={{user, loading, logout}}>
            {children}
        </AuthContext.Provider>
    </div>
  )
}

export const useAuth = () => useContext(AuthContext)