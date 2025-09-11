import {jwtDecode} from "jwt-decode"
import { logout } from "@/lib/slices/authSlice"
import type { AppDispatch } from "@/lib/store"

interface DecodedToken {
  exp: number
}

export const checkTokenExpiry = (token: string, dispatch: AppDispatch) => {
  try {
    const decoded: DecodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
      dispatch(logout())
    }
  } catch (e) {
    dispatch(logout())
  }
}
