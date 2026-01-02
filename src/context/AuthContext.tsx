'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext<{ user: any; loading: boolean, logout: () => void } | null>(null)
export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        router.push('/sign-in')
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