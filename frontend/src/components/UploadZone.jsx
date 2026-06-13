import { useState, useRef } from 'react';

export default function UploadZone({ onFilesSelected }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  const handleCamera = () => {
    inputRef.current.accept = 'image/*';
    inputRef.current.capture = 'environment';
    inputRef.current.click();
  };

  const handleBrowse = () => {
    inputRef.current.accept = '.pdf,image/*';
    inputRef.current.removeAttribute('capture');
    inputRef.current.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleBrowse}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        dragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400 bg-white'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleChange}
        className="hidden"
      />
      <div className="space-y-2">
        <div className="text-4xl text-gray-400">📄</div>
        <p className="text-gray-600">
          Drag & drop files here, or click to browse
        </p>
        <p className="text-sm text-gray-400">
          PDF, JPEG, PNG, GIF, WebP up to 10MB
        </p>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleCamera(); }}
          className="inline-flex items-center gap-2 px-4 py-2 mt-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          📸 Use Camera
        </button>
      </div>
    </div>
  );
}
