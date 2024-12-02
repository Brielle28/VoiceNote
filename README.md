# Voice Recording App 🎙️

A modern and intuitive voice recording app built with **React**, **React Router**, and **Tailwind CSS**, designed for easy voice recording, playback, and management.


## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [Credits](#credits)
7. [License](#license)


## Features

- **Splash Screen**: Interactive welcome screen with a modern design.
- **Voice Recording**: Start, stop, and save voice recordings easily.
- **Timer Display**: Live timer showing the recording duration.
- **Recording List**: Search and filter recordings with real-time updates.
- **Download and Edit**: Options to edit, delete, and download recordings.
- **Responsive Design**: Optimized for various screen sizes.

## Tech Stack

- **Frontend**: React, React Router, React Icons
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Utilities**: Custom Modals, Reusable Components
- **react-media-recorder**: for recording audios 

---

## Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Brielle28/VoiceNote.git
   cd VoiceNote
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Start the Development Server**  
   ```bash
   npm run dev
   ```

---

## Usage

1. Launch the app locally using `npm run dev`.
2. Navigate through the screens:
   - **Splash Screen**: Click 'Start' to proceed.
   - **Recording Screen**: Use the record and stop buttons to create a recording.
   - **Voice List**: Manage your saved recordings.
3. Search for recordings using the search bar.
4. Download or edit recordings from the list.

---

## Folder Structure

```
src/
├── components/
│   ├── audioFileList.jsx
│   ├── DeleteModal.jsx
│   ├── EditModal.jsx
├── pages/
│   ├── SplashScreen.jsx
│   ├── Recording.jsx
│   ├── VoiceList.jsx
│   └── VoiceMenu.jsx
├── Context/
│   └── UserProvider.jsx
├── Utils/
│   ├── VoiceMenuList.js
│   └── formatTime.js
├── styles/
│   ├── Recording.css
│   └── SplashScreen.css
├── App.jsx
├── index.jsx
```

---

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature description"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a Pull Request.

## Credits

- **Design**: Inspired by modern recording apps.
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **react-media-recorder**: npm react packages
- 


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
