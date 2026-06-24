import { useEffect, useState } from 'react';

const AudioPlayer = ({ audioBase64, autoPlay, onEnded }) => {
  useEffect(() => {
    if (!audioBase64) return;

    const blob = new Blob(
      [Uint8Array.from(atob(audioBase64), (c) => c.charCodeAt(0))],
      { type: 'audio/mpeg' }
    );
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    let cancelled = false;

    audio.onended = () => {
      if (!cancelled) onEnded?.();
    };

    if (autoPlay) {
      audio.play().catch((err) => {
        // Ignore AbortError — happens when component re-renders before play() resolves
        if (err.name !== 'AbortError') console.error('Audio play error:', err);
      });
    }

    return () => {
      cancelled = true;
      audio.pause();
      audio.src = '';
      URL.revokeObjectURL(url);
    };
  }, [audioBase64]);

  return null;
};

export default AudioPlayer;