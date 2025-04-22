import { createContext, useContext } from "react";

// Create context
const AuthContext = createContext(null);

// Export hook to use the context
export const useAuth = () => useContext(AuthContext);

// Export the context itself as default
export default AuthContext;
