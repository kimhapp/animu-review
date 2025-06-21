import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject, 
  FirebaseStorage,
  UploadTaskSnapshot
} from "firebase/storage";
import { app } from "@/lib/firebase";

const storage: FirebaseStorage = getStorage(app);

export const uploadFile = async (
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot: UploadTaskSnapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(Math.round(progress));
      },
      (error) => {
        console.error("Upload error:", error);
        reject(new Error("File upload failed"));
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
          reject(new Error("Failed to get download URL"));
        }
      }
    );
  });
};

export const deleteFile = async (url: string): Promise<void> => {
  try {
    let fileRef;
    if (url.startsWith("https://")) {
      const matches = url.match(/o\/(.+?)\?/);
      if (!matches) throw new Error("Invalid storage URL");
      const filePath = decodeURIComponent(matches[1]);
      fileRef = ref(storage, filePath);
    } else {
      fileRef = ref(storage, url);
    }
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

export const generateAnimeCoverPath = (file: File): string => {
  const extension = file.name.split('.').pop();
  const filename = file.name.replace(/\.[^/.]+$/, "");
  const uniqueId = crypto.randomUUID();
  
  const cleanName = filename
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .toLowerCase()
    .substring(0, 50);
    
  return `anime-covers/${uniqueId}-${cleanName}.${extension}`;
};

export const isFirebaseStorageUrl = (url: string): boolean => {
  return url.startsWith("https://firebasestorage.googleapis.com/");
};