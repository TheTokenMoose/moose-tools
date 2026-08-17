/**
 * Curated English Piper voices (MIT — rhasspy/piper-voices).
 * Models are NOT bundled; downloaded on demand to OPFS via piper-tts-web.
 * Verify MODEL_CARD on Hugging Face before adding new voices.
 */
(function (global) {
  /** Approximate sizes (onnx + json); used for UI only */
  const VOICES = [
    {
      id: "en_GB-alan-medium",
      displayName: "British English — Alan (male)",
      language: "en",
      locale: "en-GB",
      accent: "British",
      gender: "male",
      quality: "medium",
      sizeBytes: 63_000_000,
      sizeLabel: "~63 MB",
      license: "MIT",
      attribution: "Rhasspy / Piper voices (alan)",
      source: "https://huggingface.co/rhasspy/piper-voices",
      bundled: false,
    },
    {
      id: "en_GB-alba-medium",
      displayName: "British English — Alba (female)",
      language: "en",
      locale: "en-GB",
      accent: "British",
      gender: "female",
      quality: "medium",
      sizeBytes: 63_000_000,
      sizeLabel: "~63 MB",
      license: "MIT",
      attribution: "Rhasspy / Piper voices (alba)",
      source: "https://huggingface.co/rhasspy/piper-voices",
      bundled: false,
    },
    {
      id: "en_US-lessac-medium",
      displayName: "American English — Lessac (female)",
      language: "en",
      locale: "en-US",
      accent: "American",
      gender: "female",
      quality: "medium",
      sizeBytes: 63_000_000,
      sizeLabel: "~63 MB",
      license: "MIT",
      attribution: "Rhasspy / Piper voices (lessac)",
      source: "https://huggingface.co/rhasspy/piper-voices",
      bundled: false,
    },
    {
      id: "en_US-ryan-medium",
      displayName: "American English — Ryan (male)",
      language: "en",
      locale: "en-US",
      accent: "American",
      gender: "male",
      quality: "medium",
      sizeBytes: 63_000_000,
      sizeLabel: "~63 MB",
      license: "MIT",
      attribution: "Rhasspy / Piper voices (ryan)",
      source: "https://huggingface.co/rhasspy/piper-voices",
      bundled: false,
    },
    {
      id: "en_US-hfc_female-medium",
      displayName: "American English — HFC Female",
      language: "en",
      locale: "en-US",
      accent: "American",
      gender: "female",
      quality: "medium",
      sizeBytes: 63_000_000,
      sizeLabel: "~63 MB",
      license: "MIT",
      attribution: "Rhasspy / Piper voices (hfc_female)",
      source: "https://huggingface.co/rhasspy/piper-voices",
      bundled: false,
    },
    {
      id: "en_US-hfc_male-medium",
      displayName: "American English — HFC Male",
      language: "en",
      locale: "en-US",
      accent: "American",
      gender: "male",
      quality: "medium",
      sizeBytes: 63_000_000,
      sizeLabel: "~63 MB",
      license: "MIT",
      attribution: "Rhasspy / Piper voices (hfc_male)",
      source: "https://huggingface.co/rhasspy/piper-voices",
      bundled: false,
    },
  ];

  global.MooseTTSCatalog = {
    voices: VOICES,
    get(id) {
      return VOICES.find((v) => v.id === id) || null;
    },
    list() {
      return VOICES.slice();
    },
  };
})(typeof window !== "undefined" ? window : globalThis);
