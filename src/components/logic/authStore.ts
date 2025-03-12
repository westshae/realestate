class AuthStore {
  private static readonly TOKEN_KEY = 'jwtToken';
  private static readonly EMAIL_KEY = 'userEmail';

  static saveToken(token: string, email: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EMAIL_KEY, email);
  }

  static getTokenAndEmail(): { token: string | null, email: string | null } {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const email = localStorage.getItem(this.EMAIL_KEY);
    return { token, email };
  }

  static isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token !== null;
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
  }
}

export default AuthStore;