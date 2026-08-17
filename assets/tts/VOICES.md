# Moose Tools — TTS voices & licenses

## Runtime (bundled under `assets/tts/runtime/`)

| Component | Source | License |
|-----------|--------|---------|
| ONNX Runtime Web 1.18 | Microsoft / onnxruntime | MIT |
| piper-wasm (phonemize) | @diffusionstudio/piper-wasm | MIT (Piper / eSpeak-NG lineage) |
| @mintplex-labs/piper-tts-web | Mintplex Labs (fork of diffusionstudio/vits-web) | MIT |

These files are **same-origin** so they can work offline after the first visit (service worker may cache them when requested). They are **not** listed in the tiny HTML precache list.

## Downloadable Piper voice models

Models are **not** shipped in the repo. Users download them on demand into **OPFS** via the Piper web library.

Upstream catalog: [rhasspy/piper-voices](https://huggingface.co/rhasspy/piper-voices) (repository license: **MIT**).

Always review the individual `MODEL_CARD` for a voice before redistributing it yourself.

### Curated English voices in Moose Tools UI

| Voice ID | Display | Locale | License | Notes |
|----------|---------|--------|---------|-------|
| en_GB-alan-medium | Alan (male) | en-GB | MIT | Rhasspy Piper |
| en_GB-alba-medium | Alba (female) | en-GB | MIT | Rhasspy Piper |
| en_US-lessac-medium | Lessac (female) | en-US | MIT | Rhasspy Piper |
| en_US-ryan-medium | Ryan (male) | en-US | MIT | Rhasspy Piper |
| en_US-hfc_female-medium | HFC Female | en-US | MIT | Rhasspy Piper |
| en_US-hfc_male-medium | HFC Male | en-US | MIT | Rhasspy Piper |

### Attribution

Speech synthesis models are from the **Piper** project and **Rhasspy** voice pack.  
Runtime inference uses **ONNX Runtime Web**.  
Phonemization uses **piper-wasm** (eSpeak-NG based).

If you redistribute this site, keep this file and the About credits section.
