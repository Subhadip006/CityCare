// src/components/ComplaintDetail.jsx
import React from 'react';
import { XCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ComplaintDetail = ({ complaint, onClose }) => {
  if (!complaint) return null;

  const mediaFiles = complaint.Media || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-3xl w-full shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-red-600">
          <XCircle className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-text mb-2">{complaint.Title}</h2>
        <p className="text-gray-700 mb-4">{complaint.Description}</p>

        <div className="h-64 mb-4 rounded-xl overflow-hidden">
          <MapContainer
            center={[complaint.Latitude, complaint.Longitude]}
            zoom={15}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[complaint.Latitude, complaint.Longitude]}>
              <Popup>{complaint.Title}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {mediaFiles.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {mediaFiles.map((fileUrl, idx) => {
              const isVideo = fileUrl.match(/\.(mp4|webm)$/i);
              return isVideo ? (
                <video key={idx} controls className="w-full h-48 object-cover rounded-lg">
                  <source src={fileUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  key={idx}
                  src={fileUrl}
                  alt={`Media ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintDetail;
