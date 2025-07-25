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

export interface AuthSuccess {
  user: AuthUser;
  message: string;
}

export class AuthService {
  // Sign up with email and password
  static async signUp(data: SignUpFormData): Promise<AuthSuccess> {
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

      const authUser = this.mapUserToAuthUser(userCredential.user);
      return {
        user: authUser,
        message: `Welcome ${data.name}! Your account has been created successfully.`
      };
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in with email and password
  static async signIn(data: SignInFormData): Promise<AuthSuccess> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const authUser = this.mapUserToAuthUser(userCredential.user);
      const displayName = authUser.displayName || 'User';
      return {
        user: authUser,
        message: `Welcome back, ${displayName}!`
      };
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in with Google
  static async signInWithGoogle(idToken: string): Promise<AuthSuccess> {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential: UserCredential = await signInWithCredential(
        auth,
        credential
      );

      const authUser = this.mapUserToAuthUser(userCredential.user);
      const displayName = authUser.displayName || 'User';
      return {
        user: authUser,
        message: `Welcome, ${displayName}! Signed in with Google successfully.`
      };
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign out
  static async signOut(): Promise<{ message: string }> {
    try {
      await signOut(auth);
      return { message: 'Signed out successfully' };
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Send password reset email
  static async sendPasswordResetEmail(email: string): Promise<{ message: string }> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { 
        message: `Password reset email sent to ${email}. Please check your inbox and follow the instructions.`
      };
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

  // Handle Firebase auth errors with more specific messages
  private static handleAuthError(error: any): AuthError {
    let message = 'An unexpected error occurred during authentication';

    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'An account with this email already exists. Please try signing in instead.';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email address.';
        break;
      case 'auth/weak-password':
        message = 'Password is too weak. Please choose a stronger password with at least 8 characters, including uppercase, lowercase, and numbers.';
        break;
      case 'auth/user-not-found':
        message = 'No account found with this email address. Please check your email or create a new account.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password. Please try again or use "Forgot Password" to reset it.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again in a few minutes.';
        break;
      case 'auth/network-request-failed':
        message = 'Network error. Please check your internet connection and try again.';
        break;
      case 'auth/user-disabled':
        message = 'This account has been disabled. Please contact support for assistance.';
        break;
      case 'auth/operation-not-allowed':
        message = 'This sign-in method is not enabled. Please contact support.';
        break;
      case 'auth/invalid-credential':
        message = 'Invalid credentials. Please check your email and password.';
        break;
      case 'auth/invalid-verification-code':
        message = 'Invalid verification code. Please try again.';
        break;
      case 'auth/invalid-verification-id':
        message = 'Invalid verification ID. Please try again.';
        break;
      case 'auth/quota-exceeded':
        message = 'Service temporarily unavailable. Please try again later.';
        break;
      case 'auth/app-not-authorized':
        message = 'This app is not authorized to use Firebase Authentication.';
        break;
      case 'auth/account-exists-with-different-credential':
        message = 'An account already exists with the same email but different sign-in credentials.';
        break;
      case 'auth/requires-recent-login':
        message = 'This operation requires recent authentication. Please sign in again.';
        break;
      case 'auth/user-token-expired':
        message = 'Your session has expired. Please sign in again.';
        break;
      case 'auth/invalid-user-token':
        message = 'Invalid session. Please sign in again.';
        break;
      case 'auth/user-mismatch':
        message = 'User mismatch. Please sign in with the correct account.';
        break;
      case 'auth/credential-already-in-use':
        message = 'This credential is already associated with another account.';
        break;
      case 'auth/operation-not-supported-in-this-environment':
        message = 'This operation is not supported in your current environment.';
        break;
      case 'auth/timeout':
        message = 'Request timed out. Please check your connection and try again.';
        break;
      case 'auth/cancelled-popup-request':
        message = 'Sign-in was cancelled.';
        break;
      case 'auth/popup-blocked':
        message = 'Sign-in popup was blocked. Please allow popups for this site.';
        break;
      case 'auth/popup-closed-by-user':
        message = 'Sign-in popup was closed before completing.';
        break;
      case 'auth/unauthorized-domain':
        message = 'This domain is not authorized for sign-in.';
        break;
      case 'auth/invalid-api-key':
        message = 'Invalid API key. Please contact support.';
        break;
      case 'auth/app-deleted':
        message = 'This app has been deleted. Please contact support.';
        break;
      case 'auth/app-not-authorized':
        message = 'This app is not authorized to use Firebase Authentication.';
        break;
      case 'auth/argument-error':
        message = 'Invalid argument provided. Please check your input.';
        break;
      case 'auth/invalid-app-credential':
        message = 'Invalid app credential. Please try again.';
        break;
      case 'auth/invalid-app-id':
        message = 'Invalid app ID. Please contact support.';
        break;
      case 'auth/invalid-user-token':
        message = 'Invalid user token. Please sign in again.';
        break;
      case 'auth/invalid-tenant-id':
        message = 'Invalid tenant ID. Please contact support.';
        break;
      case 'auth/unsupported-persistence-type':
        message = 'Unsupported persistence type. Please contact support.';
        break;
      case 'auth/invalid-persistence-type':
        message = 'Invalid persistence type. Please contact support.';
        break;
      case 'auth/unsupported-first-factor':
        message = 'Unsupported first factor. Please contact support.';
        break;
      case 'auth/email-change-needs-verification':
        message = 'Email change requires verification. Please check your email.';
        break;
      case 'auth/second-factor-already-in-use':
        message = 'Second factor already in use. Please contact support.';
        break;
      case 'auth/maximum-second-factor-count-exceeded':
        message = 'Maximum second factor count exceeded. Please contact support.';
        break;
      case 'auth/unsupported-tenant-operation':
        message = 'Unsupported tenant operation. Please contact support.';
        break;
      case 'auth/invalid-phone-number':
        message = 'Invalid phone number format. Please enter a valid phone number.';
        break;
      case 'auth/missing-phone-number':
        message = 'Phone number is required. Please enter your phone number.';
        break;
      case 'auth/quota-exceeded':
        message = 'Service quota exceeded. Please try again later.';
        break;
      case 'auth/reset-password-exceed-limit':
        message = 'Password reset limit exceeded. Please try again later.';
        break;
      case 'auth/invalid-recipient-email':
        message = 'Invalid recipient email. Please check the email address.';
        break;
      case 'auth/missing-ios-bundle-id':
        message = 'Missing iOS bundle ID. Please contact support.';
        break;
      case 'auth/missing-android-pkg-name':
        message = 'Missing Android package name. Please contact support.';
        break;
      case 'auth/unauthorized-continue-uri':
        message = 'Unauthorized continue URI. Please contact support.';
        break;
      case 'auth/invalid-continue-uri':
        message = 'Invalid continue URI. Please contact support.';
        break;
      case 'auth/missing-continue-uri':
        message = 'Missing continue URI. Please contact support.';
        break;
      case 'auth/missing-iframe-start':
        message = 'Missing iframe start. Please contact support.';
        break;
      case 'auth/auth-domain-config-required':
        message = 'Auth domain configuration required. Please contact support.';
        break;
      case 'auth/unauthorized-domain':
        message = 'Unauthorized domain. Please contact support.';
        break;
      case 'auth/invalid-dynamic-link-domain':
        message = 'Invalid dynamic link domain. Please contact support.';
        break;
      case 'auth/argument-error':
        message = 'Invalid argument. Please check your input and try again.';
        break;
      case 'auth/invalid-persistence-type':
        message = 'Invalid persistence type. Please contact support.';
        break;
      case 'auth/unsupported-persistence-type':
        message = 'Unsupported persistence type. Please contact support.';
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