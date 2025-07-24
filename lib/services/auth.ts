import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithCredential,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
    UserCredential,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { SignInFormData, SignUpFormData } from '../validation/auth';

export interface AuthError {
  code: string;
  message: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export class AuthService {
  // Sign up with email and password
  static async signUp(data: SignUpFormData): Promise<AuthUser> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Update display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: data.name,
        });
      }

      return this.mapUserToAuthUser(userCredential.user);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in with email and password
  static async signIn(data: SignInFormData): Promise<AuthUser> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      return this.mapUserToAuthUser(userCredential.user);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in with Google
  static async signInWithGoogle(idToken: string): Promise<AuthUser> {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential: UserCredential = await signInWithCredential(
        auth,
        credential
      );

      return this.mapUserToAuthUser(userCredential.user);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign out
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Send password reset email
  static async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Get current user
  static getCurrentUser(): AuthUser | null {
    const user = auth.currentUser;
    return user ? this.mapUserToAuthUser(user) : null;
  }

  // Listen to auth state changes
  static onAuthStateChanged(callback: (user: AuthUser | null) => void) {
    return auth.onAuthStateChanged((user) => {
      callback(user ? this.mapUserToAuthUser(user) : null);
    });
  }

  // Map Firebase User to AuthUser
  private static mapUserToAuthUser(user: User): AuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  }

  // Handle Firebase auth errors
  private static handleAuthError(error: any): AuthError {
    let message = 'An error occurred during authentication';

    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'An account with this email already exists';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email address';
        break;
      case 'auth/weak-password':
        message = 'Password is too weak. Please choose a stronger password';
        break;
      case 'auth/user-not-found':
        message = 'No account found with this email address';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password. Please try again';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again later';
        break;
      case 'auth/network-request-failed':
        message = 'Network error. Please check your connection';
        break;
      case 'auth/user-disabled':
        message = 'This account has been disabled';
        break;
      case 'auth/operation-not-allowed':
        message = 'This operation is not allowed';
        break;
      case 'auth/invalid-credential':
        message = 'Invalid credentials';
        break;
      default:
        message = error.message || message;
    }

    return {
      code: error.code || 'auth/unknown',
      message,
    };
  }
} 