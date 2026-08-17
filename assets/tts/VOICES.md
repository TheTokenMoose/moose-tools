# TTS voices (UK English)

## Runtime (`assets/tts/runtime/`)
| File | Role | License |
|------|------|---------|
| ort.min.js / ort-wasm*.wasm | ONNX Runtime Web 1.18 | MIT (Microsoft) |
| piper_phonemize.* | Phonemizer WASM | MIT (piper-wasm / eSpeak-NG lineage) |
| piper-tts-web.js | Browser Piper helper | MIT (Mintplex Labs / diffusionstudio) |

## Voices (`assets/tts/voices/en_GB/`)
Bundled in this repository. Served same-origin. Prepared into OPFS on first use.

All models from [rhasspy/piper-voices](https://huggingface.co/rhasspy/piper-voices) (MIT). Review each MODEL_CARD in the voice folder.

| ID | Display | Quality | Notes |
|----|---------|---------|-------|
| en_GB-alba-medium | Alba — Clear | medium | **Default** — clear classroom female |
| en_GB-alan-low | Alan — Soft | low | Male |
| en_GB-alan-medium | Alan — Clear | medium | Male |
| en_GB-aru-medium | Aru — Clear | medium | Female |
| en_GB-cori-medium | Cori — Clear | medium | Female |
| en_GB-jenny_dioco-medium | Jenny — Clear | medium | Female |
| en_GB-northern_english_male-medium | Northern English Male | medium | Male |
| en_GB-semaine-medium | Semaine — Clear | medium | Female |
| en_GB-southern_english_female-low | Southern English Female | low | Female |
| en_GB-vctk-medium | VCTK — Clear | medium | Neutral |

**Not included:** `en_GB-cori-high` (~114 MB) exceeds GitHub’s 100 MB file limit.

No Hugging Face access is required at runtime when these files are deployed with the site.
