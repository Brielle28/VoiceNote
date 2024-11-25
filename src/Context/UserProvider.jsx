// import { createContext, useEffect, useState } from 'react'
// import { useReactMediaRecorder } from "react-media-recorder";

// export const UserContext = createContext();
// const UserProvider = ({ children }) => {

//     const [recordings, setRecordings] = useState([]); // new recording and saving the new recorder to local storage
//     // State management
//     const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
//         audio: true,
//     });
//     const [recordingLength, setRecordingLength] = useState(0);
//     const [isRecording, setIsRecording] = useState(false);
//     const [fileSize, setFileSize] = useState("0.0 KB"); // State to store file size

//     const saveRecording = (blobUrl, blob, recordingName, duration) => {
//         const now = new Date();
//         const newRecording = {
//             id: Date.now(), // Unique identifier
//             name: `Recording_${now.toISOString()}`, // Name (default as none provided)
//             url: blobUrl, // Blob URL for playback
//             blob, // Raw blob data
//             date: now.toLocaleDateString(), // Human-readable date
//             time: now.toLocaleTimeString(), // Human-readable time
//             duration, // Duration in seconds
//             size: `${(blob.size / 1024).toFixed(1)} KB`, // File size in KB
//         };

//         const updatedRecordings = [...recordings, newRecording];
//         setRecordings(updatedRecordings);
//         localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
//     };


//     // Timer logic
//     useEffect(() => {
//         let interval;
//         if (isRecording) {
//             interval = setInterval(() => {
//                 setRecordingLength((prev) => prev + 1);
//             }, 1000);
//         } else {
//             clearInterval(interval);
//         }
//         return () => clearInterval(interval);
//     }, [isRecording]);

//     // Format time for display (hh:mm:ss)
//     const formatTime = (timeInSeconds) => {
//         const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
//         const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
//         const seconds = String(timeInSeconds % 60).padStart(2, "0");
//         return `${hours}:${minutes}:${seconds}`;
//     };

//     // Start Recording
//     const handleStartRecording = () => {
//         startRecording();
//         setIsRecording(true);
//         setRecordingLength(0); // Reset timer
//         setFileSize("0.0 KB"); // Reset file size
//     };

//     // Stop and Save Recording
//     // const handleStopAndSave = async () => {
//     //     stopRecording();
//     //     setIsRecording(false);
//     //     if (mediaBlobUrl) {
//     //         const response = await fetch(mediaBlobUrl);
//     //         const blob = await response.blob();
//     //         saveRecording(mediaBlobUrl, blob);

//     //         // Calculate file size in KB
//     //         const sizeInKB = (blob.size / 1024).toFixed(1); // Convert bytes to KB
//     //         setFileSize(`${sizeInKB} KB`);
//     //     }
//     // };
//     const handleStopAndSave = async () => {
//         stopRecording();
//         setIsRecording(false);

//         if (mediaBlobUrl) {
//             const response = await fetch(mediaBlobUrl);
//             const blob = await response.blob();
//             const duration = recordingLength; // Get duration from your timer logic
//             saveRecording(mediaBlobUrl, blob, duration);
//         }
//     };

//  console.log(recordings, "from user provider")

//     const value = {
//         recordings,
//         setRecordings,
//         saveRecording,
//         startRecording,
//         recordingLength,
//         handleStopAndSave,
//         handleStartRecording,
//         formatTime,
//         fileSize,
//         setRecordingLength,
//         isRecording,
//         setIsRecording,
//         setFileSize,

//     };

//     return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// }

// export default UserProvider

import { createContext, useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [recordings, setRecordings] = useState([]); // State to hold all recordings
    const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
        audio: true,
    });
    const [recordingLength, setRecordingLength] = useState(0); // Timer for recording
    const [isRecording, setIsRecording] = useState(false); // Recording state
    const [fileSize, setFileSize] = useState("0.0 KB"); // File size of the recording

    // Function to save recordings to local storage
    const saveRecording = (blobUrl, blob, duration) => {
        const now = new Date();
        const newRecording = {
            id: Date.now(), // Unique identifier
            name: `Recording_${now.toISOString()}`, // Auto-generated name
            url: blobUrl, // Blob URL for playback
            date: now.toLocaleDateString(), // Recording date
            time: now.toLocaleTimeString(), // Recording time
            duration, // Duration of the recording in seconds
            size: `${(blob.size / 1024).toFixed(1)} KB`, // File size in KB
        };

        // Update state and save to local storage
        const updatedRecordings = [...recordings, newRecording];
        setRecordings(updatedRecordings);
        localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
    };

    // Load recordings from local storage on component mount
    useEffect(() => {
        const storedRecordings = JSON.parse(localStorage.getItem("recordings")) || [];
        setRecordings(storedRecordings);
    }, []);

    // Timer logic to track recording length
    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingLength((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    // Monitor `mediaBlobUrl` and save recording when available
    useEffect(() => {
        const saveIfBlobAvailable = async () => {
            if (mediaBlobUrl && !isRecording) {
                const response = await fetch(mediaBlobUrl);
                const blob = await response.blob();
                saveRecording(mediaBlobUrl, blob, recordingLength); // Save with duration
            }
        };
        saveIfBlobAvailable();
    }, [mediaBlobUrl]);

    // Format time for display (hh:mm:ss)
    const formatTime = (timeInSeconds) => {
        const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(timeInSeconds % 60).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };

    // Start recording
    const handleStartRecording = () => {
        startRecording();
        setIsRecording(true);
        setRecordingLength(0); // Reset timer
        setFileSize("0.0 KB"); // Reset file size
    };

    // Stop recording and trigger save
    const handleStopAndSave = () => {
        stopRecording();
        setIsRecording(false);
    };

    // Format the duration into MM:SS format
    const formatDuration = (duration) => {
        const minutes = String(Math.floor(duration / 60)).padStart(2, '0');
        const seconds = String(duration % 60).padStart(2, '0');
        return `${minutes}:${seconds}s`;
    };

    // delete audio recording
    const DeleteRecording = (id) => {
        // Filter out the recording with the specified ID
        const updatedRecordings = recordings.filter(recording => recording.id !== id);
    
        // Update state
        setRecordings(updatedRecordings);
    
        // Update local storage
        localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
    };
    


    // Context value
    const value = {
        recordings,
        setRecordings,
        saveRecording,
        startRecording,
        stopRecording,
        recordingLength,
        handleStopAndSave,
        handleStartRecording,
        formatTime,
        fileSize,
        setRecordingLength,
        isRecording,
        setIsRecording,
        setFileSize,
        formatDuration,
        DeleteRecording,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
