/**
 * Celestial Audio Engine for Fraternidade Raio Solar
 * Generates pure Solfeggio frequencies (432Hz, 528Hz, 741Hz) with soothing harmonic overtones,
 * crystal singing bowl resonance and Web Speech voice narration for Martha Vieira's canalized prayers.
 */

class CelestialAudioEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlayingAmbient: boolean = false;
  private currentFrequency: number = 528;
  private isSpeaking: boolean = false;
  private onTimeUpdateCallback?: (currentTime: number, duration: number) => void;
  private onEndedCallback?: () => void;
  private timerInterval: any = null;
  private simulatedSeconds: number = 0;
  private simulatedDuration: number = 465; // ~7:45 min

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setFrequency(freq: '432Hz' | '528Hz' | '741Hz') {
    const num = parseInt(freq);
    this.currentFrequency = isNaN(num) ? 528 : num;
    if (this.isPlayingAmbient && this.osc1 && this.osc2 && this.ctx) {
      this.osc1.frequency.setValueAtTime(this.currentFrequency, this.ctx.currentTime);
      this.osc2.frequency.setValueAtTime(this.currentFrequency * 1.5, this.ctx.currentTime);
    }
  }

  public startAmbient(freq: '432Hz' | '528Hz' | '741Hz' = '528Hz', volume: number = 0.25) {
    // Frequency generator disabled to ensure clear voice prayer without frequency drone
    this.stopAmbient();
  }

  public stopAmbient() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);
        setTimeout(() => {
          try {
            this.osc1?.stop();
            this.osc2?.stop();
            this.osc1?.disconnect();
            this.osc2?.disconnect();
            this.gainNode?.disconnect();
          } catch (err) {}
          this.osc1 = null;
          this.osc2 = null;
          this.gainNode = null;
        }, 150);
      } catch (e) {}
    }
    this.isPlayingAmbient = false;
  }

  public speakPrayer(text: string, onProgress?: () => void) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.88; // Calm, meditative pace
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.startsWith('pt') && (v.name.includes('Luciana') || v.name.includes('Maria') || v.name.includes('Francisca') || v.name.includes('Google português do Brasil') || v.name.toLowerCase().includes('female')));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onend = () => {
      this.isSpeaking = false;
      if (this.onEndedCallback) this.onEndedCallback();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
    };

    this.isSpeaking = true;
    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }

  public startFullSession(
    prayerText: string,
    frequency?: '432Hz' | '528Hz' | '741Hz',
    durationSec: number = 465,
    onTick?: (current: number, total: number) => void,
    onFinish?: () => void
  ) {
    this.simulatedDuration = durationSec;
    this.simulatedSeconds = 0;
    this.onTimeUpdateCallback = onTick;
    this.onEndedCallback = onFinish;
    this.stopAmbient();
    this.speakPrayer(prayerText);

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.simulatedSeconds++;
      if (this.onTimeUpdateCallback) this.onTimeUpdateCallback(this.simulatedSeconds, this.simulatedDuration);
      if (this.simulatedSeconds >= this.simulatedDuration) {
        this.stopSession();
        if (this.onEndedCallback) this.onEndedCallback();
      }
    }, 1000);
  }

  public stopSession() {
    this.stopAmbient();
    this.stopSpeaking();
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.simulatedSeconds = 0;
  }

  public pauseSession() {
    this.stopAmbient();
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  public resumeSession(frequency?: '432Hz' | '528Hz' | '741Hz') {
    this.stopAmbient();
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    if (!this.timerInterval) {
      this.timerInterval = setInterval(() => {
        this.simulatedSeconds++;
        if (this.onTimeUpdateCallback) this.onTimeUpdateCallback(this.simulatedSeconds, this.simulatedDuration);
        if (this.simulatedSeconds >= this.simulatedDuration) {
          this.stopSession();
          if (this.onEndedCallback) this.onEndedCallback();
        }
      }, 1000);
    }
  }
}

export const celestialAudio = new CelestialAudioEngine();
