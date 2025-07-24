# Job Search + Preparation App

A React Native mobile application built with Expo Router, TypeScript, and styled-components for job search and preparation.

## 🚀 Features

- **Authentication System**: Complete sign-in/sign-up flow with Firebase
- **Form Validation**: React Hook Form with Zod schema validation
- **Onboarding Flow**: Multi-step user onboarding process
- **Clean UI**: Professional design inspired by Upwork
- **TypeScript**: Full type safety throughout the application

## 📱 Screens

### Authentication
- **Landing Screen** (`app/index.tsx`): Welcome screen with app introduction
- **Sign In** (`app/auth/sign-in.tsx`): Email/password and Google authentication
- **Sign Up** (`app/auth/sign-up.tsx`): User registration with validation

### Onboarding
- **Step 1** (`app/onboarding/1`): Role selection (Developer, Designer, Marketer, Manager, Other)
- **Step 2** (`app/onboarding/2`): Skills input with chip interface
- **Step 3** (`app/onboarding/3`): Resume upload

## 🛠 Tech Stack

- **React Native** + **Expo Router** (file-based routing)
- **TypeScript** for type safety
- **styled-components/native** for styling
- **React Hook Form** for form management
- **Zod** for schema validation
- **Firebase** for authentication
- **SafeAreaProvider** for device compatibility

## 📁 Project Structure

```
├── app/                          # Expo Router screens
│   ├── index.tsx                 # Landing screen
│   ├── auth/                     # Authentication screens
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── onboarding/               # Onboarding flow
│   │   └── [step].tsx
│   └── _layout.tsx               # Root layout
├── components/                   # Reusable UI components
│   └── ui/                       # Base UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── ProgressBar.tsx
│       └── index.ts
├── constants/                    # App constants
│   └── theme.ts                  # Design system
├── contexts/                     # React contexts
│   └── AuthContext.tsx           # Authentication context
├── hooks/                        # Custom hooks
│   └── useAuth.ts                # Auth hook (legacy)
├── lib/                          # Library code
│   ├── firebase/                 # Firebase configuration
│   │   └── config.ts
│   ├── services/                 # Service layer
│   │   └── auth.ts               # Authentication service
│   └── validation/               # Zod validation schemas
│       ├── auth.ts               # Auth validation
│       └── onboarding.ts         # Onboarding validation
└── README.md
```

## 🔐 Authentication System

### Features
- **Email/Password Authentication**: Traditional sign-in/sign-up
- **Google Authentication**: OAuth integration (simulated)
- **Form Validation**: Real-time validation with Zod schemas
- **Error Handling**: Comprehensive error messages
- **Loading States**: Proper loading indicators
- **Password Reset**: Email-based password reset

### Implementation Details

#### Validation Schemas (`lib/validation/auth.ts`)
```typescript
export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

export const signUpSchema = z.object({
  name: z.string().min(1, 'Full name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to the Terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
```

#### Authentication Service (`lib/services/auth.ts`)
```typescript
export class AuthService {
  static async signUp(data: SignUpFormData): Promise<AuthUser>
  static async signIn(data: SignInFormData): Promise<AuthUser>
  static async signInWithGoogle(idToken: string): Promise<AuthUser>
  static async signOut(): Promise<void>
  static async sendPasswordResetEmail(email: string): Promise<void>
  static getCurrentUser(): AuthUser | null
  static onAuthStateChanged(callback: (user: AuthUser | null) => void)
}
```

#### Authentication Context (`contexts/AuthContext.tsx`)
```typescript
interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: (idToken: string) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  clearError: () => void;
}
```

## 🎨 Design System

### Theme (`constants/theme.ts`)
- **Colors**: Neutral, primary, semantic (success, warning, error)
- **Typography**: 8-size scale (12px to 48px)
- **Spacing**: 8px base unit system
- **Border Radius**: Consistent radius values
- **Shadows**: Subtle elevation system

### UI Components
- **Button**: Primary, secondary, outline variants with loading states
- **Input**: Labeled inputs with error handling and validation
- **Card**: Content containers with elevation options
- **Badge**: Status indicators and tags
- **ProgressBar**: Progress visualization

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- Firebase project

### Installation
```bash
# Install dependencies
npm install

# Install additional dependencies
npm install react-hook-form @hookform/resolvers zod firebase @react-native-async-storage/async-storage
```

### Firebase Configuration
1. Create a Firebase project
2. Enable Authentication (Email/Password, Google)
3. Update `lib/firebase/config.ts` with your Firebase config:
```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### Running the App
```bash
# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## 📋 Form Implementation Standards

### React Hook Form Integration
- All forms use `useForm` hook with Zod resolver
- Form validation happens in real-time
- Error messages are displayed inline
- Loading states are properly managed

### Validation Patterns
- **Required Fields**: Minimum length validation
- **Email Validation**: Proper email format checking
- **Password Strength**: Uppercase, lowercase, number requirements
- **Custom Validation**: Cross-field validation (password confirmation)
- **Terms Agreement**: Boolean validation for checkboxes

### Error Handling
- **Field-level Errors**: Displayed below each input
- **Form-level Errors**: Displayed at the top of forms
- **Firebase Errors**: Mapped to user-friendly messages
- **Network Errors**: Proper error boundaries

## 🎯 User Flow

1. **Landing Screen** → User sees app introduction
2. **Sign Up** → User creates account with validation
3. **Onboarding Step 1** → Role selection
4. **Onboarding Step 2** → Skills input
5. **Onboarding Step 3** → Resume upload
6. **Main App** → User enters the main application

## 🔒 Security Features

- **Password Requirements**: Strong password validation
- **Input Sanitization**: Proper input cleaning
- **Error Messages**: Non-revealing error messages
- **Session Management**: Proper auth state handling
- **Form Validation**: Client-side validation with server verification

## 🚀 Future Enhancements

- [ ] Google Sign-In SDK integration
- [ ] Apple Sign-In for iOS
- [ ] Biometric authentication
- [ ] Two-factor authentication
- [ ] Email verification
- [ ] Profile management
- [ ] Password strength indicator
- [ ] Remember me functionality

## 📝 Notes

- Google Sign-In is currently simulated for demo purposes
- Firebase configuration needs to be updated with actual credentials
- File upload functionality is simulated in onboarding
- The app follows a clean, professional design inspired by Upwork
- All components are built with accessibility in mind
- The codebase is fully typed with TypeScript
