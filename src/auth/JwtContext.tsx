import { createContext, useEffect, useReducer, useCallback } from "react";
//
import { isValidToken, setSession } from "./utils";
import {
  ActionMapType,
  AuthStateType,
  AuthUserType,
  JWTContextType,
} from "./types";
import fetcher from "../api/fetcher";
import { Slide, ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material";
import { END_POINTS } from "../api/EndPoints";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../routes/paths";
import ChatWidget from "../components/CustomComponents/ChatWidget";

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type == Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type == Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type == Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type == Types.LOGOUT) {
    return {
      ...state,
      isInitialized: true,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("neo_partner_token")
          : "";

      if (accessToken) {
        const response = await fetcher.get(END_POINTS.AUTH.ME);
        const { data }: { data: AuthUserType } = response;
        if (
          data?.isAdminApproved &&
          data.isDocumentUplaoded &&
          data.status == "verified"
        ) {
          dispatch({
            type: Types.INITIAL,
            payload: {
              isAuthenticated: true,
              user: response.data,
            },
          });
        } else {
          dispatch({
            type: Types.INITIAL,
            payload: {
              isAuthenticated: false,
              user: response.data,
            },
          });
        }
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = async (token: string, user: AuthUserType) => {
    localStorage.setItem("neo_partner_token", token);
    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
    // initialize()
  };

  // LOGOUT
  const logout = async () => {
    localStorage.removeItem("neo_partner_token");
    dispatch({
      type: Types.LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        initialize,
        loginWithGoogle: () => {},
        loginWithGithub: () => {},
        loginWithTwitter: () => {},
        logout,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      {children}
    </AuthContext.Provider>
  );
}
