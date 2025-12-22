const ENDPOINT =
  "https://api.deepgram.com/v1/listen?punctuate=true&language=en";

export async function transcribe(audio: Blob): Promise<string> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Token ${import.meta.env.VITE_DEEPGRAM_API_KEY}`,
      "Content-Type": "audio/wav",
    },
    body: audio,
  });

  if (!response.ok) {
    throw new Error("TRANSCRIPTION_FAILED");
  }

  const data = await response.json();
  return (
    data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || ""
  );
}
