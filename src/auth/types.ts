// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType =
  | {
      _id: string;
      firstName: string;
      lastName: string;
      companyEmail: string;
      companyContact: string;
      password: string;
      gstNumber: string;
      panNumber: string;
      companyName: string;
      status: string;
      ABRDetails: {
        abrName: string;
        abrEmail: string;
        abrMobileNo: string;
        _id: string;
      };
      origin: string;
      allowedServices: {
        _id: string;
        name: string;
        description: string;
        primaryKey: string;
        categoryId: string;
        serviceType: string;
        slabType: string;
        charge: {
          minAmount: number;
          maxAmount: number;
          type: string;
          value: number;
          includesGST: boolean;
        }[];
        commission: [];
        isEnabled: true;
        allowedToAPIUsers: string;
        createdAt: string;
        updatedAt: string;
      }[];
      requestedServices: [];
      plan: string;
      planAssignedOn: string;
      documents: string[];
      roleId: string;
      apiKey: string;
      isEnabled: boolean;
      isAdminApproved: boolean;
      isDocumentUplaoded: boolean;
      createdAt: string;
      updatedAt: string;
      neoPartnerId: string;
      wallet: {
        _id: string;
        apiPartner: string;
        lastLoadedBal: {
          $numberDecimal: string;
        };
        bal: {
          $numberDecimal: string;
        };
        lockedBal: {
          $numberDecimal: string;
        };
        totalCredits: {
          $numberDecimal: string;
        };
        totalDebits: {
          $numberDecimal: string;
        };
        type: string;
        isActive: true;
        createdAt: string;
        updatedAt: string;
        uniqueWalletId: string;
      };
      apiCredentials: {
        _id: string;
        whitelistedIps: [];
        callBackUrls: [
          {
            service: {
              _id: string;
              name: string;
              description: string;
              primaryKey: string;
              categoryId: string;
              vendors: string[];
              serviceType: string;
              slabType: string;
              charge: {
                minAmount: number;
                maxAmount: number;
                type: string;
                value: number;
                includesGST: boolean;
              }[];
              commission: [];
              activeVendor: string;
              isEnabled: boolean;
              allowedToAPIUsers: string;
              createdAt: string;
              updatedAt: string;
            };
            url: string;
            _id: string;
          }
        ];
        partnerId: string;
        createdAt: string;
        updatedAt: string;
      };
    }
  | null
  | Record<string, any>;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType | null;
};

// ----------------------------------------------------------------------

export type JWTContextType = {
  method: "jwt";
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  login: (token: string, user: AuthUserType) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  loginWithGoogle?: () => void;
  loginWithGithub?: () => void;
  loginWithTwitter?: () => void;
};
