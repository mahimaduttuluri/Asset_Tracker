import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FaceRecognitionService } from '../services/face-recognition.service';
import { environment } from '../../environments/environment.example';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  mode: 'signin' | 'signup' = 'signin';
  username = '';
  password = '';
  signupUsername = '';
  signupEmail = '';
  signupPassword = '';
  errorMessage = '';
  showFaceLogin = false;
  faceLoginActive = false;
  stream: MediaStream | null = null;
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private faceService: FaceRecognitionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check Azure AD callback FIRST before anything else
    // This prevents race conditions
    this.checkAzureAdCallback();
    
    // If callback was processed, component will navigate away
    // If not, check if already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }
    
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.handleGoogleCallback.bind(this)
      });

      google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large', width: 350 }
      );
    }
  }

  handleGoogleCallback(response: any): void {
    this.authService.googleLogin(response.credential).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Google login failed. Please try again.';
      }
    });
  }

  checkAzureAdCallback(): void {
    console.log('=== checkAzureAdCallback CALLED ===');
    console.log('Current URL:', window.location.href);
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const username = urlParams.get('username');
    const error = urlParams.get('error');
    
    console.log('Token from URL:', token ? 'EXISTS' : 'NULL');
    console.log('Username from URL:', username);
    console.log('Error from URL:', error);

    // Handle error
    if (error) {
      console.error('Azure AD error:', error);
      this.errorMessage = `Azure AD login failed: ${error}`;
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    // Only process if we have token and username in URL
    if (!token || !username) {
      console.log('No token or username in URL, skipping callback processing');
      return;
    }

    console.log('Token and username found, processing...');

    // EMERGENCY LOOP PREVENTION
    // Check if this exact token was already processed
    const processedToken = sessionStorage.getItem('azureAdProcessedToken');
    console.log('Previously processed token:', processedToken ? 'EXISTS' : 'NULL');
    
    if (processedToken === token) {
      console.log('Token already processed, skipping...');
      // Already processed - clear URL, remove params, and STOP
      window.history.replaceState({}, document.title, '/login');
      // If we're still on login page with no params, redirect to dashboard
      if (this.authService.isAuthenticated() && !window.location.search) {
        console.log('User authenticated, redirecting to dashboard');
        window.location.href = '/dashboard';
      }
      return;
    }

    console.log('Processing new token...');
    
    // Mark this token as processed IMMEDIATELY
    sessionStorage.setItem('azureAdProcessedToken', token);
    console.log('Token marked as processed in sessionStorage');
    
    // Use AuthService to handle the callback properly
    console.log('Calling authService.handleAzureAdCallback...');
    this.authService.handleAzureAdCallback(token, username);
    console.log('AuthService callback completed');
    
    // Clear URL parameters
    window.history.replaceState({}, document.title, '/login');
    console.log('URL parameters cleared');
    
    // FORCE navigation - use replace to prevent back button issues
    console.log('Navigating to dashboard...');
    window.location.replace('/dashboard');
  }

  loginWithAzureAd(): void {
    window.location.href = `${environment.apiUrl}/auth/azuread/signin`;
  }

  setMode(mode: 'signin' | 'signup'): void {
    this.mode = mode;
    this.errorMessage = '';
    this.showFaceLogin = false;
    this.stopFaceLogin();
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.isSubmitting = true;
    
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password';
      this.isSubmitting = false;
      return;
    }

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }

  onRegister(): void {
    this.errorMessage = '';
    this.isSubmitting = true;
    
    if (!this.signupUsername || !this.signupPassword) {
      this.errorMessage = 'Please enter username and password';
      this.isSubmitting = false;
      return;
    }

    this.authService.register({
      username: this.signupUsername,
      email: this.signupEmail,
      password: this.signupPassword
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        // Auto-login after registration
        this.username = this.signupUsername;
        this.password = this.signupPassword;
        this.mode = 'signin';
        this.onSubmit();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  async toggleFaceLogin(): Promise<void> {
    this.showFaceLogin = !this.showFaceLogin;
    
    if (this.showFaceLogin) {
      await this.startFaceLogin();
    } else {
      this.stopFaceLogin();
    }
  }

  async startFaceLogin(): Promise<void> {
    try {
      console.log('=== Starting Face Login ===');
      console.log('Loading face detection models...');
      await this.faceService.loadModels();
      console.log('Models loaded successfully');
      
      console.log('Requesting camera access...');
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      console.log('Camera access granted');
      
      setTimeout(() => {
        if (this.videoElement) {
          const video = this.videoElement.nativeElement;
          video.srcObject = this.stream;
          
          // Wait for video to be ready
          video.onloadedmetadata = () => {
            console.log('Video metadata loaded, dimensions:', video.videoWidth, 'x', video.videoHeight);
            video.play();
            this.faceLoginActive = true;
            console.log('Starting face detection...');
            this.detectFace();
          };
        }
      }, 100);
    } catch (error) {
      console.error('Face login error:', error);
      this.errorMessage = 'Could not access camera. Please check permissions.';
      this.showFaceLogin = false;
    }
  }

  async detectFace(): Promise<void> {
    if (!this.faceLoginActive || !this.videoElement) return;

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;

    // Ensure video is ready
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.log('Video not ready yet, waiting...');
      setTimeout(() => this.detectFace(), 100);
      return;
    }

    const detection = await this.faceService.detectFace(video);

    if (detection) {
      console.log('Face detected! Attempting login...');
      this.faceService.drawDetections(canvas, video, detection);
      
      const descriptor = this.faceService.getFaceDescriptor(detection);
      console.log('Face descriptor generated, sending to backend...');
      
      this.authService.faceLogin(descriptor).subscribe({
        next: (response) => {
          console.log('✅ Face login successful!', response);
          this.stopFaceLogin();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log('❌ Face not recognized (401 Unauthorized), continuing detection...');
          console.log('Error details:', err.status, err.message);
          // Continue trying to detect and match face
          setTimeout(() => this.detectFace(), 500);
        }
      });
    } else {
      // No face detected, keep trying
      setTimeout(() => this.detectFace(), 100);
    }
  }

  stopFaceLogin(): void {
    this.faceLoginActive = false;
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  ngOnDestroy(): void {
    this.stopFaceLogin();
  }
}