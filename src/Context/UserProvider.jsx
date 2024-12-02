import { createContext, useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [recordings, setRecordings] = useState([]); // State to hold all recordings
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      audio: true,
    }
  );
  const [recordingLength, setRecordingLength] = useState(0); // Timer for recording
  const [isRecording, setIsRecording] = useState(false); // Recording state
  const [fileSize, setFileSize] = useState("0.0 KB"); // File size of the recording

  // Function to save recordings to local storage
  // const saveRecording = (blobUrl, blob, duration) => {
  //     const now = new Date();
  //     const newRecording = {
  //         id: Date.now(), // Unique identifier
  //         name: `Recording_${now.toISOString()}`, // Auto-generated name
  //         url: blobUrl, // Blob URL for playback
  //         date: now.toLocaleDateString(), // Recording date
  //         time: now.toLocaleTimeString(), // Recording time
  //         duration, // Duration of the recording in seconds
  //         size: `${(blob.size / 1024).toFixed(1)} KB`, // File size in KB
  //     };

  //     // Update state and save to local storage
  //     const updatedRecordings = [...recordings, newRecording];
  //     setRecordings(updatedRecordings);
  //     localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
  // };
  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      // Ensure we're working with a Blob
      if (!(blob instanceof Blob)) {
        reject(new Error('Input must be a Blob'));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  // Utility to convert Base64 to Blob
  const base64ToBlob = (base64) => {
    try {
      if (!base64 || typeof base64 !== 'string') {
        console.error('Invalid base64 input:', base64);
        return null;
      }

      const parts = base64.split(',');
      const base64String = parts.length > 1 ? parts[1] : parts[0];

      const byteString = atob(base64String);
      const mimeString = parts.length > 1 
        ? parts[0].split(':')[1].split(';')[0] 
        : 'audio/mp3';

      const arrayBuffer = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        arrayBuffer[i] = byteString.charCodeAt(i);
      }
      return new Blob([arrayBuffer], { type: mimeString });
    } catch (error) {
      console.error('Error converting base64 to blob:', error);
      return null;
    }
  };

  // Save recording function with Base64
  const saveRecording = async (mediaBlobUrl, blob, duration) => {
    try {
      const now = new Date();
      const base64Blob = await blobToBase64(blob);
      
      const newRecording = {
        id: Date.now(),
        name: `Recording_${now.toISOString()}`,
        base64: base64Blob,
        url: mediaBlobUrl, // Keep the original media blob URL
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        duration,
        size: `${(blob.size / 1024).toFixed(1)} KB`,
      };

      const updatedRecordings = [...recordings, newRecording];
      setRecordings(updatedRecordings);
      localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
    } catch (error) {
      console.error('Error saving recording:', error);
    }
  };

  // Load recordings from localStorage and recreate Blobs
  useEffect(() => {
    const storedRecordings = JSON.parse(localStorage.getItem("recordings")) || [];
    
    const reconstructedRecordings = storedRecordings.map((rec) => {
      try {
        if (!rec.base64) {
          console.warn('Recording missing base64 data:', rec);
          return null;
        }
        
        const blob = base64ToBlob(rec.base64);
        if (!blob) {
          console.warn('Failed to convert base64 to blob:', rec);
          return null;
        }

        return {
          ...rec,
          blob: blob,
          url: rec.url || URL.createObjectURL(blob), // Use existing URL or create new
        };
      } catch (error) {
        console.error('Error reconstructing recording:', error);
        return null;
      }
    }).filter(Boolean);

    setRecordings(reconstructedRecordings);
  }, []);

  // Monitor `mediaBlobUrl` and save recording when available
  useEffect(() => {
    const saveIfBlobAvailable = async () => {
      if (mediaBlobUrl && !isRecording) {
        try {
          // Fetch the blob from the URL
          const response = await fetch(mediaBlobUrl);
          const blob = await response.blob();
          
          // Save with duration
          await saveRecording(mediaBlobUrl, blob, recordingLength);
        } catch (error) {
          console.error('Error fetching or saving blob:', error);
        }
      }
    };
    saveIfBlobAvailable();
  }, [mediaBlobUrl]);

  // Load recordings from local storage on component mount
  // useEffect(() => {
  //     const storedRecordings = JSON.parse(localStorage.getItem("recordings")) || [];
  //     setRecordings(storedRecordings);
  // }, []);

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
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
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
    const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
    const seconds = String(duration % 60).padStart(2, "0");
    return `${minutes}:${seconds}s`;
  };

  // delete audio recording
  const DeleteRecording = (id) => {
    // Filter out the recording with the specified ID
    const updatedRecordings = recordings.filter(
      (recording) => recording.id !== id
    );

    // Update state
    setRecordings(updatedRecordings);

    // Update local storage
    localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
  };

  // edit name in ls
  const editRecordingName = (id, newName) => {
    // Map through the recordings and update the name for the matching ID
    const updatedRecordings = recordings.map((recording) => {
      if (recording.id === id) {
        return { ...recording, name: newName }; // Update the name
      }
      return recording; // Keep the rest unchanged
    });

    // Update state
    setRecordings(updatedRecordings);

    // Update local storage
    localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
  };

  const downloadRecording = (recording) => {
    // If the recording has a URL (from mediaBlobUrl)
    if (recording.url) {
      const a = document.createElement("a");
      a.href = recording.url;
      a.download = `${recording.name}.mp3`;
      a.click();
    } 
    // If the recording has base64 data
    else if (recording.base64) {
      const a = document.createElement("a");
      a.href = recording.base64;
      a.download = `${recording.name}.mp3`;
      a.click();
    }
    // If a blob exists, create a blob URL
    else if (recording.blob) {
      const url = URL.createObjectURL(recording.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${recording.name}.mp3`;
      a.click();
      
      // Revoke the URL to free up memory
      URL.revokeObjectURL(url);
    }
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
    editRecordingName,
    downloadRecording,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
