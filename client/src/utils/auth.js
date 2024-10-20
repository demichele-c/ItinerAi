import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        try {
          const tokenData = decode(this.getToken());
          return tokenData.data; // Ensure this returns the user object with _id
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }

    loggedIn() {
        const token = this.getToken();
        return token ? true : false;
    }

    isTokenExpired(token) {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('id_token');
            return true; 
        }
        return false;
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.reload();
    }
}

export default new AuthService();