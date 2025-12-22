let recorder: MediaRecorder | null = null;
let chunks: Blob[] = [];

export async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    chunks = [];
    recorder = new MediaRecorder(stream);

    recorder.addEventListener("dataavailable", (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    });

    recorder.start();
  } catch {
    throw new Error("MIC_PERMISSION_DENIED");
  }
}


export function stopRecording(): Promise<Blob> {
  return new Promise((resolve) => {
    if (!recorder) return;

    recorder.addEventListener("stop", () => {
      const audioBlob = new Blob(chunks, { type: "audio/webm" });
      resolve(audioBlob);
    });

    recorder.stop();
  });
}
