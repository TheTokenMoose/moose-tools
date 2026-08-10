THE QUIET GAME — standalone (USB / offline)
===========================================

What it is
  Classroom noise timer. Stay quiet or the gorilla steals the banana.
  No browser, no internet after install.

Quick run (Python already installed)
  1. Open a terminal in this folder
  2. pip install -r requirements.txt
  3. python the_quiet_game.py

Build a single Windows .exe (do this ONCE on a Windows PC)
  1. Install Python 3.10+ from python.org (tick "Add to PATH")
  2. Open Command Prompt in this folder
  3. pip install -r requirements.txt pyinstaller
  4. pyinstaller --onefile --windowed --name "TheQuietGame" the_quiet_game.py
  5. Your EXE is in the "dist" folder:
       dist\TheQuietGame.exe
  6. Copy TheQuietGame.exe to a USB stick. No Python needed on other PCs.

Notes
  - Windows may show a SmartScreen warning for unsigned EXEs — "More info" → Run anyway
  - First run will ask for microphone permission (Windows privacy settings)
  - Allow the mic or the gorilla will not react to noise
  - No data is recorded or uploaded

Sensitivity
  Lower  = more forgiving (louder room OK)
  Higher = stricter silence required
