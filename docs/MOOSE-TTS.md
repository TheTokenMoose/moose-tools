# MooseTTS — developer guide

Central speech API for The Token Moose games and tools.

## Basic usage

```html
<script src="../../js/tts/voice-catalog.js"></script>
<script src="../../js/tts/moose-tts.js"></script>
<script>
  MooseTTS.speak("Well done!");
  MooseTTS.speak("Choose the correct answer.", { rate: 0.9 });
  MooseTTS.stop();
</script>
```

Or keep using the existing helper (it now prefers MooseTTS):

```js
const voice = TokenMooseVoice.create("my-game");
voice.speak("Hello");
voice.mountPicker(slot); // optional UI; global Voices page is preferred
```

## API

| Method | Purpose |
|--------|---------|
| `speak(text, options?)` | Speak text (Piper if ready, else browser) |
| `stop()` | Cancel speech |
| `pause()` / `resume()` | Pause/resume when supported |
| `isSpeaking()` | Boolean |
| `getVoices()` | Curated catalog |
| `getSelectedVoice()` / `setVoice(id)` | Preference |
| `previewVoice(id)` | Short sample |
| `isVoiceDownloaded(id)` | Promise&lt;boolean&gt; |
| `downloadVoice(id, onProgress?)` | Download model to OPFS |
| `deleteVoice(id)` | Remove from OPFS |
| `getPrefs()` / `setPrefs({})` | rate, engine, enabled, voiceId |
| `setEnabled(bool)` | Mute speech globally |

### Options for `speak`

- `rate`, `volume`, `pitch` (pitch mainly for browser engine)
- `voiceId` — override selected Piper voice
- `engine` — `"auto"` | `"piper"` | `"browser"`
- `force` — speak even if global speech disabled
- `fallback` — set `false` to throw instead of falling back

## Offline behaviour

1. First online visit can load runtime WASM from `assets/tts/runtime/`.
2. User downloads a voice on the **Voices** page (`voice-settings.html`).
3. Model is stored in **OPFS** (not localStorage, not the small SW precache).
4. Later offline: Piper works if runtime + that voice were stored; otherwise browser TTS is used.

## Adding a licensed voice

1. Confirm **MIT / Apache-2.0 / CC0** (or CC-BY with attribution) on the model card.
2. Add an entry to `js/tts/voice-catalog.js`.
3. Document it in `assets/tts/VOICES.md`.
4. Prefer medium-quality English classroom voices first.

## Do not

- Put large `.onnx` files in `sw.js` precache
- Store models in localStorage
- Call ONNX or Piper APIs from individual games
