import { Injectable } from '@angular/core';
import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root'
})
export class FaceRecognitionService {
  private modelsLoaded = false;

  async loadModels(): Promise<void> {
    if (this.modelsLoaded) return;

    const MODEL_URL = '/assets/models';
    
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
    ]);

    this.modelsLoaded = true;
  }

  async detectFace(video: HTMLVideoElement): Promise<faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection; }>> | undefined> {
    if (!this.modelsLoaded) {
      await this.loadModels();
    }

    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    return detection;
  }

  getFaceDescriptor(detection: faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection; }>>): string {
    return JSON.stringify(Array.from(detection.descriptor));
  }

  drawDetections(canvas: HTMLCanvasElement, video: HTMLVideoElement, detection: any): void {
    // Use videoWidth/videoHeight which are the actual video dimensions
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    
    // Validate dimensions before proceeding
    if (!displaySize.width || !displaySize.height) {
      console.warn('Video dimensions not ready yet');
      return;
    }
    
    faceapi.matchDimensions(canvas, displaySize);
    
    const resizedDetection = faceapi.resizeResults(detection, displaySize);
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetection);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);
    }
  }
}