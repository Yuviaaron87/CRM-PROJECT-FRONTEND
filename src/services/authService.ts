import type {
  AuthSession,
  LoginCredentials,
} from "../types/authTypes";

const STORAGE_KEY = "crm_auth";

const MOCK_EMAIL = "admin@crmflow.com";
const MOCK_PASSWORD = "Admin@123";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const authService = {
  async login(
    credentials: LoginCredentials
  ): Promise<AuthSession> {
    await delay(700);

    const email = credentials.email
      .trim()
      .toLowerCase();

    if (
      email !== MOCK_EMAIL ||
      credentials.password !== MOCK_PASSWORD
    ) {
      throw new Error(
        "Invalid email or password"
      );
    }

    const session: AuthSession = {
      user: {
        id: "USER-001",
        name: "CRM Admin",
        email: MOCK_EMAIL,
        role: "Administrator",
        initials: "CA",
      },

      // Mock token only.
      token: "crm-demo-session-token",
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(session)
    );

    return session;
  },

  getSession(): AuthSession | null {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(
        stored
      ) as AuthSession;
    } catch {
      localStorage.removeItem(
        STORAGE_KEY
      );

      return null;
    }
  },

  logout(): void {
    localStorage.removeItem(
      STORAGE_KEY
    );
  },
};